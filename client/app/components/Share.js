import React from 'react';
import DataService from '../utils/DataService';
import actions from '../actions/index';

export default
class Dialog extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {

        const {documentId} = this.props;

        const url = 'http://codigo.live/#i3v8Mc28bC' || location.href;

        const fb =
            <a className="share-button" href={'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url)}
               target="_blank" title="Share on Facebook">
                <i className="fa fa-facebook-official  fa-3x" aria-hidden="true"></i>
            </a>;

        const twitter =
            <a className="share-button" href={'https://twitter.com/share?url=' + encodeURIComponent(url)}
               target="_blank" title="Share on Twitter">
                <i className="fa fa-twitter-square fa-3x" aria-hidden="true"></i>
            </a>;
        const linkedIn =
            <a className="share-button" href={'https://www.linkedin.com/cws/share?url=' + encodeURIComponent(url)}
               target="_blank" title="Share on LinkedIn">
                <i className="fa fa-linkedin-square fa-3x" aria-hidden="true"></i>
            </a>;
        const mail =
            <a className="share-button share-mail"
               href={'mailto:?subject=I wanted you to see this site&amp;body=Check out this site ' + url + '.'}
               title="Share by Email">
                <i className="fa fa-envelope fa-3x" aria-hidden="true"></i>
            </a>;

        return (
            <div className="modal fade" id="share-modal" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog  modal-sm">
                    <div className="modal-content">
                            <div className="modal-body">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <div className="row">
                                    <div className="col-md-10 col-md-push-1 share">

                                        <h3 className="text-center">Share</h3>
                                        <div className="share-buttons">
                                            {fb}
                                            {twitter}
                                            {linkedIn}
                                            {mail}
                                        </div>
                                        <img className="share-qr" src={actions.getQR(documentId)}/>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}