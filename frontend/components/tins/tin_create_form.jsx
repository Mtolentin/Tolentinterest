import React from 'react'
import { NavLink } from 'react-router-dom';
import CreateShelfForm from '../shelves/shelf_create_form';

class CreateTinForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            author_id: this.props.owner.id,
            title: '',
            about: '',
            confirm: false,
            errors: this.props.errors,
            chosenShelfId: '',
            photoFile: null,
            photoUrl: null,
            shelfForm: false
        }
        this.update = this.update.bind(this);
        this.shelfNames = this.shelfNames.bind(this);
        this.makeShelfSelection = this.makeShelfSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.toggleShelfForm = this.toggleShelfForm.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount(){
        const {owner, fetchShelves, clearErrors} = this.props;
        window.addEventListener("click", this.toggleMenu);
        fetchShelves(owner.id);
        clearErrors();
    }

    componentWillUnmount(){
        window.removeEventListener("click", this.toggleMenu);
    }

    update(field){
        return e => { 
            this.setState({[field]: e.currentTarget.value})
        }
    }

    handleSubmit(e){
        e.preventDefault();
        this.disableFormButton();
        const {author_id, title, about, chosenShelfId, photoFile} = this.state;
        const formData = new FormData();
        formData.append('tin[title]', title);
        formData.append('tin[about]', about);
        formData.append('tin[author_id]', author_id);
        if (photoFile){
            formData.append('tin[photo]', photoFile)
        }
        this.props.createTin(formData)
            .then( tin => this.props.saveToShelf({shelf_id: parseInt(chosenShelfId), tin_id: tin.tin.id}))
            .then(() => this.setState({ confirm: true }), this.enableFormButton);
    }

    toggleButtonLock() {
        const {chosenShelfId} = this.state;
        const saveBtn = document.getElementById("save-tin");
        if (!saveBtn) return;
        if (chosenShelfId === '') { //lock button
            saveBtn.disabled = true;
            saveBtn.classList.add("no-button");
        } else { //unlock
            saveBtn.disabled = false;
            saveBtn.classList.remove("no-button");
        }
    }

    disableFormButton(){
        document.getElementById("save-tin").disabled = true;
        document.getElementById("save-tin").classList.toggle("no-button");
    }
    
    enableFormButton(){
        document.getElementById("save-tin").disabled = false;
        document.getElementById("save-tin").classList.toggle("no-button");
    }

    showImage() {
        document.getElementById("image-preview").classList.toggle("image-load");
    }
    
    hideBackground(){
        document.getElementById("image-background").remove();
    }

    handleFile(e){
        e.preventDefault();
        const file = e.currentTarget.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({ 
                photoFile: file, 
                photoUrl: fileReader.result
            });
            this.showImage();
        }
        this.hideBackground();
        if (file) fileReader.readAsDataURL(file);
    }

    displayConfirmation(){
        if (this.state.confirm){
            return (
                <div className="modal-background">
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        <div className="tin-confirmation-box">
                            <div className="confirm-image"><i className="far fa-check-circle"></i></div>
                            <h1>Success!</h1>
                            <p><NavLink className="continue" to={`/users/${this.state.user_id}/tins`}>Continue</NavLink></p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    displayErrors(){
        const {errors} = this.props
        if (errors.length > 0){
            return <div className="error">{errors[0]}</div>
        }
    }

    
    shelfNames() {
        const { shelves } = this.props;
        if (!shelves) return null;
        return (
            <div>
                <div className="drop-down select-shelf show-select"
                    id="selected-text">
                    Select a shelf
                </div>
                <div id="shelf-names" className="menu-box">

                    <ul className="drop-down-menu" onClick={e => e.stopPropagation()}>
                        {shelves.map((shelf, idx) => {
                            return (
                                <li key={idx}
                                    value={shelf.id}
                                    className="shelf-name"
                                    onClick={this.makeShelfSelection}
                                >{shelf.name}</li>
                            )
                        })}

                        <a onClick={this.toggleShelfForm}>
                            <li key="a"
                                className="create-shelf-option">
                                <i className="fas fa-plus-circle"></i>
                                Create Shelf
                            </li>
                        </a>

                    </ul>

                </div>

                <div className="drop-down-arrow-select-shelf">
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
        e.stopPropagation();
        let menuBox = document.getElementById("selected-text");
        let list = document.getElementById("shelf-names");
        if (!menuBox) return null;
        if (e.target === menuBox && !list.classList.contains("show-menu")) {
            list.classList.add("show-menu");
        } else {
            list.classList.remove("show-menu");
        }
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

    handleSaveToShelf(e) {
        e.preventDefault();
        let shelfTin = {
            shelf_id: parseInt(this.state.chosenShelfId),
            tin_id: parseInt(this.props.chosenTinId)
        }
        this.props.saveToShelf(shelfTin);
        this.setState({ confirm: true, chosenShelfId: "" }, this.toggleButtonLock());
    }



    render(){
        const {owner} = this.props;
        const {title, description, link, photoUrl} = this.state;
        const preview = photoUrl ? <img id="image-preview" src={photoUrl} /> : null;
        this.toggleButtonLock();


        return (
            <div className="tin-modal">
                {this.showShelfForm()}

                <div className="tin-form-box">
                    {this.displayConfirmation()}

                    <div className="tin-top-buttons">
                        <button id="save-tin" className="save-tin" onClick={this.handleSubmit}>Save</button>
                        {this.shelfNames()}
                    </div>

                    <div className="tin-main-content">
                        
                        <div className="tin-image-box">
                            <input type="file" name="file-upload" id="file-upload" onChange={this.handleFile} />
                            
                            <label htmlFor="file-upload">
                                <div id="image-background">
                                    <div className="tin-image-back">
                                        <i className="fas fa-arrow-alt-circle-up"></i>
                                        <p>Click to upload</p>
                                    </div>
                                </div>
                            </label>

                            <div className="image-preview">
                                {preview}
                            </div>
                        </div>

                        <div className="tin-create-fields">

                            <div className="tin-create-inputs">
                                <div className="tin-details">


                                    <div className="tin-add-title">
                                        {this.displayErrors()}
                                        <input 
                                            type="text" 
                                            placeholder="Add your title" 
                                            value={title} 
                                            onChange={this.update("title")}/>
                                    </div>


                                    <div className="tin-owner">
                                        <i className="fas fa-user-circle"></i>
                                        {owner.username}
                                    </div>


                                    <div className="tin-add-description">
                                        <textarea 
                                            rows="3"
                                            placeholder="Label your new Tin!" 
                                            value={description} 
                                            onChange={this.update("about")}></textarea>
                                    </div>


                                </div>
                            </div>

                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTinForm;