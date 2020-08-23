import React from 'react';

class EditProfileForm extends React.Component{
    constructor(props){
        super(props);
        const { user } = this.props;
        this.state = {
            email: user.email,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            bio: user.bio
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    update(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        const { username } = this.state;
        let user = { username };
        this.props.updateDetails(user);
        this.props.closeEditForm();
    }

    render(){
        const { username } = this.state;
        return (
            <div className="modal-background" onClick={this.props.closeEditForm}>
                <div className="modal-child-round-box" onClick={e => e.stopPropagation()}>
                    <div className="edit-details">
                        <h1>Edit Profile</h1>
                        <div className="user-edit-form-box">
                            <div className="user-edit-details">
                                <div className="content">
                                    <div>
                                        <p>Username</p>
                                        <input type="text" value={username || ""} onChange={this.update("username")} />
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-options">
                                <div className="save-or-cancel">
                                    <button className="cancel-edit" onClick={this.props.closeEditForm}>Cancel</button>
                                    <button className="save-edit" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditProfileForm;