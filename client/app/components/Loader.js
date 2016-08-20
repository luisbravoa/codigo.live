import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    
    render() {
        return (
            <div id="loaderWrapper">
                <div id="loader">
                    <img src="images/loader.gif"/>
                    <p id="loader-message">Please wait...</p>
                </div>
            </div>
        );
    }
}