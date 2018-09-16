import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';


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
        return(
            <div className="FieldGroup">
                <h2>Login</h2>
                {this.state.errorMessage}
                <form onSubmit={this.actionHandler}>
                    <input type="email" name="login" onChange={this.loginHandler} className="form-control" placeholder="E-Mail" />
                    <input type="password" onChange={this.passwordHandler} name="passworld" className="form-control" placeholder="Password" />
                    <button type="submit" onClick={this.actionHandler} className="btn btn-success AddTask">Log in</button>
                </form>
                <NavLink to="/signup"> Dont have an account? Sign up! </NavLink>
                <br/>
                <br/>
                <NavLink to="/" className="btn btn-info">Go Back</NavLink>
            </div>
        );
    }
} 

export default Auth;