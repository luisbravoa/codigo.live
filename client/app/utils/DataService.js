var $ = require('jquery');

class DataService {
    constructor() {
        this.base_url = "http://127.0.0.1:3000/";
    }

    connect(id, username, onMessage) {
        return new Promise((resolve, reject) => {
            this.socket = io.connect(this.base_url + '?id=' + id + '&username=' + username);

            this.socket.on('connect', function (data) {
                console.log('connect');

                resolve(data);
            });
            this.socket.on('error', function (e) {
                reject(e);
            });
            this.socket.on('disconnect', function (e, x) {
                console.log('disconnect', e, x)
            });
            this.socket.on('message', function (e) {
                // console.log('message', e);
                onMessage(e);
            });
        });
    }

    send(type, payload) {
        if (this.socket) {
            this.socket.emit('message', {
                type: type,
                data: payload
            });
        }

    }

    newDocument() {
        return new Promise((resolve, reject) => {

            $.ajax({
                type: 'PUT',
                url: this.base_url + 'documents',
                success: resolve,
                error: reject
            });
        });

    }
}


module.exports = DataService;