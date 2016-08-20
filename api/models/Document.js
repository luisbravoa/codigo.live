const EventEmitter = require('events');
const Session = require('./Session');
const logger = require('winston');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Use native promises
mongoose.Promise = global.Promise;
var documentSchema = new Schema({
    id:  {type: String, unique : true},
    author: String,
    code:   String,
    messages: [{ content: String, date: Date, username: String}],
    date: { type: Date, default: Date.now }
});

var documentModel = mongoose.model('Document', documentSchema);


class Document extends EventEmitter {

    constructor(options){
        super(options);
        this.options = options;

        this.sessions = this.options.sessions || [];
        this.id = this.options.id;
        this.messages = [];
        this.code = '';
        
    }

    static create (){

        var newId = randomString(10);
        var newDoc = new documentModel({
            id: newId,
            code: '',
            messages:[]
        });
        
        return new Promise(function (resolve, reject) {
            newDoc.save(function (err) {
                if(err){
                    reject(err);
                }

                resolve({
                    id: newId
                })
            });
        });


    }

    addSession(options){

        options.messages = this.messages;
        options.code = this.code;

        var newSession = new Session(options);
        this.sessions.push(newSession);
        logger.info('Document ' + this.id + ': added session. ' + this.sessions.length);

        newSession.on('close', ()=>{
            this.sessions.splice(this.sessions.indexOf(newSession), 1);
            logger.info('Document ' + this.id + ': removed session. ' + this.sessions.length);
        });
        newSession.on('message', (e)=>{

            switch (e.type){
                case 'chat':
                    this.messages.push(e.data);
                    this.sendToAll(e);
                    break;
                case 'code':
                    this.code = e.data.content;
                    this.sendToAllExceptCurrentSession(newSession, e);
                    break;
            }

        });


    }

    sendToAll (data){
        this.sessions.forEach((session)=>{
            session.send(data);
        });
    }
    sendToAllExceptCurrentSession (currentSession, data){
        this.sessions.forEach((session)=>{
            if(currentSession !== session){
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