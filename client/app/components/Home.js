import React from 'react';
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
                        <p>Live coding tool design to remote collaboration and interview coding exercise.</p>
                        <p>
                            <a className="btn btn-lg btn-default" href="../../components/#navbar" role="button">Get Started!</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}