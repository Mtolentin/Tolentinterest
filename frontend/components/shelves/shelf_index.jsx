import React from 'react';
import ShelfIndexItem from './shelf_index_item';
import { withRouter } from 'react-router-dom';
import CreateShelfForm from './shelf_create_form';

class ShelfIndex extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            shelfForm: false
        }
        this.openShelfForm = this.openShelfForm.bind(this);
        this.closeShelfForm = this.closeShelfForm.bind(this);
        this.showShelfForm = this.showShelfForm.bind(this);
    }

    componentDidMount(){
        this.props.fetchShelves();
    }

    openShelfForm() {
        this.setState({ shelfForm: true });
    }

    closeShelfForm() {
        this.setState({ shelfForm: false });
    }

    showShelfForm() {
        if (this.state.shelfForm) {
            const { createShelf, clearErrors, currentUserId } = this.props;
            return (<CreateShelfForm
                        createShelf={createShelf}
                        clearErrors={clearErrors}
                        closeShelfForm={this.closeShelfForm}
                        currentUserId={currentUserId.id}
                    />)
        }
    }

    addCreateShelf() {
        const {currentUserId, match} = this.props;
        if (parseInt(match.params.userId) === currentUserId) {
            return (
                <div className="create-tin-button" onClick={this.openShelfForm}>
                    <div className="image">
                        <i className="fas fa-plus-circle"></i>
                    </div>
                    <div className="title">Create Shelf</div>
                </div>
            )
        }
    }


    render(){

        const {shelves, updateShelf, deleteShelf, currentUserId} = this.props;


        return (
            <div className="shelf-index-box">
                {this.showShelfForm()}
                {this.addCreateShelf()}
                {shelves.map((shelf, idx) => {
                    return <ShelfIndexItem 
                            key={idx} 
                            currentUserId={currentUserId}
                            shelf={shelf}
                            updateShelf={updateShelf}
                            deleteShelf={deleteShelf}
                            />
                })}
            </div>
        )
    }
}

export default withRouter(ShelfIndex);