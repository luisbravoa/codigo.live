const EventEmitter = require('events');
const logger = require('winston');

class Session extends EventEmitter {

    constructor(options){
        super(options);
        this.options = options;
        this.socket = this.options.socket;
        this.id = this.socket.handshake.query.id;
        this.userid = this.socket.id;
        this.status = 'online';
        this.username = this.socket.handshake.query.username || 'Unknown';
        this.listenToSocketEvents();

        this.socket.emit('message', {
            type: 'init',
            data: {
                code: options.code,
                messages: options.messages,
                language: options.language,
                output: options.output
            }
        });
    }

    listenToSocketEvents (){
        this.socket.on('disconnect', () =>{
            this.emit('close');
        });
        this.socket.on('message', (e) =>{
            e.data.username = this.username;
            e.data.date = new Date();

            if(e.type === 'status'){
                this.status = e.data.content
            }

            this.emit('message', e);
        });
    }

    send(data){
        this.socket.emit('message', data);
    }

    sendError (){
        this.socket.emit({
            error: {
                message: 'message',
                code: code
            }
        });
    }

    close () {
        this.socket.disconnect();
    }
}


module.exports = Session;