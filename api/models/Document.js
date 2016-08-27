const EventEmitter = require('events');
const Session = require('./Session');
const logger = require('winston');
const mongoose = require('mongoose');
const runner = require('../../runner/index');
const Schema = mongoose.Schema;
const config = require('../config');
// Use native promises
mongoose.Promise = global.Promise;
var documentSchema = new Schema({
        id: {type: String, unique: true},
        author: String,
        code: String,
        output: String,
        messages: [{content: String, date: Date, username: String}],
        language: String
    },
    {
        timestamps: true
    });
var documentModel = mongoose.model('Document', documentSchema);


class Document extends EventEmitter {

    constructor(options) {
        super(options);
        this.options = options;
        this.model = options.model;

        this.sessions = this.options.sessions || [];
        this.id = this.options.id;
        this.model.language = this.model.language || 'javascript';

    }



    save(){
        return new Promise(function (resolve, reject) {
            this.model.save(function (err) {
                if(err){
                    reject(err);
                }else {
                    resolve();
                }
            }.bind(this));
        }.bind(this));
    }


    static findById(id) {

        return new Promise(function (resolve, reject) {
            documentModel.findOne({id: id})
                .exec(function (err, doc) {
                    if (err) {
                        reject(err);
                    } else if (doc === null){
                        reject(new Error('Document not found'));
                    }else {
                        resolve(new Document({
                            model: doc
                        }));
                    }
                })
        });

    }

    static create() {

        var newId = randomString(10);
        var newDoc = new documentModel({
            id: newId,
            code: '',
            messages: []
        });

        return new Promise(function (resolve, reject) {
            newDoc.save(function (err) {
                if (err) {
                    reject(err);
                }

                resolve({
                    id: newId
                });
            });
        });


    }

    addSession(options) {

        options.messages = this.model.messages;
        options.code = this.model.code;
        options.output = this.model.output;
        options.language = this.model.language;

        var newSession = new Session(options);
        this.sessions.push(newSession);
        logger.info('Document ' + this.model.id + ': added session. ' + this.sessions.length);

        newSession.on('close', ()=> {
            this.sessions.splice(this.sessions.indexOf(newSession), 1);
            logger.info('Document ' + this.model.id + ': removed session. ' + this.sessions.length);

            setTimeout(this.sendParticipants.bind(this), 100);
        });
        newSession.on('message', (e)=>{
            this.onMessage(e, newSession);
        });

        this.sendParticipants();


    }

    sendParticipants (){
        var participants = this.sessions.map((session)=>{
            return {
                id: session.userid,
                user: session.username,
                status: session.status
            };
        });

        this.sendToAll({
            type: 'participants',
            data: participants
        });
    }

    onMessage (e, session){
        logger.info('event: ', e.type);
        switch (e.type) {
            case 'chat':
                this.model.messages.push(e.data);
                this.sendToAll(e);
                break;
            case 'code':
                this.model.code = e.data.content;
                this.sendToAllExceptCurrentSession(session, e);
                break;
            case 'language':
                this.model.language = e.data.language;
                this.sendToAllExceptCurrentSession(session, e);
                break;
            case 'run':
                this.run();
                break;
            case 'status':
                this.sendParticipants();
                break;
        }

        this.deferSave();
    }

    run(){
        console.log('run');
        runner.exec({
            timeout: 1000,
            language: this.model.language,
            code: this.model.code,
            debug: config.debug || false
        })
            .then(function (data) {
                this.model.output = data.result;

                this.sendToAll({
                    type: 'output',
                    data: {
                        output: this.model.output
                    }
                });
            }.bind(this))
            .catch(function (e) {
                console.log(e, e.toString());
                this.sendToAll({
                    type: 'output',
                    data: {
                        output: e.toString()
                    }
                });
            }.bind(this));
    }

    deferSave(){

        if(this.saveTimeout){
            clearTimeout(this.saveTimeout);
            delete this.saveTimeout;
        }

        this.saveTimeout = setTimeout(function () {
            this.save();
            logger.info('Saving doc ' + this.model.id);
            delete this.saveTimeout;
        }.bind(this), 1000);
    }

    sendToAll(data) {
        this.sessions.forEach((session)=> {
            session.send(data);
        });
    }

    sendToAllExceptCurrentSession(currentSession, data) {
        this.sessions.forEach((session)=> {
            if (currentSession !== session) {
                session.send(data);
            }
        });
    }

}
function randomString(length) {
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-=_';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

module.exports = Document;