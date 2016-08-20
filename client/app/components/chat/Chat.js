import React from 'react';
import MessageList from './MessageList';
import InputField from './InputField';
import actions from '../../actions/index';
import './chat.css';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div id="chat">
                <MessageList></MessageList>
                <InputField></InputField>
            </div>
        );
    }
}