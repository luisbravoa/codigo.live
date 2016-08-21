import React from 'react';
import Chat from './chat/Chat';
import Editor from './editor/Editor';
export default
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        var {chat, code} = this.props;

        return (
            <div id="layout" className="container-full">
                <div id="right" className="col-sm-9 col-md-9">
                    <Editor code={code}/>
                </div>

                <div id="left" className="col-sm-3 col-md-3 sidebar">
                    <Chat messages={chat.messages}></Chat>
                </div>
            </div>
        );
    }
}