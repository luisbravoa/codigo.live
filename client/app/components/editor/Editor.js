import React from 'react';
import actions from '../../actions/index';
import Dropdown from './Dropdown';
import './editor.less';
ace.require("ace/ext/language_tools");
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        this.init();
    }

    componentWillUnmount() {
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

    handleChange() {
        if (this.settingValue !== true) {
            actions.sendCode(this.editor.getValue());
        }
        actions.setCode(this.editor.getValue());
    }

    init() {

        this.editor = ace.edit("editor");
        this.editor.$blockScrolling = Infinity;
        this.editor.session.setMode("ace/mode/javascript");
        this.editor.setTheme("ace/theme/tomorrow_night_eighties");
        this.editor.setFontSize(16);
        this.setValueSilent(this.props.code);
        this.editor.getSession().on('change', this.handleChange.bind(this));
    }

    onRun() {
        actions.runCode();
    }

    setLanguage(lang) {
        if (this.editor && lang !== this.currentLang) {
            console.log('setLanguage', lang);
            this.currentLang = lang;
            this.editor.session.setMode("ace/mode/" + lang);
            actions.setLanguage(lang);
        }
    }

    render() {
        var {code, language, running} = this.props;

        if (language !== undefined && this.currentLang !== language) {
            this.setLanguage(language);
        }

        if (this.editor && code !== this.editor.getValue()) {
            this.setValueSilent(code);
        }

        return (
            <div id="editor-wrapper">
                <div id="editor-top">
                    <Dropdown placeholder="Language" options={modes} value={language} onChange={(mode)=>{

                        this.setLanguage(mode);
                    }
                    }/>
                    <Dropdown placeholder="Theme" options={themes} value={'tomorrow_night_eighties'} onChange={(theme)=>{
                        this.editor.setTheme("ace/theme/"+theme);
                    }
                    }/>
                    <button className="btn btn-default dropdown-toggle" onClick={this.onRun.bind(this)}
                            disabled={running}>Run
                    </button>
                </div>
                <div id="editor"></div>

            </div>
        );
    }
}


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

var modes = [
    // "c_cpp",
    // "clojure",
    // "coffee",
    // "csharp",
    // "css",
    // "dart",
    // "erlang",
    // "haml",
    // "handlebars",
    // "html",
    // "html_ruby",
    // "java",
    "javascript",
    // "less",
    // "livescript",
    // "lucene",
    // "markdown",
    // "mysql",
    // "objectivec",
    // "pascal",
    "perl",
    "php",
    // "plain_text",
    "python",
    "ruby",
    // "sass",
    // "scala",
    // "sql",
    // "sqlserver",
    // "svg",
    // "swift",
    // "typescript",
    // "vbscript"
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