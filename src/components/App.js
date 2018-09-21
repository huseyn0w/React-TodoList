  import React, { Component } from 'react';
  import {connect} from 'react-redux';
  import {Route, Switch, withRouter} from 'react-router-dom';
  import * as actionTypes from '../actions/actionTypes';
  import TaskList from '../containers/Tasks';
  import About from './Interfaces/About/About';
  import NewTask from './Interfaces/Tasks/Add/Input';
  import FullTask from './Interfaces/Tasks/Show/FullTask';
  import Edit from './Interfaces/Tasks/Edit/Edit';
  import Navigation from './Interfaces/Navigation/Navigation';
  import PropTypes from 'prop-types';
  import { withStyles } from '@material-ui/core/styles';
  import {NavLink} from 'react-router-dom';
  import Drawer from '@material-ui/core/Drawer';
  import NotFound from './Interfaces/404';
  import Auth from './Interfaces/Auth/Auth';
  import SignUp from './Interfaces/Auth/Signup';
  import * as actionsList from '../actions/actions';
  import MenuItem from '@material-ui/core/MenuItem';
  import Menu from '@material-ui/core/Menu';
  import Typography from '@material-ui/core/Typography';
  import IconButton from '@material-ui/core/IconButton';
  import AccountCircle from '@material-ui/icons/AccountCircle';
  import Toolbar from '@material-ui/core/Toolbar';
  import AppBar from '@material-ui/core/AppBar';
  import MenuIcon from '@material-ui/icons/Menu';
  import Cover from '../hoc/Cover';
  import HeadlineMessage from '../components/Interfaces/Navigation/Headline';

  const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

  class App extends Component {

    state = {
      top: false,
      left: false,
      bottom: false,
      right: false,
      auth: true,
      anchorEl: null,
    };

    componentDidMount(){
      this.props.tokenTimeCheck();
    }

    toggleDrawer = (side, open) => () => {
      this.setState({
        [side]: open,
      });
    };

    handleLogout = () => {


      this.setState({
        anchorEl: null
      }, () =>{
        setTimeout(() => {
          this.props.loadTrigger();
          this.props.logout();
        }, 100);
      });

      
      
    };
    
    handleSignup = () => {

      this.setState({
        anchorEl: null
      }, () => {
        this.props.loadTrigger();
        this.props.history.push('/signup');
      });
      
    };

    handleLogin = () => {
      this.setState({
        anchorEl: null
      }, () => {
        this.props.loadTrigger();
        this.props.history.push('/login');
      });
    }

    handleClose = () => {
      this.setState({
        anchorEl: null
      });
    };

    handleMenu = event => {
      this.setState({
        anchorEl: event.currentTarget
      });
    };

    

    actionHandler = (email, password) => {
      this.props.userAction(email,password);
    }
    signUpHandler = (email, password) => {
      this.props.userRegister(email,password);
    }
    render() {
      const { classes } = this.props;
      let authorClassNames = classes.grow + ' author';
      const { auth, anchorEl } = this.state;
      const open = Boolean(anchorEl);
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
        <Route path="/show/:id" component={FullTask} exact />
        <Route path="/edit/:id" component={Edit} exact />
        <Route path="/edit/" component={NotFound} exact />
        <Route path="/show/" component={NotFound} exact />
        <Route path="/signup" render={() => NavigationComponent}/>
        <Route path="/" render={() => NavigationComponent} />
        <Route component={NotFound} exact />
      </Switch>
      :
      <Switch>
        <Route path="/tasklist" render={() => AuthComponent} />
        <Route path="/about" component={About} />
        <Route path="/login" render={() => AuthComponent} />
        <Route path="/newTask" render={() => AuthComponent} />
        <Route path="/signup" render={() => SignUpComponent} />
        <Route path="/" component={Navigation} exact />
        <Route component={NotFound} exact />
      </Switch>
      return (
        <div className="App">
            {this.props.isAuth ? 

              <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                  <div
                      tabIndex={0}
                      role="button"
                      onClick={this.toggleDrawer('left', false)}
                      onKeyDown={this.toggleDrawer('left', false)}
                      className="testBlock"
                  >
                      <ul className="userNav userNav2">
                          <li>
                              <NavLink to="/">Homepage</NavLink>
                          </li>
                          <li>
                              <NavLink to="/about">About Application</NavLink>
                          </li>
                          <li>
                              <NavLink to="/tasklist"> See All Tasks </NavLink>
                          </li>
                          <li>
                              <NavLink to="/newTask">Add New Task</NavLink>
                          </li>
                      </ul>
                  </div>
              </Drawer>
              
            : null }
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        {this.props.isAuth ?
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                        </IconButton>
                        : null}
                        <Typography variant="title" color="inherit" className={authorClassNames}>
                          {HeadlineMessage}
                        </Typography>
                        {auth && (
                        <div>
                            <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose}
                            >
                            {this.props.isAuth ?
                              <MenuItem onClick={this.handleLogout}>Logout</MenuItem> 
                              :
                              <Cover>
                                <MenuItem onClick={this.handleLogin}>Login</MenuItem>
                                <MenuItem onClick={this.handleSignup}>Sign up</MenuItem>
                              </Cover>
                            }
                            </Menu>
                        </div>
                        )}
                    </Toolbar>
                </AppBar>
                <div className="taskListCover">
                    {TaskRoutes}
                </div>
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
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        userAction: (login,password) => dispatch(actionsList.loginAction(login,password)),
        tokenTimeCheck: () => dispatch(actionsList.tokenTimeCheck()),
        logout: () => dispatch(actionsList.logout()),
        userRegister: (email,password) => dispatch(actionsList.userSignUp(email,password)),
    }
  }

  App.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App)));

