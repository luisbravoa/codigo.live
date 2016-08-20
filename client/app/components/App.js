import React from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Layout from './Layout';
import Dialog from './Dialog';
import Home from './Home';
export default
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        const {username, documentId} = this.props;

        // console.log(this.props);
        var content;

        if (documentId !== '' && documentId.length > 0) {
            var dialog = (!username) ? <Dialog {...this.props}/> : '';
            content = (
                <div id="app">
                    <Navigation {...this.props}/>
                    <Layout {...this.props}/>
                    {dialog}
                </div>

            );
        } else {
            content = (
                <div id="app">
                    <Navigation {...this.props}/>
                    <Home/>
                </div>
            );
        }


        return (
            content
        );
    }
}