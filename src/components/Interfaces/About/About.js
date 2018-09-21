import React from 'react';
import '../../../assets/My.css';
import author from '../../../profile.jpg';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const Navigation = (props) => {
    const { classes } = props;
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
                <div className="navigateButtons">
                    <NavLink to="/">
                        <Button variant="contained" color="secondary"  className={classes.button}>
                            Go Back
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);