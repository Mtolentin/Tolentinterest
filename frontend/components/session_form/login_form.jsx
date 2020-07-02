import React from 'react';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.demoUser = this.demoUser.bind(this);
    }

    componentWillUnmount(){
        this.props.clearErrors();
    }

    update(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    demoUser(e){
        e.preventDefault();
        const user = {
            email: "m477@null.net",
            password: "hunter12"
        }
        this.props.processForm(user);
    }



    render(){
        const {errors} = this.props;

        return (


            <div>

                <div className="modal-background">
                    <div className="side-button">
                        <Link to="/signup">Sign Up</Link>
                    </div>

                    <div className="modal-child" onClick={e => e.stopPropagation()}>

                        <div className="login-form-box">


                            <form className="login-form">

                                <div className="login-heading">
                                    <div><i id="logo" className="fas fa-cat"></i></div>
                                    <h1>This is Tolentinterest</h1>
                                </div>


                                <div className="login-fields">
                                    <input type='text' placeholder="Email" value={this.state.email} onChange={this.update("email")} />
                                    <input type='password' placeholder="Password" value={this.state.password} onChange={this.update("password")} />
                                </div>


                                <div className="error">
                                    {errors.length > 0 ? errors[0] : ""}
                                </div>


                                <div className="login-form-buttons">
                                    <button className="login-button button" onClick={this.handleSubmit} >Log in</button>
                                </div>


                            </form>


                            <div className="signup-link">
                                <Link to='/signup'>Create Account</Link>
                            </div>


                        </div>

                    </div>

                </div>


            </div>


        )
    }
}

export default LoginForm;