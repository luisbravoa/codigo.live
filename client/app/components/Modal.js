import React from 'react';
import Schedule from './Schedule';
import actions from '../actions/index';

export default
class Modal extends React.Component {

    openModal() {
        if ($('#modal').hasClass('in')) return;

        $('#modal').modal();
        $('#modal').on('hide.bs.modal', this.onClose.bind(this));
    }

    onClose() {

    }

    componentDidMount() {
        this.openModal();
    }

    getId(id) {
        for (var i = 0; i < this.props.courses.length; i++) {
            if (this.props.courses[i].id === id) {
                return this.props.courses[i];
            }
        }
    }

    isEnrolled (){
        var{user} = this.props;
        var id = this.props.id;

        var ids = user.courses.map((course)=> {
            return course.id;
        });

        return ids.indexOf(id) !== -1;
    }

    render() {
        this.openModal();

        var course = this.getId(this.props.id);

        var action, error;

        if(this.props.error){
            error = (<div className="alert alert-danger" role="alert">
                <strong>Oh snap!</strong> Looks like you have a conflict with other courses.
            </div>);
        }

        if(!this.isEnrolled()){
            action = <button type="button" className="btn btn-primary" onClick={
            ()=>{
                actions.enrole(this.props.user.id, this.props.id);
                $('#modal').modal('hide');
            }
            }>Enroll</button>;
        }else {
            action = <button type="button" className="btn btn-danger" onClick={
            ()=>{
                actions.dropout(this.props.user.id, this.props.id);
                $('#modal').modal('hide');
            }
            }>Dropout</button>;
        }


        return (
            <div className="modal fade photoModal" id="modal" tabindex="-1" role="dialog"
                 aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                            <h4 className="modal-title">{course.name}</h4></div>
                        <div className="modal-body">
                            <div className="row">

                                <div className="col-lg-6">
                                    {error}
                                    <h3>Description</h3>
                                    <p>{course.description}</p>
                                    <p>{action}</p>
                                </div>
                                <div className="col-lg-6">
                                    <Schedule courses={[course]} compact={true}></Schedule>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



