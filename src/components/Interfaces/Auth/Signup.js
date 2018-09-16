import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class signUp extends Component{

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
    

    actionHandler = (ev) => {
        ev.preventDefault();
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
        else if(this.props.signup === false) {
            this.setState({errorMessage:<h3 className="loginFail">We have a user with this email. Please choose another one.</h3>})
            return false;
        }
        else{
            this.props.actionHandler(login, password);
        }
    }

    render(){
        
        
        return(
            <div className="FieldGroup">
                <h2>Signup Interface</h2>
                {this.state.errorMessage}
                <form onSubmit={this.actionHandler}>
                    <input type="email" name="login" onChange={this.loginHandler} className="form-control" placeholder="E-Mail" />
                    <input type="password" onChange={this.passwordHandler} name="passworld" className="form-control" placeholder="Password" />
                    <button type="submit" onClick={this.actionHandler} className="btn btn-success AddTask">Sign up</button>
                </form>
                <br/>
                <br/>
                <NavLink to="/" className="btn btn-info">Go Back</NavLink>
            </div>
        );
    }
} 

export default signUp;