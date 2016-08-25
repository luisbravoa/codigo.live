import React from 'react';
import Chat from './chat/Chat';
import Editor from './editor/Editor';
import Console from './console/Console';
export default
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var {chat, code, output, language, running} = this.props;

        return (
            <div id="layout" className="container-full">
                <div id="code-panel" className="col-sm-4 col-md-4">
                    <Editor code={code} language={language} running={running}/>
                </div>

                <div id="output-panel" className="col-sm-5 col-md-5">
                    <Console content={output}/>
                </div>

                <div id="chat-panel" className="col-sm-3 col-md-3 sidebar">
                    <Chat messages={chat.messages}></Chat>
                </div>
            </div>
        );
    }
}