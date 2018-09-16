import React from 'react';
import '../../../assets/My.css';
import author from '../../../profile.jpg';

import {NavLink} from 'react-router-dom';

const Navigation = (props) => {
    return(
        <div className="NavigationCover">
            <div>
                <div className="about">
                    <div className="aboutInfo">
                        <h1>About appliaction</h1>
                        <p>Author: <a href="https://www.linkedin.com/in/huseyn0w/" target="_blank" rel="noopener noreferrer">huseyn0w</a></p>
                    </div>
                    <div className="aboutImage">
                        <img src={author} alt="Profile" width="150" className="profile" height="150" />
                    </div>
                </div>
                <h3>Technologies that used in creation of this app:</h3>
                <ul>
                    <li>React JS (Core)</li>
                    <li>Redux</li>
                    <li>React Router</li>
                    <li>Firebase</li>
                    <li>Async</li>
                </ul>
                <NavLink to="/" className="btn btn-success">Go Back</NavLink>
            </div>
        </div>
    );
}

export default Navigation;