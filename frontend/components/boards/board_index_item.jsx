import React from 'react';
import { NavLink } from 'react-router-dom';
import BoardEditForm from './board_edit_form';

class BoardIndexItem extends React.Component{
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
            const {board, updateBoard, deleteBoard, currentUserId} = this.props;
            return <BoardEditForm 
                board={board}
                currentUserId={currentUserId}
                updateBoard={updateBoard}
                deleteBoard={deleteBoard}
                closeEditForm={this.closeEditForm}
            />;
        }
    }

    closeEditForm() {
        this.setState({ edit: false });
    }

    render(){
        const {board} = this.props;
        return (
            <div>
                {this.showEditForm()}
                <NavLink className="board-index-item" to={`/users/${shelve.userId}/shelves/${shelve.id}`}>
                    <h2>{board.name}</h2>
                    <p>{board.description}</p>
                    <i className="fas fa-pencil-alt icon" onClick={this.openForm}></i>
                </NavLink>
            </div>
        )
    }
}

export default BoardIndexItem;