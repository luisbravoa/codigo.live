require('expose?$!expose?jQuery!jquery');
require('./utils/bootstrap');
import './style.less';
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
}


function onLocationChange() {
    var hash = location.pathname;
    documentId = hash.replace('/', '');
    // fetch username
    var username = localStorage.getItem('username');
    if (documentId.length > 0) {
        actions.setDocumentId(documentId);
    } else {
        actions.setDocumentId();
    }
}
onLocationChange();

function onFocusBlur(type) {
    actions.sendStatus(type);
}

window.addEventListener('popstate', function(e) {
    // e.state is equal to the data-attribute of the last image we clicked
    console.log(e);
    var {path} = location.pathname;
    console.log(path);
});

window.addEventListener("hashchange", onLocationChange);

window.addEventListener("focus", function () {
    onFocusBlur('focus');
});

window.addEventListener("blur", function () {
    onFocusBlur('blur');
});

render();