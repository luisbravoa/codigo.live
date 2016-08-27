import React from 'react';
import MessageList from './MessageList';
import InputField from './InputField';
import actions from '../../actions/index';
import './chat.less';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        var {messages} = this.props;

        return (
            <div id="chat">
                <MessageList messages={messages}></MessageList>
                <InputField></InputField>
            </div>
        );
    }
}