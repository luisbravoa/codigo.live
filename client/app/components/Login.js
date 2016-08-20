import React from 'react';
import actions from '../actions/index';
export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    onSubmit (e){
        e.preventDefault();
        actions.login(this.refs.email.value, this.refs.password.value);
    }

    render() {

        var error;

        if(this.props.error){
            error = (<div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </div>);
        }

        return (
            <div className="row" id="login">
                <div className="col-lg-8 col-lg-push-2">
                    <h1 className="text-center">Please Login</h1>
                    <form className="form-horizontal">
                        {error}
                        <div className="form-group">
                            <label for="inputEmail3" className="col-sm-2 control-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" ref="email" defaultValue="info@luisbravoa.com"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label for="inputPassword3" className="col-sm-2 control-label">Password</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword3"
                                       placeholder="Password" ref="password" defaultValue="12345678" />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-default" onClick={this.onSubmit.bind(this)}>Sign in</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}