import React from 'react';
import actions from '../actions/index';
import Share from './Share';
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


        if(documentId !== undefined){
            document.querySelector('#meta-image').content = actions.getQR(documentId);
            document.querySelector('#meta-url').content = location.href;
        }else {
            document.querySelector('#meta-image').content = '/img/home.jpg';
            document.querySelector('#meta-url').content = location.protocol + '//' + location.hostname;
        }


        if (error) {
            content = <div id="app">
                <Navigation {...this.props}/>
                <ErrorScreen/>
            </div>;
        } else if (documentId !== undefined && documentId !== '' && documentId.length > 0) {
            var dialog = (!username) ? <Dialog {...this.props}/> : '';
            content = (
                <div id="app">
                    <Navigation {...this.props}/>
                    <Layout {...this.props}/>
                    <Share {...this.props}/>
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