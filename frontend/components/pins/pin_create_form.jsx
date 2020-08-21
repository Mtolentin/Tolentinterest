import React from 'react'
import { NavLink } from 'react-router-dom';
import CreateBoardForm from '../boards/board_create_form';

class CreatePinForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user_id: this.props.owner.id,
            title: '',
            description: '',
            link: '',
            confirm: false,
            errors: this.props.errors,
            chosenBoardId: '',
            photoFile: null,
            photoUrl: null,
            boardForm: false
        }
        this.update = this.update.bind(this);
        this.boardNames = this.boardNames.bind(this);
        this.makeBoardSelection = this.makeBoardSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.toggleBoardForm = this.toggleBoardForm.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }

    componentDidMount(){
        const {owner, fetchBoards, clearErrors} = this.props;
        window.addEventListener("click", this.toggleMenu);
        fetchBoards(owner.id);
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
        const {user_id, title, description, link, chosenBoardId, photoFile} = this.state;
        const formData = new FormData();
        formData.append('pin[title]', title);
        formData.append('pin[description]', description);
        formData.append('pin[link]', link);
        formData.append('pin[user_id]', user_id);
        if (photoFile){
            formData.append('pin[photo]', photoFile)
        }
        this.props.createPin(formData)
            .then( pin => this.props.saveToBoard({board_id: parseInt(chosenBoardId), pin_id: pin.pin.id}))
            .then(() => this.setState({ confirm: true }), this.enableFormButton);
    }

    toggleButtonLock() { //lock button until board selected
        const {chosenBoardId} = this.state;
        const saveBtn = document.getElementById("save-pin");
        if (!saveBtn) return;
        if (chosenBoardId === '') { //lock button
            saveBtn.disabled = true;
            saveBtn.classList.add("no-button");
        } else { //unlock
            saveBtn.disabled = false;
            saveBtn.classList.remove("no-button");
        }
    }

    disableFormButton(){
        document.getElementById("save-pin").disabled = true;
        document.getElementById("save-pin").classList.toggle("no-button");
        document.getElementById("spinner").classList.toggle("show-spinner");
    }
    
    enableFormButton(){
        document.getElementById("save-pin").disabled = false;
        document.getElementById("save-pin").classList.toggle("no-button");
        document.getElementById("spinner").classList.toggle("show-spinner");
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
                        <div className="pin-confirmation-box">
                            <div className="confirm-image"><i className="far fa-check-circle"></i></div>
                            <h1>Success!</h1>
                            <p><NavLink className="continue" to={`/users/${this.state.user_id}/pins`}>Continue</NavLink></p>
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

    //board start
    boardNames() {
        const { boards } = this.props;
        if (!boards) return null;
        return (
            <div>
                <div className="drop-down select-board show-select"
                    id="selected-text">
                    Select board
                </div>
                <div id="board-names" className="menu-box">
                    <ul className="drop-down-menu" onClick={e => e.stopPropagation()}>
                        {boards.map((board, idx) => {
                            return (
                                <li key={idx}
                                    value={board.id}
                                    className="board-name"
                                    onClick={this.makeBoardSelection}
                                >{board.name}</li>
                            )
                        })}
                        <a onClick={this.toggleBoardForm}>
                            <li key="a"
                                className="create-board-option">
                                <i className="fas fa-plus-circle"></i>
                                Create board
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="drop-down-arrow-select-board">
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>
        )
    }

    makeBoardSelection(e) {
        document.getElementById("selected-text").innerHTML = e.currentTarget.innerHTML;
        this.toggleMenu(e);
        this.update("chosenBoardId")(e);
    }

    toggleMenu(e) {
        e.stopPropagation();
        let menuBox = document.getElementById("selected-text");
        let list = document.getElementById("board-names");
        if (!menuBox) return null;
        if (e.target === menuBox && !list.classList.contains("show-menu")) {
            list.classList.add("show-menu");
        } else {
            list.classList.remove("show-menu");
        }
    }

    toggleBoardForm() {
        let status = this.state.boardForm;
        this.setState({ boardForm: !status });
    }

    showBoardForm() {
        if (this.state.boardForm) {
            const { createBoard, clearErrors, currentUserId } = this.props;
            return (<CreateBoardForm
                createBoard={createBoard}
                clearErrors={clearErrors}
                closeBoardForm={this.toggleBoardForm}
                currentUserId={currentUserId}
            />)
        }
    }

    handleSaveToBoard(e) {
        e.preventDefault();
        let boardPin = {
            board_id: parseInt(this.state.chosenBoardId),
            pin_id: parseInt(this.props.chosenPinId)
        }
        this.props.saveToBoard(boardPin);
        this.setState({ confirm: true, chosenBoardId: "" }, this.toggleButtonLock());
    }
    //board end

    render(){
        const {owner} = this.props;
        const {title, description, link, photoUrl} = this.state;
        const preview = photoUrl ? <img id="image-preview" src={photoUrl} /> : null;
        this.toggleButtonLock();
        return (
            <div className="pin-modal">
                {this.showBoardForm()}
                <div className="pin-form-box">
                    {this.displayConfirmation()}
                    <div className="pin-top-buttons">
                        <button id="save-pin" className="save-pin" onClick={this.handleSubmit}>Save</button>
                        {this.boardNames()}
                        <div id="spinner" className="spinner"></div>
                    </div>
                    <div className="pin-main-content">
                        <div className="pin-image-box">
                            <input type="file" name="file-upload" id="file-upload" onChange={this.handleFile} />
                            <label htmlFor="file-upload">
                                <div id="image-background">
                                    <div className="pin-image-back">
                                        <i className="fas fa-arrow-alt-circle-up"></i>
                                        <p>Click to upload</p>
                                    </div>
                                </div>
                            </label>
                            <div className="image-preview">
                                {preview}
                            </div>
                        </div>
                        <div className="pin-create-fields">
                            <div className="pin-create-inputs">
                                <div className="pin-details">
                                    <div className="pin-add-title">
                                        {this.displayErrors()}
                                        <input 
                                            type="text" 
                                            placeholder="Add your title" 
                                            value={title} 
                                            onChange={this.update("title")}/>
                                    </div>
                                    <div className="pin-owner">
                                        <i className="fas fa-user-circle"></i>
                                        {owner.username}
                                    </div>
                                    <div className="pin-add-description">
                                        <textarea 
                                            rows="1"
                                            placeholder="Tell everyone what your Pin is about" 
                                            value={description} 
                                            onChange={this.update("description")}></textarea>
                                    </div>
                                </div>
                                <div className="pin-link">
                                    <input 
                                        type="text"
                                        placeholder="Add a destination link (optional)"
                                        value={link}
                                        onChange={this.update("link")}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatePinForm;