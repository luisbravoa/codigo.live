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


// fetch username
var username = localStorage.getItem('username');

if (username !== null) {
    store.dispatch({
        type: 'SET_USERNAME',
        data: username
    });
    actions.setUsername(username);
    // actions.connect(documentId, username);
}


function onLocationChange() {
    var hash = location.hash;
    documentId = hash.replace('#', '');
    // fetch username
    var username = localStorage.getItem('username');
    if (documentId.length > 0 ) {
        actions.setDocumentId(documentId);
        // if(username !== null){
        //     actions.connect(documentId, username);
        // }
    } else {
        actions.setDocumentId();
    }


}
onLocationChange();

window.addEventListener("hashchange", onLocationChange);

render();





