require('expose?$!expose?jQuery!jquery');
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

render();
store.subscribe(render);

// trigger extension
ace.require("ace/ext/language_tools");
var editor = ace.edit("editor");
editor.session.setMode("ace/mode/javascript");
editor.setTheme("ace/theme/tomorrow_night_eighties");
editor.setFontSize(16);
editor.setValue('var foo = "bar";\n\nfuntion myFunc () {\n\tconsole.log("hello!");\n}');
editor.clearSelection();

var themes = [
    'ambiance',
    'chaos',
    'chrome',
    'clouds',
    'clouds_midnight',
    'cobalt',
    'crimson_editor',
    'dreamweaver',
    'eclipse',
    'github',
    'idle_fingers',
    'iplastic',
    'katzenmilch',
    'kr_theme',
    'kuroir',
    'merbivore',
    'merbivore_soft',
    'mono_industrial',
    'monokai',
    'pastel_on_dark',
    'solarized_dark',
    'solarized_light',
    'sqlserver',
    'terminal',
    'textmate',
    'tomorrow',
    'tomorrow_night',
    'tomorrow_night_blue',
    'tomorrow_night_eighties',
    'twilight',
    'vibrant_ink',
    'xcode'
];
// var index = 0;
// setInterval(function () {
// console.log(themes[index])
//     if(!themes[index]){
//         index = 0;
//     }
//     editor.setTheme("ace/theme/" + themes[index]);
//     index++;
// }, 3000);