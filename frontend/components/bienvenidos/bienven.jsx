import React from 'react';
import { Link } from 'react-router-dom';
import Yodal from '../../yodal';

class Bienven extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            showYodal: false,
            signUp: false
        }
        this.demoUser = this.demoUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleYodal = this.toggleYodal.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.src = "https://app-stelle.s3-us-west-1.amazonaws.com/";
        this.iSrc = this.src + "Titular.jpg";
        this.bienIdx = 0;
        this.yehName = ["one", "two", "three", "four", "five"];
    }

    componentDidMount(){
        let src = "https://app-stelle.s3-us-west-1.amazonaws.com/";
        let bienIdx = 0;
        let yehPanels = ["ek", "do", "tin", "char", "panch"];
        let yehColores = ["orange", "purple", "green", "blue", "red"];
        let yehFlavs = ["Great Destination", "Good Read",
            "Culinary Inspiration", "Family Moment", "Tabby Time"];
        let yehName = ["one", "two", "three", "four", "five"];
        let flavorDiv = document.getElementById("Flavors");

        setTimeout( function() { 
            document.getElementById("BienColumn1").classList.remove("noGo");
            flavorDiv.classList.remove("noGo");
            flavorDiv.style.color = yehColores[bienIdx];
            flavorDiv.classList.add("aniUp");
        }, 250);

        for (let i = 1; i < 8; i++) { animationAssist(i, i * 250); }

        setTimeout( function() { 
            document.getElementById("Period_ek").classList.remove("active");
            document.getElementById("Period_do").classList.add("active");
        }, 4250);
        
        this.bienFn = setInterval( function() {
            setTimeout( function() {
                flavorDiv.classList.remove("aniUp");
                flavorDiv.classList.add("aniDown");
            }, 250);
            for (let i = -1; i > -8; i--) { animationAssist(i, i * -250); }
            let imgNum = 1;
            bienIdx += 1; if (bienIdx === 5) { bienIdx = 0;} 
            setTimeout( function() {
                flavorDiv.style.color = yehColores[bienIdx];
                flavorDiv.innerText=yehFlavs[bienIdx];
                flavorDiv.classList.remove("aniDown");
                flavorDiv.classList.add("aniUp");
            }, 1000);
            for (let i = 1; i < 8; i++) { 
                animationAssist(i, i * 250 + 750, [imgNum, yehName[bienIdx]]);
                imgNum += 5;
            }
            setTimeout( function() {
                yehPanels.forEach(num => {
                    document.getElementById("Period_" + 
                    `${num}`).classList.remove("active");
                })
                if (bienIdx + 1 === 5) { 
                    document.getElementById("Period_ek")
                        .classList.add("active");
                } else {
                    document.getElementById("Period_" + 
                        `${yehPanels[bienIdx + 1]}`).classList.add("active");
                }
            }, 4250);
        }, 5000);

        function animationAssist(columnNum, timeoutValue, options = []){
            if (options.length > 0) {
                setTimeout( function() {
                    document.getElementById("BienColumn" + `${columnNum}`)
                    .classList.remove("noGo");
                    document.getElementById("BienColumn" + `${columnNum}`)
                        .childNodes.forEach( img => {
                            img.src = `${src}`+`${options[1]}`
                            + `${options[0]}` + ".jpeg";
                            img.classList = "";  
                            img.className = "aniUp";
                            options[0]+= 1;
                        })
                    }, timeoutValue);
                } else {
                    setTimeout( function() {
                        if (columnNum > 0) {
                        document.getElementById("BienColumn" + `${columnNum}`)
                        .classList.remove("noGo");
                        document.getElementById("BienColumn" + `${columnNum}`)
                        .childNodes.forEach( img => {
                            img.className = "aniUp"; });
                        } else {
                        document.getElementById("BienColumn" + 
                            `${columnNum * -1}`).childNodes.forEach(  img => { 
                                img.classList = ""; img.className = "aniDown"; 
                    });}
                }, timeoutValue);
            }
        }
    }

    update(field) {
        return e => {
            this.setState({ [field]: e.target.value });
        }
    }

    componentWillUnmount(){ clearInterval(this.bienFn); }

    demoUser(e){ e.preventDefault();
        const user = { email: "m477@null.net", password: "stellebelle1" }
        this.props.processForm(user);
    }

    update(field){
        return e => this.setState({[field]: e.currentTarget.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    showErrors() {
        let errors = this.props.errors;
        let error = errors.length > 0 ? errors[0] : "";
        return error;
    }

    toggleYodal(){ 
        this.setState({ showYodal: !this.state.showYodal });
        this.setState({ signUp: !this.state.signUp });
        console.log(this.state.showYodal);
        console.log(this.state.signUp);
    }

    toggleLogin(){
        this.setState({ showYodal: true });
        this.setState({ signUp: false });
    }

    toggleSignup(){
        this.setState({ showYodal: true });
        this.setState({ signUp: true });
    }

    render(){
        const {errors} = this.props;
        return (
            <div id="Bienvenidos">

                <div id="BienTiles">
                    <div id="BienBar">
                        <div id="BBar_1">
                            <img className="BienTitular" src= {`${this.iSrc}`}/>
                            <span>Tolentinterest</span>
                        </div>
                        <div id="BBar_4">
                            <button className="BienLogin" 
                                onClick={this.toggleLogin}>Log In
                            </button>
                            <button className="BienSignUp" 
                                onClick={this.toggleSignup}>Signup
                            </button>
                            <Link to='/'> <button className="BienDemo" 
                                onClick={this.demoUser}>Demo
                            </button> </Link>
                        </div>
                    </div>
                    <div id="BienCaps">
                        <div id="GetYourNext">Get your next</div>
                        <div id="Flavors" style={{color: "white"}}>
                            Great Destination</div>
                        <div id="Periods">
                            <span id="Period_ek" className="active">.</span>
                            <span id="Period_do">.</span>
                            <span id="Period_tin">.</span>
                            <span id="Period_char">.</span>
                            <span id="Period_panch">.</span>
                        </div>
                    </div>
                    <div id="BienColumn1" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "1.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "2.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "3.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "4.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "5.jpeg" } />
                    </div>
                    <div id="BienColumn2" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "6.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "7.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "8.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "9.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "10.jpeg" } />
                    </div>
                    <div id="BienColumn3" className="noGo">
                    <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "11.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "12.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "13.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "14.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "15.jpeg" } />
                    </div>
                    <div id="BienColumn4" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "16.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "17.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "18.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "19.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "20.jpeg" } />
                    </div>
                    <div id="BienColumn5" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "21.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "22.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "23.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "24.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "25.jpeg" } />
                    </div>
                    <div id="BienColumn6" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "26.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "27.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "28.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "29.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "30.jpeg" } />
                    </div>
                    <div id="BienColumn7" className="noGo">
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "31.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "32.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "33.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "34.jpeg" } />
                        <img src={`${this.src}`+`${this.yehName[this.bienIdx]}`
                            + "35.jpeg" } />
                    </div>
                </div>
                {this.state.showYodal ? (
                    this.state.signUp ? (
                        <Yodal>
                            <div className="Yodal" 
                                onClick={e => e.stopPropagation()}>
                                <div className="YodalBox">
                                    <div className="login-header">
                                        <h1>Tolentinterest</h1>
                                        <div>Come Join In!</div>
                                    </div>
                                    <form className="login-form">
                                        <div className="login-fields">
                                            <input type='text' 
                                                placeholder="Email" 
                                                value={this.props.email} 
                                                onChange={this.update
                                                    ("email")} />
                                            <input type='password' 
                                                placeholder="Create a password"
                                                value={this.props.password} 
                                                onChange={this.update(
                                                    "password")} />
                                        </div>
                                        <div className="error">
                                            {this.showErrors()}
                                        </div>
                                        <div className="login-form-buttons">
                                            <button 
                                                className=
                                                    "login-button button" 
                                                onClick={this.handleNext} >
                                                    Create User
                                            </button>
                                            <div>
                                                Already a Member?
                                            </div>
                                        </div>
                                    </form>
                                    <button className="BienLogin button" 
                                        onClick={this.toggleLogin}>Log In
                                    </button>
                                </div>
                                <div className="dimmer"></div>
                            </div>
                        </Yodal>
                    ) : (
                        <Yodal>
                            <div className="Yodal" 
                                onClick={e => e.stopPropagation()}>
                                <div className="YodalBox">
                                    <form className="login-form">
                                        <div className="login-header">
                                            <h1>
                                                Welcome Back
                                            </h1>
                                        </div>
                                        <div className="login-fields">
                                            <input type='text' 
                                                placeholder="Email" 
                                                value={this.state.email} 
                                                onChange=
                                                    {this.update("email")} />
                                            <input type='password' 
                                                placeholder="Password" 
                                                value={this.state.password}
                                                 onChange={
                                                    this.update("password")} />
                                        </div>
                                        <div className="error">
                                            {errors.length > 0 ? errors[0] : ""}
                                        </div>
                                        <div className="login-form-buttons">
                                            <button className=
                                                "login-button button" 
                                                onClick={this.handleSubmit} 
                                                >Log in
                                            </button>
                                            <div>OR</div>
                                            <button className=
                                                "login-button button demo" 
                                                onClick={this.demoUser}
                                                >Demo Login
                                            </button>
                                        </div>
                                    </form>
                                    <button className="BienLogin button" 
                                        onClick={this.toggleSignup}
                                        >New Members
                                    </button>
                                </div>
                                <div className="dimmer"></div>
                            </div>
                        </Yodal>
                    )
                ) : null }
            </div>              
        )
    }
}
export default Bienven;