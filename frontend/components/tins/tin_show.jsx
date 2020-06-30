import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';


import EditTinForm from './tin_edit_form';
import TinIndex from './tin_index';
import CreateShelfForm from '../shelves/shelf_create_form'
import { selectSuggestedTins } from '../../reducers/selectors';


class TinShow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit: false,
            chosenShelfId: '', 
            confirm: false
        }

        this.toggleEditForm = this.toggleEditForm.bind(this);
        this.toggleShelfForm = this.toggleShelfForm.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.goBack = this.goBack.bind(this);
        this.getSuggested = this.getSuggested.bind(this);
        this.update = this.update.bind(this);
        this.handleSaveToShelf = this.handleSaveToShelf.bind(this);
        this.makeShelfSelection = this.makeShelfSelection.bind(this);
        this.closeConfirm = this.closeConfirm.bind(this);
    }

    goBack(e){
        e.stopPropagation();
        this.props.history.goBack();
    }

    componentDidMount(){
        const { fetchTins, fetchUsers, fetchShelves, currentUserId} = this.props;
        window.addEventListener("click", this.toggleMenu);
        fetchTins();
        fetchUsers();
        fetchShelves(currentUserId);
    }

    componentWillUnmount(){
        window.removeEventListener("click", this.toggleMenu);
    }

    toggleEditForm(e){
        e.preventDefault();
        e.stopPropagation();
        let status = this.state.edit;
        this.setState({edit: !status});
    }

    getSuggested(){
        const {tins, currentUserId, chosenTinId} = this.props;
        let suggested = selectSuggestedTins(tins, currentUserId, chosenTinId);
        return suggested;
    }

    renderEditForm(){
        if (this.state.edit){
            const {tins, shelves, chosenTinId, createShelf, errors, clearErrors, currentUserId, updateTin, deleteTin, saveToShelf} = this.props;
            return (
                <EditTinForm 
                    tin={tins[chosenTinId]}
                    shelves={shelves}
                    errors={errors}
                    currentUserId={currentUserId}
                    updateTin={updateTin}
                    deleteTin={deleteTin}
                    saveToShelf={saveToShelf}
                    closeEditForm={this.toggleEditForm}
                    clearErrors={clearErrors}
                    createShelf={createShelf}
                />)
        }
    }

    
    shelfNames() {
        const { shelves } = this.props;
        if (!shelves) return null;
        return (
            <div>
                <div className="drop-down select-shelf show-select"
                    id="selected-text">
                    Select a Shelf
                </div>
                <div id="shelf-names" className="menu-box"> 
                    <ul className="drop-down-menu" onClick={e => e.stopPropagation()}>
                        
                        {
                        shelves.map( (shelf, idx) => {
                            return (
                                <li key={idx}
                                    value={shelf.id}
                                    className="shelf-name"
                                    onClick={this.makeShelfSelection}
                                    >
                                        {shelf.name}
                                </li>
                                )
                            })
                        }

                        <a onClick={this.toggleShelfForm}>
                            <li key="a"
                                className="create-shelf-option">
                                <i className="fas fa-plus-circle"></i>
                                Create a shelf
                            </li>
                        </a>

                    </ul>    
                </div> 
                <div className="drop-down-arrow-select-shelf">
                    <i className="fas fa-chevron-down"></i>
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
        if (e.target === menuBox && !list.classList.contains("show-menu")){
            list.classList.add("show-menu");
        } else{
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
    
    handleSaveToShelf(e){
        e.preventDefault();
        
        let shelfTin = {
            shelf_id: parseInt(this.state.chosenShelfId),
            tin_id: parseInt(this.props.chosenTinId)
        }

        this.props.saveToShelf(shelfTin);
        this.setState({confirm: true, chosenShelfId: ""}, this.toggleButtonLock());
    }


    closeConfirm(e){
        this.setState({confirm: false})
    }
    
    displayConfirmation() {
        if (this.state.confirm) {
            return (
                <div className="modal-child-round-box saved" onClick={this.closeConfirm}>
                    <div className="tin-confirmation-box">
                        <h1>{`Saved!`}</h1>
                        <i className="far fa-times-circle"></i>
                    </div>
                </div>
            )
        }
    }

    update(field){
        return e => {
            this.setState({[field]: e.target.value})
            this.toggleButtonLock();
        }
    }

    toggleButtonLock() {
        const {chosenShelfId} = this.state;
        const saveBtn = document.getElementById("save-rin");
    
    
        if (!saveBtn) return;
        if (!chosenShelfId) {
            saveBtn.disabled = true;
            saveBtn.classList.add("no-button");
        } else {
            saveBtn.disabled = false;
            saveBtn.classList.remove("no-button");
        }
    }


    optionToEdit(){
        const { tins, chosenTinId, currentUserId } = this.props;
        if (tins[chosenTinId].userId === currentUserId){
            return (
                <div className="edit-tin" onClick={this.toggleEditForm}>
                    <i className="fas fa-pencil-alt"></i>
                </div>
            )
        }
    }

    render() {
        const { tins, chosenTinId, fetchTins, users} = this.props;
        
        if (!Object.values(tins).length) return null;
        let showTin = tins[chosenTinId];
        let owner = users[showTin.userId];
        if (!owner) return null;
        this.toggleButtonLock();


        return (

            <div className="tin-show-page">
                {this.renderEditForm()}
                {this.showShelfForm()}
                {this.displayConfirmation()}

                <div className="back-button" onClick={this.goBack}>
                    <i className="fas fa-arrow-left"></i>
                </div>
                
                <div className="tin-show-box">

                    <div className="tin-image-show partition">
                        <img className="thumbnail" src={showTin.photoUrl} />
                    </div>

                    <div className="tin-content">

                        <div className="tin-options">

                            <div className="tin-buttons">
                                {this.optionToEdit()}
                            </div>

                            <div className="tin-top-buttons">
                                <button id="save-tin" className="save-tin" onClick={this.handleSaveToShelf}>Save</button>
                                {this.shelfNames()}
                            </div>

                        </div>


                        <a href={showTin.link} target="_blank">{showTin.link}</a>
                        <h1>{showTin.title}</h1>
                        <NavLink className="tin-owner" to={`/users/${owner.id}/tins`}>
                            <i className="fas fa-user-circle"></i>
                            <p>{`${owner.username}`}</p>
                        </NavLink>
                        <p>{showTin.description}</p>


                    </div>
                
                </div>

                <div className="related-tins">
                    <h1>More like this</h1>
                    <TinIndex tins={this.getSuggested()} getInfo={fetchTins}/>
                </div>

            </div>
        )
    }
}

export default withRouter(TinShow);