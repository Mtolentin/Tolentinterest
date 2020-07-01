import React from 'react'
import { withRouter } from 'react-router-dom';
import CreateShelfForm from '../shelves/shelf_create_form';

class EditTinForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.tin;
        const { title, description, link } = this.props.tin
        this.state = {
            title,
            about,
            chosenShelfId: '',
            confirm: false,
            shelfForm: false
        }

        this.update = this.update.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.makeShelfSelection = this.makeShelfSelection.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleShelfForm = this.toggleShelfForm.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    toggleShelfForm() {
        let status = this.state.shelfForm;
        this.setState({ shelfForm: !status });
    }

    showShelfForm() {
        if (this.state.shelfForm) {
            const { createShelf, clearErrors, currentUserId } = this.props;
            return (<CreateShelfForm
                        createShelf={createShelf}
                        clearErrors={clearErrors}
                        closeShelfForm={this.toggleShelfForm}
                        currentUserId={currentUserId}
                    />)
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const { title, description, link, chosenShelfId } = this.state;
        const { tin, currentUserId } = this.props;
        
        
        if (tin.author_id === currentUserId) {
            let newUser = {
                id: tin.id,
                user_id: currentUserId,
                title,
                about
            };
            this.props.updateTin(newUser)
                .then(tin => {
                    if (chosenShelfId) {
                        return this.props.saveToShelf({ shelf_id: parseInt(chosenShelfId), tin_id: tin.tin.id })
                    }
                });
        } 
        
        
        else {
            if (chosenShelfId) {
                this.props.saveToShelf({ shelf_id: parseInt(chosenShelfId), tin_id: tin.id });
            }
        }


        this.setState({ confirm: true }, this.props.closeEditForm(e));
    }



    handleDelete(e) {
        e.preventDefault();
        const { tin, currentUserId, deleteTin, closeEditForm } = this.props;
        if (currentUserId === tin.userId) {
            closeEditForm(e);
            deleteTin(tin.id);
            this.props.history.push(`/users/${currentUserId}/tins`);
        }
    }



    editDetails() {
        if (this.props.currentUserId !== this.props.tin.userId) return null;
        const { title, about } = this.state;
        return (
            <div className="edit-details">
                <div>
                    <p>Title</p>
                    <input type="text" value={title} onChange={this.update("title")} />
                </div>
                <div>
                    <p>Description</p>
                    <textarea rows="3" value={about} onChange={this.update("about")} />
                </div>

            </div>
        )
    }

    shelfNames() {
        const { shelves } = this.props;
        if (!shelves) return null;
        return (
            <div>
                
                <div className="drop-down select-shelf edit"
                    id="selected-text"
                    onClick={this.toggleMenu}>
                    Select a Shelf
                </div>

                
                <ul id="shelf-names-edit"
                className="drop-down-menu menu-box">
                    {shelves.map((shelf, idx) => {
                        return (
                            <li key={idx}
                                value={shelf.id}
                                className="shelf-name"
                                onClick={this.makeShelfSelection}
                            >{shelf.name}</li>
                        )
                    })}
                    <a onClick={this.openShelfForm}><li key="a"
                        className="create-shelf-option">
                        <i className="fas fa-plus-circle"></i>
                        Create Shelf</li></a>
                </ul>


                <div className="drop-down-arrow-select-shelf-edit">
                    <i className="fas fa-angle-down"></i>
                </div>
            </div>
        )
    }

    makeShelfSelection(e) {
        document.getElementById("selected-text").innerHTML = e.currentTarget.innerHTML;
        this.toggleMenu(e);
        this.update("chosenShelfId")(e);
    }

    toggleMenu(e) {
        document.getElementById("shelf-names-edit").classList.toggle("show-menu")
    }

    toggleButtonLock() {
        const { chosenShelfId } = this.state;
        const saveBtn = document.getElementById("save-tin");
        
        if (!saveBtn) return;
        if (chosenShelfId === '') {
            saveBtn.disabled = true;
            saveBtn.classList.add("no-button");
        } else {
            saveBtn.disabled = false;
            saveBtn.classList.remove("no-button");
        }
    }



    selectShelf(e) {
        e.preventDefault();
        document.getElementById("shelf-names-edit").classList.toggle("show-menu")
    }



    render() {
        if (!this.props.tin) return null;
        return (
            <div className="modal-background" onClick={this.props.closeEditForm}>
                <div className="modal-child-round-box" onClick={e => e.stopPropagation()}>
                    {this.showShelfForm()}
                    <h1>Edit this Tin</h1>

                    <div className="tin-edit-form-box">

                        <div className="edit-tin-shelf">
                            <div className="content">
                                <div className="shelf-selection">
                                    <div>
                                        <p>Shelf</p>
                                        {this.shelfNames()}
                                    </div>
                                </div>
                                {this.editDetails()}
                            </div>
                            <div className="tin-image-show">
                                <img className="thumbnail" src={this.props.tin.photoUrl} />
                            </div>
                        </div>

                        <div className="bottom-options">

                            <div className="delete-button">
                                <button className="delete-tin" onClick={this.handleDelete}>Delete</button>
                            </div>

                            <div className="save-or-cancel">
                                <button className="cancel-edit" onClick={this.props.closeEditForm}>Cancel</button>
                                <button className="save-edit" onClick={this.handleSubmit}>Save</button>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        )
    }
}

export default withRouter(EditTinForm);