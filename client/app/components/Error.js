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
                <div id="error-screen" className="">
                    <h2>Oops!</h2>

                    <h1 className="404error"> 404 </h1>
                    <h2>Document Not Found</h2>
                    <div className="error-details">
                        
                    </div>
                </div>
            </div>
        );
    }
}