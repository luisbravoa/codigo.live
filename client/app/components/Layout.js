import React from 'react';
import Chat from './chat/Chat';
import Editor from './editor/Editor';
import Console from './console/Console';
import Online from './online/Online';
export default
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var {chat, code, output, language, running, connected, online, theme, view} = this.props;

        var connectedMessage = (!connected) ? <p id="connection-message" className="bg-danger">Disconnected</p> :
            <p id="connection-message" className="bg-success">Connected</p>;

        var col_sm = 12;
        var col_md = 12;
        var result = '';
        var info = '';
        if(view.Result === true){
            result =
                <div id="output-panel" className="col-sm-4 col-md-5">
                    <Console content={output} theme={theme}/>
                </div>;
            col_md = col_md - 5;
            col_sm = col_sm - 4;
        }

        if(view.Info === true){
            info =
                <div id="chat-panel" className="col-sm-3 col-md-3 sidebar">
                    {connectedMessage}
                    <Online list={online}/>
                    <Chat messages={chat.messages}></Chat>
                </div>;
            col_md = col_md - 3;
            col_sm = col_sm - 3;
        }


        return (
            <div id="layout" className="container-full">
                <div id="code-panel" className={"col-sm-" + col_sm + " col-md-" + col_md}>
                    <Editor code={code} language={language} running={running} theme={theme} view={view}/>
                </div>

                {result}

                {info}

            </div>
        );
    }
}