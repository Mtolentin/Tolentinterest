import React from 'react';

class SignUpForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.prevStep = this.prevStep.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.update = this.update.bind(this);
        
        this.addErrors = this.addErrors.bind(this);
        this.showErrors = this.showErrors.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    addErrors(arr) {
        this.setState({ errors: arr }, () => this.nextStep());
    }

    nextStep(){
        const { email, password} = this.state;
        let newUser = {email, password};
        this.props.createNewUser(newUser)
            .then(this.props.clearErrors)
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    checkFields() {
        const { values } = this.props;
        let newErrors = [];
        Object.keys(values).forEach(val => {
            if (values[val] === '') {
                newErrors.push(`${val} can't be blank!`);
            }
        })
        this.props.addErrors(newErrors);
    }

    submitForm(e){
        e.preventDefault();
        const {username} = this.state;
        let user = {username};
        this.props.updateDetails(user);
    }

    showErrors() {
        let errors = this.props.errors;
        let error = errors.length > 0 ? errors[0] : "";
        return error;
    }

    getFormComponent(){
        const {email, password} = this.state;
        const credVals = { email, password };
 
    }
    render(){
        return (
            <div className="modal-background">
                <div className="modal-child" onClick={e => e.stopPropagation()}>
                    <div className="login-form-box">
                        <div className="login-heading">
                            <div><i id="logo" className="fab fa-pinterest"></i></div>
                            <h1>This is Tolentinterest</h1>
                            <div className="prompt">What a Wonderful World</div>
                        </div>
                        <form className="login-form">
                            <div className="login-fields">
                                <input type='text' placeholder="Email" value={values.email} onChange={this.props.update("email")} />
                                <input type='password' placeholder="Create a password" value={values.password} onChange={this.props.update("password")} />
                            </div>
                            <div className="error">
                                {this.props.showErrors()}
                            </div>
                            <div className="login-form-buttons">
                                <button className="login-button button" onClick={this.handleNext} >Create User</button>
                            </div>
                        </form>
                        <div className="signup-link">
                            <Link to='/login'>Already a member? Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default SignUpForm;
