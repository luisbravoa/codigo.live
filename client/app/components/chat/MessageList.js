import React from 'react';
import Message from './Message';
import actions from '../../actions/index';
import './messageList.css';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        var {messages} = this.props;

        return (
            <ul id="message-list">
                {
                    messages.map((message, index)=> {
                            return <Message data={message} key={index}/>;
                        }
                    )}
            </ul>
        );
    }
}