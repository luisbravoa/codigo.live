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
                        
                    </div>
                </div>
            </div>
        );
    }
}