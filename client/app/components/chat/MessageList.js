import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message';
import actions from '../../actions/index';
import './messageList.less';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate() {
        ReactDOM.findDOMNode(this).scrollTop = ReactDOM.findDOMNode(this).scrollHeight
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