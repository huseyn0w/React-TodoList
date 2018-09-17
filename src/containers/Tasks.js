import React, {Component} from 'react';
import HasTasks from './Task';
import {connect} from 'react-redux';
import NoTasks from '../components/Interfaces/Tasks/Add/DefaultUI';
import * as actionsList from '../actions/actions';
import Spinner from '../components/Interfaces/Tasks/Show/Spinner';
import * as actionTypes from '../actions/actionTypes';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import {NavLink} from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

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



class Tasks extends Component{

    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
        auth: true,
        anchorEl: null,
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    


    taskHeaderHandler = (header) => {
        this.props.newTaskHeaderHandler(header);
    }

    taskDescHandler = (description) => {
        this.props.newTaskDescHandler(description);
    }

    componentDidMount() {
        this.props.taskListLOAD(this.props.token, this.props.userID);
    }

    handleChange = event => {
        this.setState({
            auth: event.target.checked
        });
    };

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleLogout = () => {
        this.props.loadTrigger();
        this.props.logout();
    };
    
    render(){
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const { classes } = this.props;
        const taskListObjectSize = Object.keys(this.props.tasks).length;
        let authorClassNames = classes.grow + ' author';

        return(
            <div>
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
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={authorClassNames}>
                        PERFECT TODOLIST APPLICATION CREATED BY ELMAN HUSEYNOV BASED ON REACT JS
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
                            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                        )}
                    </Toolbar>
                </AppBar>
                <div className="taskListCover">
                    {this.props.loaded  ? 
                        taskListObjectSize > 0 ?
                        <div>
                            <HasTasks />
                        </div>
                        :                 
                        <NoTasks
                            status={this.props.NewtaskStatus}
                            onAdd={this.props.newTaskStatusUpdate}
                            onTaskHeader={(ev) => this.taskHeaderHandler(ev)}
                            onTaskDesc={(ev) => this.taskDescHandler(ev)}
                            onSaveNewTask={this.props.addNewTask}
                        />
                        :
                        <Spinner />
                    }
                </div>
            </div>
                
            </div>
            
        );
    }
};

let mapStateToProps = (state) => {
    return {
        loaded:state.loaded,
        tasks:state.tasks,
        token: state.tokenID,
        userID:state.userID,
        NewtaskStatus: state.NewtaskStatus
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        logout: () => dispatch(actionsList.logout()),
        taskListLOAD: (token, userID) => dispatch(actionsList.initTasks(token, userID)),
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        newTaskHeaderHandler: (ev) => dispatch({ type:actionTypes.newTaskHeaderHandler, value:ev}),
        newTaskDescHandler: (ev) => dispatch({ type:actionTypes.newTaskDescHandler, value:ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask})
    }
}

Tasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Tasks));