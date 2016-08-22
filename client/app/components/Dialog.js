import React from 'react';
import actions from '../actions/index';

export default
class Dialog extends React.Component {

    constructor() {
        super();
        this.state = {
            username: ''
        };
    }

    openModal() {
        if ($('#modal').hasClass('in')) return;


        $('#modal').modal({
            backdrop: 'static'
        });
        $('#modal').on('hide.bs.modal', this.onClose.bind(this));

    }

    onClose() {

    }

    componentDidMount() {
        setTimeout(()=> {
            this.openModal();
        }, 50);

    }

    onChange(e) {
        this.setState({
            username: e.target.value
        });
    }


    onSubmit(e) {
        e.preventDefault();
        if (this.state.username !== '') {
            $('#modal').modal('hide');
            actions.setUsername(sanitizeHTML(this.state.username));
        }
    }

    render() {

        return (
            <div className="modal fade photoModal" id="modal" role="dialog" aria-labelledby="mySmallModalLabel"
                 aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog  modal-sm">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-md-10 col-md-push-1">

                                        <h3 className="text-center">Enter Your Name</h3>
                                        <form>
                                            <fieldset>
                                                <div className="form-group">
                                                    <label>Username</label>
                                                    <input type="text" className="form-control"
                                                           placeholder="Your name here..." value={this.state.username}
                                                           onChange={this.onChange.bind(this)}/>
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" className="btn btn-primary"
                                                            onClick={this.onSubmit.bind(this)}>Join
                                                    </button>
                                                </div>
                                            </fieldset>
                                        </form>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


function sanitizeHTML(str, white, black) {
    if (!white) white = "b|i|p|br";//allowed tags
    if (!black) black = "script|object|embed";//complete remove tags
    var e = new RegExp("(<(" + black + ")[^>]*>.*</\\2>|(?!<[/]?(" + white + ")(\\s[^<]*>|[/]>|>))<[^<>]*>|(?!<[^<>\\s]+)\\s[^</>]+(?=[/>]))", "gi");
    return str.replace(e, "");
}



