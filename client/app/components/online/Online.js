import React from 'react';
import './online.less';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        var {list} = this.props;

        return (
            <div id="online">
                <h3>Now Online</h3>
                <ul id="online-list">
                    {
                        list.map((user, index)=> {
                                return <li id="online-list-user" className={"status-" + user.status} data={user} key={index} >
                                    <i id="online-list-user-icon" className="fa fa-user fa-2x" aria-hidden="true"></i>
                                    <span id="online-list-user-name">{user.user}</span>
                                    <span id="online-list-user-status">({capitalizeFirstLetter(user.status)})</span>
                                </li>;
                            }
                        )}
                </ul>
            </div>
        );
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}