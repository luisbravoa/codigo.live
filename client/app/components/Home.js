import React from 'react';
import actions from '../actions/index';
export default
class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div id="layout" className="container-full">
                <div className="jumbotron" id="home-banner">
                    <div id="home-banner-content">
                        <h1>CODIGO LIVE</h1>
                        <p>Online coding tool designed for remote collaboration and interview coding exercises.</p>
                        <p>
                            <a className="btn btn-lg btn-default" href="../../components/#navbar" role="button"
                               onClick={(e)=>{
                               e.preventDefault();
                                actions.newDocument();
                                }}
                            >Create a new Document!</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}