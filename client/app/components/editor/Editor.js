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
        this.editor.setTheme("ace/theme/tomorrow_night_eighties");
        this.editor.setFontSize(15);
        this.setValueSilent(this.props.code);
        this.editor.getSession().on('change', this.handleChange.bind(this));
    }

    setTheme(theme) {
        this.currentTheme = theme;
        this.editor.setTheme("ace/theme/" + theme);
    }

    onRun() {
        actions.runCode();
    }

    setLanguage(lang, silent) {
        if (this.editor && lang !== this.currentLang) {
            this.currentLang = lang;

            this.editor.session.setMode("ace/mode/" + lang);
            if(!silent){
                actions.setLanguage(lang);
            }
        }
    }

    render() {
        var {code, language, running, theme, view} = this.props;

        if (language !== undefined && this.currentLang !== language) {
            this.setLanguage(language, true);
        }

        if (this.editor && code !== this.editor.getValue()) {
            this.setValueSilent(code);
        }


        if (this.editor && theme !== this.currentTheme) {
            this.setTheme(theme);
        }

        return (
            <div id="editor-wrapper">
                <div id="editor-top">
                    <Dropdown placeholder="Language" options={modes} value={language} onChange={(mode)=>{

                        this.setLanguage(mode);
                    }
                    }/>
                    <Dropdown placeholder="Theme" options={themes} value={theme} onChange={(theme)=>{
                        actions.setTheme(theme);
                    }
                    }/>

                    <Dropdown placeholder="View" options={Object.keys(view)} value={view} multiple={true} onChange={(option, value)=>{
                        actions.setView(option, value);
                    }
                    }/>


                    <button className="btn btn-default dropdown-toggle editor-control" onClick={this.onRun.bind(this)}
                            disabled={running}>Run
                    </button>
                </div>
                <div id="editor"></div>

            </div>
        );
    }
}

/*
 <div>
 View:
 <div className="btn-group" data-toggle="buttons">
 <label className="btn btn-primary">
 <input type="checkbox" autocomplete="off"/> Result
 </label>
 <label className="btn btn-primary">
 <input type="checkbox" autocomplete="off"/> Chat
 </label>
 </div>
 </div>
 */

var viewOptions = {
    Result: true,
    Info: true
};

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