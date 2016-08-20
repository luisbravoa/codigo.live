import React from 'react';
import Message from './Message';
import actions from '../../actions/index';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div>
                <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" type="text" className="form-control input-sm" placeholder="Type your message here..."/>
                        <span className="input-group-btn">
                            <button className="btn btn-default btn-sm">Send</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}