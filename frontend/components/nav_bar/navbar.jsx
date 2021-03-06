import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ currentUserId, logout }) => {

    const showMenu = () => {
        document.getElementById("settings").classList.toggle("show-menu")
    }

    return (
        <div>
            <div id="MainBar">
                <div id="MBar_Left">
                    <img className="BienTitular" src= 
                    "https://app-stelle.s3-us-west-1.amazonaws.com/Titular.jpg"
                    />
                    <div className="home-button">
                        <Link to="/home">Home</Link>
                    </div>
                </div>

                <div id="MBar_Right">
                    <NavLink 
                        to={`/users/${currentUserId}/pins`} 
                        className="icon profile">
                        <i className="fas fa-user"></i>
                    </NavLink>

                    <div className="options">
                        <div className="icon" onClick={showMenu}>
                            <i className="drop-down fas fa-chevron-down"></i>
                        </div>
        
                        <div id="settings" className="menu-back" 
                            onClick={showMenu}>
                            <ul className="drop-down-menu" 
                                onClick={ e => e.stopPropagation()}>
                                <li onClick={logout}>Log out</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* <nav className="header-logout">
                <NavLink to="/home" className="icon">
                    <img id="titular" src=
                    "https://app-stelle.s3-us-west-1.amazonaws.com/Titular.jpg"
                    />
                </NavLink>
               
                <div className="home-button">
                    <Link to="/home">Home</Link>
                </div>
                
                <NavLink 
                    to={`/users/${currentUserId}/pins`} 
                    className="icon profile">
                    <i className="fas fa-user"></i>
                </NavLink>
                
                <div className="options">
                    <div className="icon" onClick={showMenu}>
                        <i className="drop-down fas fa-chevron-down"></i>
                    </div>
                    
                    <div id="settings" className="menu-back" onClick={showMenu}>
                        <ul className="drop-down-menu" 
                            onClick={ e => e.stopPropagation()}>
                            <li onClick={logout}>Log out</li>
                        </ul>
                    </div>
                </div>

            </nav>

            <div className="nav-space"></div>
         */}
        </div>
    )
}

export default NavBar;