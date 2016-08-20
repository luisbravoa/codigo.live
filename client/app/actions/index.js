import store from '../stores/index';

import DataService from '../utils/DataService';
const dataService = new DataService();


class Actions {
    connect(id, username) {
        store.dispatch({
            type: 'SHOW_LOADER'
        });
        dataService.connect(id, username, this.onMessage)
            .then((data) => {
                // console.log(data);
            })
            .catch((e)=> {
                store.dispatch({
                    type: 'SHOW_LOGIN_ERROR'
                });
            });
    }

    onMessage (e) {
        switch (e.type) {
            case 'chat':
                store.dispatch({
                    type: 'CHAT_MESSAGE',
                    data: e.data
                });
                break;
            case 'init':
                store.dispatch({
                    type: 'INIT',
                    data: e.data
                });
                break;
            case 'code':
                store.dispatch({
                    type: 'CODE',
                    data: e.data
                });
                break;
        }

    }

    sendMessage(content) {
        dataService.send('chat', {
            content: content
        });
    }
    
    sendCode(content) {
        dataService.send('code', {
            content: content
        });
    }
    setUsername(username) {
        localStorage.setItem('username', username);
        store.dispatch({
            type: 'SET_USERNAME',
            data: username
        });
    }

    setDocumentId(id) {
        store.dispatch({
            type: 'SET_DOCUMENT_ID',
            data: id
        });
    }

    newDocument (){
        store.dispatch({
            type: 'SHOW_LOADER'
        });

        dataService.newDocument()
            .then((data) => {
                window.location.hash = data.id;
            })
            .catch((e)=> {
                store.dispatch({
                    type: 'SHOW_ERROR'
                });
            });
    }
}

export default new Actions();