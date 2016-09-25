import React from 'react';
import actions from '../../actions/index';
import './console.less';
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

    init() {

        this.editor = ace.edit("console");
        this.editor.$blockScrolling = Infinity;
        this.editor.session.setMode("ace/mode/plain_text");
        this.editor.setTheme("ace/theme/tomorrow_night_eighties");
        this.editor.setFontSize(16);
        this.editor.setReadOnly(true);
        this.editor.renderer.setShowGutter(false);

        this.editor.setValue(this.props.content || '');
        this.editor.clearSelection();

        this.editor.setOptions({
            readOnly: true,
            highlightActiveLine: false,
            highlightGutterLine: false
        });
        this.editor.renderer.$cursorLayer.element.style.opacity=0
    }


    setTheme(theme) {
        this.currentTheme = theme;
        this.editor.setTheme("ace/theme/" + theme);
    }


    render() {
        var {content, theme} = this.props;

        if (this.editor && content !== undefined) {
            this.editor.setValue(content);
            this.editor.clearSelection();
        }


        if (this.editor && theme !== this.currentTheme) {
            this.setTheme(theme);
        }

        return (
            <div id="console-wrapper">
                <div id="console"></div>
            </div>
        );
    }
}