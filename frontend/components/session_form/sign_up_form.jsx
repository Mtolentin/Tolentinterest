import React from 'react';
import Credentials from './sign_up_details/credentials';
import Success from './sign_up_details/success';


class SignUpForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            errors: [],
            email: '',
            password: '',
            username: '',
        }
        this.prevStep = this.prevStep.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.update = this.update.bind(this);
        
        this.addErrors = this.addErrors.bind(this);
        this.showErrors = this.showErrors.bind(this);
        this.goForward = this.goForward.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    addErrors(arr) {
        this.setState({ errors: arr }, () => this.nextStep());
    }

    nextStep(){
        const {step, email, password, age} = this.state;
        if (step === 1) {
            let newUser = {email, password, age};
            this.props.createNewUser(newUser)
                .then(this.props.clearErrors)
                .then(this.goForward);
        } else{
            this.goForward();
        }
    }

    goForward(){
        const {errors, step} = this.state;
        if (errors.length === 0 && this.props.errors.length === 0) {
            this.setState({ step: step + 1 })
        }
    }

    prevStep(){
        const {step} = this.state;
        this.setState({ step: step - 1, errors: []})
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    submitForm(e){
        e.preventDefault();
        const {username, first_name, last_name, gender, language, region} = this.state;
        let user = {username, first_name, last_name, gender, language, region};
        this.props.updateDetails(user);
    }

    showErrors() {
        let errors = (this.state.step === 1) ? this.props.errors : this.state.errors;
        let error = errors.length > 0 ? errors[0] : "";
        return error;
    }

    getFormComponent(){
        const { step, email, password, age, username, first_name, last_name, gender, language, region } = this.state;
        const credVals = { email, username, password};
        switch (step) {
            case 1:
                return <Credentials
                        update={this.update}
                        newUserDetails={this.props.newUserDetails}
                        addErrors={this.addErrors}
                        showErrors={this.showErrors}
                        submitForm={this.submitForm}
                        values={credVals}
                    />;

            default: return <Success submitForm={this.submitForm} />;
        }
    }

    render(){
        return (
            <div>
                {this.getFormComponent()}
            </div>
        )
    }
}

export default SignUpForm;