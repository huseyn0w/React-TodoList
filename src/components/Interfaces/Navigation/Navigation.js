import React from 'react';
import '../../../assets/My.css';
import {NavLink} from 'react-router-dom';
import logo from '../../../logo.png';

const Navigation = (props) => {

    let LogoutHandler = () => {
        props.logout();
    }

    
    let LastLink = "";

    props.isLogged ?
        LastLink = <li><NavLink to="/" onClick={LogoutHandler}>Logout</NavLink></li>
    :
        LastLink = <li><NavLink to="signUp">Sign Up</NavLink></li>

    return(
        <div className="NavigationCover">
            <div className="logo">
                <img src={logo} alt="Logo" width="250" height="250" />
            </div>
            <div>
                <h1>Welcome User, please choose an action</h1>
                <ul className="userNav">
                    <li>
                        <NavLink to="/about">About Application</NavLink>
                    </li>
                    <li>
                        <NavLink to="/tasklist"> See All Tasks </NavLink>
                    </li>
                    <li>
                        <NavLink to="/newTask">Add New Task</NavLink>
                    </li>
                    {LastLink}
                </ul>
            </div>
        </div>
    );
}

export default Navigation;