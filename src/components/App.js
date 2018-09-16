  import React, { Component } from 'react';
  import {connect} from 'react-redux';
  import {Route, Switch, withRouter} from 'react-router-dom';
  import TaskList from '../containers/Tasks';
  import About from './Interfaces/About/About';
  import NewTask from './Interfaces/Tasks/Add/Input';
  import FullTask from './Interfaces/Tasks/Show/FullTask';
  import Navigation from './Interfaces/Navigation/Navigation';
  import NotFound from './Interfaces/404';
  import Auth from './Interfaces/Auth/Auth';
  import SignUp from './Interfaces/Auth/Signup';
  import * as actionsList from '../actions/actions';

  class App extends Component {

    componentDidMount(){
      this.props.tokenTimeCheck();
    }

    

    actionHandler = (email, password) => {
      this.props.userAction(email,password);
    }
    signUpHandler = (email, password) => {
      this.props.userRegister(email,password);
    }
    render() {
      let NewTaskComponent = <NewTask nstatus={false} />
      let NavigationComponent = <Navigation isLogged={this.props.isAuth} logout={this.props.logout} />
      let AuthComponent = <Auth isLogged={this.props.isAuth} tryLogin={this.props.tryLogin} actionHandler={this.actionHandler} />
      let SignUpComponent = <SignUp actionHandler={this.signUpHandler} signup={this.props.signupResult} />
      let TaskRoutes = 
      this.props.isAuth ?
      <Switch>
        <Route path="/tasklist" component={TaskList} exact />
        <Route path="/about" component={About} />
        <Route path="/newTask" render={() => NewTaskComponent} />
        <Route path="/task-:id" component={FullTask} exact />
        <Route path="/signup" render={() => NavigationComponent}/>
        <Route path="/" render={() => NavigationComponent} />
        <Route component={NotFound} exact />
      </Switch>
      :
      <Switch>
        <Route path="/tasklist" render={() => AuthComponent} />
        <Route path="/about" component={About} />
        <Route path="/newTask" render={() => AuthComponent} />
        <Route path="/signup" render={() => SignUpComponent} />
        <Route path="/" component={Navigation} exact />
        <Route component={NotFound} exact />
      </Switch>
      return (
        <div className="App">
          <div>
            {TaskRoutes}
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      isAuth: state.isAuth,
      tryLogin:state.tryLogin,
      signupResult:state.signupResult
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        userAction: (login,password) => dispatch(actionsList.loginAction(login,password)),
        tokenTimeCheck: () => dispatch(actionsList.tokenTimeCheck()),
        logout: () => dispatch(actionsList.logout()),
        userRegister: (email,password) => dispatch(actionsList.userSignUp(email,password)),
    }
  }

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

