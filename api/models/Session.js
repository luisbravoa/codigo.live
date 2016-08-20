const EventEmitter = require('events');
const logger = require('winston');

class Session extends EventEmitter {

    constructor(options){
        super(options);
        this.options = options;
        this.socket = this.options.socket;
        this.id = this.socket.handshake.query.id;
        this.username = this.socket.handshake.query.username || 'Unknown';
        this.listenToSocketEvents();

        this.socket.emit('message', {
            type: 'init',
            data: {
                code: options.code,
                messages: options.messages
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

            // logger.info('message', e);
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