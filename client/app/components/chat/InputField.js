import React from 'react';
import Message from './Message';
import actions from '../../actions/index';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {value: ''};
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    onSubmit() {
        actions.sendMessage(this.state.value);
        this.setState({
            value: ''
        });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    render() {

        return (
            <div>
                <div className="panel-footer">
                    <div className="input-group">
                        <input id="btn-input" type="text" className="form-control input-sm"
                               placeholder="Type your message here..."
                               value={this.state.value}
                               onChange={this.handleChange.bind(this)}
                               onKeyPress={this.handleKeyPress.bind(this)}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-default btn-sm" onClick={this.onSubmit.bind(this)}>Send</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}