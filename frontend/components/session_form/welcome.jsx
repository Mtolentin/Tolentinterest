import React from 'react';
import { Link } from 'react-router-dom';

class Welcome extends React.Component{
    
    constructor(props){
        super(props);
        this.demoUser = this.demoUser.bind(this);
    }

    componentDidMount(){
        let body = document.querySelector("body");
        body.style.height = "100%";
        body.style.overflow = "hidden";
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
        return (
            <div>
                <div className="modal-background">
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        <div className="login-signup">
                            <img id="titular"
                                src="https://app-stelle.s3-us-west-1.amazonaws.com/Titular.jpg"
                            />
                            <h2>This is Tolentinterest</h2>
                            <div className="buttons">
                                <Link to='/login'>
                                    <button className="login-button button">Log in</button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="signup-button button">Sign up</button>
                                </Link>
                            </div>
                            <div>
                                <Link to='/'>
                                    <button className="welcome-demo button" onClick={this.demoUser}>Demo</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Welcome;