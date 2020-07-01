import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = ({ currentUserId, logout }) => {

    const showMenu = () => {
        document.getElementById("settings").classList.toggle("show-menu")
    }

    return (
        <div>

            <nav className="header-logout">

                <NavLink to="/home" className="icon">
                    <i id="logo" className="fab fa-pinterest"></i>
                </NavLink>

                <div className="a_space"></div>

                <div className="home-button">
                    <Link to="/home">Home</Link>
                </div>

                <NavLink to={`/users/${currentUserId}/tins`} className="icon profile">
                    <i className="fas fa-user"></i>
                </NavLink>

                <div className="options">
                    <div className="icon" onClick={showMenu}><i className="drop-down fas fa-angle-down"></i></div>
                    
                    <div id="settings" className="menu-back" onClick={showMenu}>
                        <ul className="drop-down-menu" onClick={ e => e.stopPropagation()}>
                            <li onClick={logout}>Log out</li>
                        </ul>
                    </div>

                </div>

            </nav>
        
        </div>
    )
}

export default NavBar;