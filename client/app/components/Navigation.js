import React from 'react';
import actions from '../actions/index';
export default class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    newDocument(e) {
        e.preventDefault();
        actions.newDocument();
    }

    render() {

        const share = (this.props.documentId === undefined || this.props.error.code !== undefined)? '' : <li><a href="#" onClick={(e)=>{
                                e.preventDefault();
                                actions.showSharePanel();
                            }}>Share</a></li>;


        return (
            <nav className="navbar navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a id="logo" className="navbar-brand" href="/">CODIGO.LIVE</a>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li><a href="#" data-toggle="collapse" data-target=".navbar-collapse.in" onClick={this.newDocument.bind(this)}>New Document</a></li>
                            {share}
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="http://luisbravoa.com" data-toggle="collapse" data-target=".navbar-collapse.in" target="blank" id="about">by <i>luisbravoa</i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}