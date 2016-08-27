import React from 'react';
import Message from './Message';
import actions from '../../actions/index';
import './message.less';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        var {content, username, date} = this.props.data;

        // var datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
        //     date.getHours() + ":" + date.getMinutes();
        return (
            <li className="message">
                <div className="message-user">{username}</div>
                <div className="message-content">{content}</div>
                <div className="message-date">{date}</div>
            </li>
        );
    }
}