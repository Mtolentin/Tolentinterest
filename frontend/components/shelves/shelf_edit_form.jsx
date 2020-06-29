import React from 'react';
import { withRouter } from 'react-router-dom';

class ShelfEditForm extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.shelf;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateShelf(this.state)
            .then( () => this.props.closeEditForm() )
    }

    handleDelete(e) {
        e.preventDefault();
        const { shelf, deleteShelf, closeEditForm, currentUserId } = this.props;

        if (currentUserId === shelf.userId) {
            closeEditForm();
            deleteShelf(currentUserId, shelf.id);
        }
    }
    


    render(){

        const {name, description} = this.state;
        const {closeEditForm} = this.props;


        return (
            <div className="modal-background" onClick={closeEditForm}>
                <div className="modal-child-round-box" onClick={e => e.stopPropagation()}>
                    <div className="shelf-form-box">
                        
                        
                        <h1>Edit your Shelf</h1>

                        <div className="close-form" onClick={closeEditForm}>
                        </div>


                        <div className="edit-details">
                            <div>
                                <p>Name</p>
                                <input type="text" value={name} onChange={this.update("name")} />
                            </div>
                            <div>
                                <p>Description</p>
                                <textarea rows="5" placeholder="Add information about your shelf here!" value={about || ''} onChange={this.update("about")} />
                            </div>
                        </div>


                        <div className="bottom-options">
                            <div className="save-or-cancel">
                                <button className="cancel-edit" onClick={closeEditForm}>Cancel</button>
                                <button className="save-edit" onClick={this.handleSubmit}>Save</button>
                            </div>
                            <div className="delete-button">
                                <button className="delete-tin" onClick={this.handleDelete}>Delete</button>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ShelfEditForm);