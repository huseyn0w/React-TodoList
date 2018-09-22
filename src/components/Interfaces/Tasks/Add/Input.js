import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actionTypes from '../../../../actions/actionTypes';
import * as actionList from '../../../../actions/actions';
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

const currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();

if (currentMonth < 10) {
    currentMonth = '0' + currentMonth;
}

const deadline = new Date().getFullYear() + '-' + currentMonth + '-' + currentDay;


class Input extends Component {
    
    state= {
        submitted:false,
        taskHeader:null,
        taskDescription:null,
        taskDeadline:deadline,
        errorMessage:null,
    }

    taskHeaderHandler = (ev) => {
        this.setState({taskHeader: ev.target.value});
    }

    taskDescHandler = (ev) => {
        this.setState({taskDescription: ev.target.value});
    }

    taskDeadlineHandler = (ev, date) => {
        this.setState({ taskDeadline: date });
    }

    saveNewTaskHander = (ev) => {
        ev.preventDefault();
        //If Validation Succcess
        let taskHeader = this.state.taskHeader;
        let taskDescription = this.state.taskDescription;
        let taskDeadline = this.state.taskDeadline;
        if (taskHeader === null || taskHeader.length === 0){
            this.setState({errorMessage: <h3 className="loginFail">Task header field is empty!</h3>});
            return false;
        }
        else if (taskDescription === null || taskDescription.length === 0){
            this.setState({errorMessage: <h3 className="loginFail">Task description field is empty!</h3>});
            return false;
        }
        else if (taskDeadline === null || taskDeadline.length === 0){
            this.setState({ errorMessage: <h3 className="loginFail">Task Deadline is not set!</h3> });
            return false;
        }
        else{
            this.setState({submitted:true});
            this.props.history.push({
                pathname: '/tasklist',
                workType:"Adding"
            })
            this.props.loadStatusHandler();
            this.props.addNewTask(this.state.taskDescription, this.state.taskHeader,this.props.token,this.props.userID, this.state.taskDeadline);
        }
        
    }




    render(){

        const { classes } = this.props;
        
        return (
            <div>
                <div className="Field">
                    <div className="FieldGroup">
                        <h2>New Task Adding Interface</h2>
                        {this.state.errorMessage}
                        <form className={classes.container} onSubmit={this.saveNewTaskHander}>
                            <TextField
                                required
                                id = "taskHeader"
                                label = "Task Header"
                                fullWidth
                                margin = "normal"
                                onChange={this.taskHeaderHandler}
                            />
                            <TextField
                                required
                                id = "taskDescription"
                                label = "Task Description"
                                fullWidth
                                margin = "normal"
                                multiline={true}
                                rows={3}
                                rowsMax={10}
                                onChange={this.taskDescHandler}
                            />
                            <TextField
                                id="date"
                                fullWidth
                                defaultValue={this.state.taskDeadline}
                                label="Task Deadline"
                                type="date"
                                onChange = {(ev) => this.taskDeadlineHandler(ev, ev.currentTarget.value)}
                            />
                            <Button variant="contained" fullWidth color="primary" onClick={this.saveNewTaskHander} className={classes.button}>
                                Save
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        token:state.tokenID,
        NewtaskStatus: state.NewtaskStatus,
        userID:state.userID
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        newTaskHeaderHandler: (ev) => dispatch({ type:actionTypes.newTaskHeaderHandler, value:ev}),
        newTaskDescHandler: (ev) => dispatch({ type:actionTypes.newTaskDescHandler, value:ev}),
        loadStatusHandler: () => dispatch({ type:actionTypes.loadModeOn}),
        addNewTask: (description, header,token,userID,taskDeadline) => dispatch(actionList.addTaskToFirebase(description, header,token,userID,taskDeadline))
    }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Input)));