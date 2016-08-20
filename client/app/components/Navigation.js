import React from 'react';
import actions from '../actions/index';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    newDocument (e) {
        e.preventDefault();
        actions.newDocument();
    }

    render() {

        var error;

        if (this.props.error) {
            error = (<div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Change a few things up and try submitting again.
            </div>);
        }

        return (
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a id="logo" className="navbar-brand" href="#">CODIGO.LIVE</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li><a href="#" onClick={this.newDocument.bind(this)}>New Document</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#">About</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}