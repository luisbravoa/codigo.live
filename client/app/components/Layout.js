import React from 'react';
import Chat from './chat/Chat';
export default
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div id="layout" className="container-full">
                <div id="right" className="col-md-9">
                    <div id="editor"></div>
                </div>

                <div id="left" className="col-sm-3 col-md-3 sidebar">
                    <Chat></Chat>
                </div>
            </div>
        );
    }
}