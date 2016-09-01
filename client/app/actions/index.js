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

    onMessage(e) {

        switch (e.type) {
            case 'participants':
                store.dispatch({
                    type: 'PARTICIPANTS',
                    data: e.data
                });
                break;
            case 'connected':
                store.dispatch({
                    type: 'CONNECTED',
                    data: e.data
                });
                break;
            case 'message':
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
            case 'language':
                store.dispatch({
                    type: 'SET_LANGUAGE',
                    data: e.data
                });
                break;
            case 'output':
                store.dispatch({
                    type: 'OUTPUT',
                    data: e.data
                });
                break;
            case 'error':
                store.dispatch({
                    type: 'ERROR',
                    data: e.data
                });
                break;
        }

    }

    runCode() {
        store.dispatch({
            type: 'RUNNING'
        });

        dataService.send('run', {});
    }

    setTheme(theme) {
        store.dispatch({
            type: 'SET_THEME',
            data: theme
        });
    }

    setLanguage(lang) {
        store.dispatch({
            type: 'SET_LANGUAGE',
            data: {
                language: lang
            }
        });
        dataService.send('language', {
            language: lang
        });
    }

    sendMessage(content) {
        dataService.send('message', {
            content: content
        });
    }

    setCode(content) {
        store.dispatch({
            type: 'CODE',
            data: {
                content: content
            }
        });
    }

    sendCode(content) {
        dataService.send('code', {
            content: content
        });
    }

    sendStatus(state) {
        dataService.send('status', {
            content: (state === 'focus') ? 'online' : 'away'
        });
    }

    setUsername(username) {
        localStorage.setItem('username', username);
        this.username = username;
        store.dispatch({
            type: 'SET_USERNAME',
            data: username
        });
        this.checkConnect();
    }

    checkConnect() {
        if (this.documentId !== undefined && this.documentId !== '' && this.username !== null) {
            this.connect(this.documentId, this.username);
        }
    }

    setDocumentId(id) {
        this.documentId = id;
        store.dispatch({
            type: 'SET_DOCUMENT_ID',
            data: id
        });
        this.checkConnect();
    }

    newDocument() {
        store.dispatch({
            type: 'SHOW_LOADER'
        });

        dataService.newDocument()
            .then((data) => {
                console.log('new document');
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