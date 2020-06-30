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
        const user = { email: "demouser@gmail.com", password: "123456"}
        this.props.processForm(user);
    }



    render(){

        return (


            <div>


                <div className="modal-background">
                    <div className="modal-child" onClick={e => e.stopPropagation()}>


                        <div className="login-signup">

                            <div><i id="logo" className="fab fa-pinterest"></i></div>
                            <h2>This is Tolentinterest</h2>
                            <div>The Cat's Meow</div>


                            <div className="buttons">
                                <Link to='/login'>
                                    <button className="login-button button">Log in</button>
                                </Link>
                                <Link to='/signup'>
                                    <button className="signup-button button">Create Account</button>
                                </Link>
                            </div>

                            <div>
                                <Link to='/'>
                                    <button className="welcome-demo button" onClick={this.demoUser}>Sample</button>
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