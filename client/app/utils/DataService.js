var $ = require('jquery');

class DataService {
    constructor() {
        // this.base_url = location.protocol + '//' + location.hostname + ":3000/";
        this.base_url = '/';
    }

    getBaseUrl(){
        return this.base_url;
    }

    connect(id, username, onMessage) {

        if (this.socket !== undefined) {
            // disconnect from previous connection
            this.socket.disconnect();
            delete this.socket;
        }

        return new Promise((resolve, reject) => {
            this.socket = io.connect(':3000/?id=' + encodeURIComponent(id) + '&username=' + username, {path: ''});

            this.socket.on('connect', function (data) {
                console.log('connect');
                onMessage({
                    type: 'connected',
                    data: true
                });
                resolve(data);
            });
            this.socket.on('error', function (e) {
                reject(e);
            });
            this.socket.on('disconnect', () => {
                onMessage({
                    type: 'connected',
                    data: false
                });
                console.log('disconnect');
                delete this.socket;
            });
            this.socket.on('message', function (e) {
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