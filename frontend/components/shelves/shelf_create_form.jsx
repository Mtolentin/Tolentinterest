import React from 'react';
import { withRouter } from 'react-router-dom';

class CreateShelfForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => { 
            this.setState({ [field]: e.currentTarget.value }, this.toggleButtonLock());
        }
    }

    toggleButtonLock(){
        const {name} = this.state;
        const saveBtn = document.getElementById("save-shelf");
        if (!saveBtn) return;

        if (name === ''){
            saveBtn.disabled = true;
            saveBtn.classList.add("no-button");
        } else{
            saveBtn.disabled = false;
            saveBtn.classList.remove("no-button");
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const {createShelf, closeShelfForm} = this.props;
        const {name} = this.state;
        let newShelf = {name};
        closeShelfForm();
        createShelf(newShelf)
    }




    render(){
        const {closeShelfForm} = this.props;
        const {name} = this.state;
        
        
        return (
            <div className="modal-background" onClick={closeShelfForm}>
                <div className="modal-child-round-box" onClick={e => e.stopPropagation()}>
                    
                    
                    <div className="shelf-form-box">
                        <h1>Create a New Shelf</h1>
                        <div className="edit-details">
                            <div>
                                <p>Name</p>
                                <input type="text" 
                                    value={name}
                                    onChange={this.update("name")} 
                                />
                            </div>
                        </div>
                        <div className="bottom-options">
                            <div className="save-or-cancel">
                                <button className="cancel-edit" onClick={closeShelfForm}>Cancel</button>
                                <button id="save-shelf" className="save-edit" onClick={this.handleSubmit}>Create</button>
                                {this.toggleButtonLock()}
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        )


    }
}

export default withRouter(CreateShelfForm);