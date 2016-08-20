import React from 'react';
import actions from '../../actions/index';
import './editor.css';
ace.require("ace/ext/language_tools");
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount(){
        this.editor.destroy();
    }

    setValueSilent(value) {
        this.settingValue = true;
        var cursorPosition = this.editor.getCursorPosition();
        this.editor.setValue(value);
        this.editor.clearSelection();
        this.editor.moveCursorToPosition(cursorPosition);
        this.settingValue = false;
    }

    handleChange (){
        if(this.settingValue !== true){
            actions.sendCode(this.editor.getValue());
        }
    }

    init() {

        this.editor = ace.edit("editor");
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.setTheme("ace/theme/tomorrow_night_eighties");
        this.editor.setFontSize(16);
        this.setValueSilent(this.props.code);
        this.editor.getSession().on('change', this.handleChange.bind(this));
    }

    render() {
        var {code} = this.props;

        if(this.editor && code !== this.editor.getValue()){
            this.setValueSilent(code);

        }

        return (
            <div id="editor"></div>
        );
    }
}


// editor2.setValue(editor.getValue());
// editor2.clearSelection();


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