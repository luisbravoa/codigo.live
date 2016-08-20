require('expose?$!expose?jQuery!jquery');
require('./utils/bootstrap');
import './style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import store from './stores/index';
import actions from './actions/index';

const app = document.querySelector('#wrapper');
const render = () => {
    ReactDOM.render(<App {...store.getState()}/>, app);
};

store.subscribe(render);


var documentId;
function onLocationChange() {
    var hash = location.hash;
    documentId = hash.replace('#', '');

    // if(documentId.length >0){
        actions.setDocumentId(documentId);

        // fetch username
        var username = localStorage.getItem('username');
        actions.connect(documentId, username);
    // }


}
onLocationChange();

// fetch username
var username = localStorage.getItem('username');

if(username !== null){
    store.dispatch({
        type: 'SET_USERNAME',
        data: username
    });
    actions.connect(documentId, username);
}

window.addEventListener("hashchange", onLocationChange);

render();





