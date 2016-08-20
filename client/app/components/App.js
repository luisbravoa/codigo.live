import React from 'react';
// import Login from './Login';
import Navigation from './Navigation';
import Layout from './Layout';
// import Modal from './Modal';
// import Loader from './Loader';
export default
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        // const {loading, route, selectedCourseId} = this.props;

        // var modal;
        //
        // if (selectedCourseId !== undefined) {
        //     modal = <Modal {...this.props} id={selectedCourseId}/>;
        // }
        //
        // var content, loader;
        // if (loading === true) {
        //     loader = (<Loader></Loader>);
        // }
        //
        //
        //     switch(route){
        //
        //         case 'dashboard':
        //             content = (
        //                 <div>
        //                     <Navigation {...this.props}/>
        //                     <Dashboard {...this.props}/>
        //                 </div>
        //
        //             );
        //             break;
        //
        //         case 'login':
        //         default:
        //             content = (
        //                 <Login {...this.props}/>
        //             );
        //             break;
        //     }



        return (
            <div id="app">
                <Navigation {...this.props}/>
                <Layout {...this.props}/>
            </div>
        );
    }
}