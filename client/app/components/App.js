import React from 'react';
import Login from './Login';
import Navigation from './Navigation';
import Layout from './Layout';
import Dialog from './Dialog';
import ErrorScreen from './Error';
import Home from './Home';
export default
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        const {username, documentId, error} = this.props;

        var content;


        if(error){
            content = <div id="app">
                <Navigation {...this.props}/>
                <ErrorScreen/>
            </div>;
        }else
        if (documentId !== undefined && documentId !== '' && documentId.length > 0) {
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