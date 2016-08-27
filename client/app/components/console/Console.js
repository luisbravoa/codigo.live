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
    }

    render() {
        var {content} = this.props;

        if (this.editor && content !== undefined) {
            this.editor.setValue(content);
            this.editor.clearSelection();
        }

        return (
            <div id="console-wrapper">
                <div id="console"></div>
            </div>
        );
    }
}