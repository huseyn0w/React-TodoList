import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});


class Auth extends Component{

    state = {
        login:null,
        password: null,
        errorMessage:null
    }

    loginHandler = (ev) => {
        this.setState({login:ev.target.value});
    }

    passwordHandler = (ev) => {
        this.setState({password:ev.target.value});
    }

    actionHandler = (event) => {
        event.preventDefault();
        let login = this.state.login;
        let password = this.state.password;
        
        if(this.state.password === null || this.state.login === null){
            this.setState({errorMessage:<h3 className="loginFail">Login or password field are empty!</h3>})
            return false;
        }
        else if(this.state.password !== null && this.state.password.length < 6){
            this.setState({errorMessage:<h3 className="loginFail">Password length is minimum 6 characters</h3>})
            return false;
        }
        else if(this.props.tryLogin === false) {
            this.setState({errorMessage:<h3 className="loginFail">Invalid username / password</h3>})
            return false;
        }
        else{
            this.props.actionHandler(login, password);
        }
        
    }

    render(){
        const { classes } = this.props;
        return(
            <div className="FieldGroup">
                <h2>Login</h2>
                {this.state.errorMessage}
                <form onSubmit={this.actionHandler}>
                    <TextField
                        required
                        id = "email"
                        label = "Email"
                        fullWidth
                        margin = "normal"
                        onChange={this.loginHandler}
                    />
                    <TextField
                        required
                        id = "password"
                        label = "Password"
                        type="password"
                        fullWidth
                        margin = "normal"
                        onChange={this.passwordHandler}
                    />
                    <Button variant="contained" type="submit" fullWidth color="primary" onClick={this.actionHandler} className={classes.button}>
                        Log In
                    </Button>
                </form>
                <NavLink to="/signup"> Dont have an account? Sign up! </NavLink>
                <br/>
                <br/>
                <NavLink to="/" className="materialButton">
                    <Button variant="contained" color="secondary"  className={classes.button}>
                        Go Back
                    </Button>
                </NavLink>
            </div>
        );
    }
} 

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);