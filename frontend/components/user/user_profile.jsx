import React from 'react';
import {NavLink, Link, withRouter} from 'react-router-dom';


import CreateShelfForm from '../shelves/shelf_create_form';
import EditProfileForm from './edit_profile';

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            shelfForm: false,
            editForm: false
        }
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleShelfForm = this.toggleShelfForm.bind(this);
        this.toggleEditForm = this.toggleEditForm.bind(this);
    }


    componentDidMount(){
        const {fetchUser, match} = this.props;
        fetchUser(match.params.userId);
        window.scrollTo(0, 0);
        window.addEventListener("click", this.toggleMenu);
    }


    componentWillUnmount(){
        window.removeEventListener("click", this.toggleMenu);
    }


    toggleMenu(e) {
        e.stopPropagation();
        let options = document.getElementById("options");
        let list = document.getElementById("create-options");
        if (!options) return null;
        if (e.target === options && !list.classList.contains("show-menu")) {
            list.classList.add("show-menu");
        } else {
            list.classList.remove("show-menu");
        }
    }


    toggleShelform(){
        let status = this.state.shelfForm;
        this.setState({shelfForm: !status});
    }


    showShelfForm(){
        if (this.state.shelfForm){
            const {createShelf, clearErrors, user} = this.props;
            return (<CreateShelfForm 
                        createShelf={createShelf}
                        clearErrors={clearErrors}
                        closeShelfForm={this.toggleShelfForm}
                        currentUserId={user.id}
                    />
            )
        }
    }

    currentUserOnly(){
        const {user, currentUserId} = this.props;

        if (user.id === currentUserId){
            return (
                <div>

                    <div className="icon">
                        <i id="options" className="dropdown fas fa-plus"></i>
                    </div>


                    <ul id="create-options" className="drop-down-menu menu-box">
                        <a onClick={this.toggleShelfForm}><li>Create Shelf</li></a>
                        <Link to="/tin-builder"><li>Create Tin</li></Link>
                    </ul>


                    <div className="icon" onClick={this.toggleEditForm}>
                        <i className="fas fa-pencil-alt"></i>
                    </div>
                    
                </div>
            )
        }
    }


    toggleEditForm(){
        let status = this.state.editForm;
        this.setState({editForm: !status});
    }


    showEditForm(){
        const {user, updateDetails} = this.props;
        
        if ( this.state.editForm ){
            return ( <EditProfileForm 
                    user={user}
                    updateDetails={updateDetails}
                    closeEditForm={this.toggleEditForm}
                    />
            )
        }
    }



    render(){
        const {user} = this.props;
        if (!user) return null;
        
        return (

            <div className="user-profile-box">
                {this.showShelfForm()}
                {this.showEditForm()}


                <div className="header">
                    
                    <div className="top-buttons">
                        {this.currentUserOnly()}
                    </div>

                    <div className="user-selection">
                        <NavLink className="button" to={`/users/${user.id}/shelves`}>Shelves</NavLink>
                        <NavLink className="button" to={`/users/${user.id}/tins`}>Tins</NavLink>
                    </div>


                </div>
            
            </div>


        )
    }
}

export default withRouter(UserProfile);