import React from 'react';
import { NavLink } from 'react-router-dom';
import ShelfEditForm from './shelf_edit_form';

class ShelfIndexItem extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            edit: false
        }
        this.openForm = this.openForm.bind(this);
        this.closeEditForm = this.closeEditForm.bind(this);
    }

    openForm(e){
        e.preventDefault();
        this.setState({edit: true});
    }

    showEditForm(){
        if (this.state.edit){
            const {shelf, updateShelf, deleteShelf, currentUserId} = this.props;
            return <ShelfEditForm 
                    shelf={shelf}
                    currentUserId={currentUserId}
                    updateShelf={updateShelf}
                    deleteShelf={deleteShelf}
                    closeEditForm={this.closeEditForm}
                />;
        }
    }

    closeEditForm() {
        this.setState({ edit: false });
    }



    render(){
        const {shelf} = this.props;

        return (
            <div>
                {this.showEditForm()}
                <NavLink className="shelf-index-item" to={`/users/${shelf.author_id}/shelves/${shelf.id}`}>
                    <h2>{shelf.name}</h2>
                    <p>{shelf.about}</p>
                    <i className="fas fa-pencil-alt icon" onClick={this.openForm}></i>
                </NavLink>
            </div>
        )
    }
}

export default ShelfIndexItem;