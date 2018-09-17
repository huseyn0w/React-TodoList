import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
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


class Input extends Component {
    
    state= {
        submitted:false,
        taskHeader:null,
        taskDescription:null,
        errorMessage:null,
    }

    taskHeaderHandler = (ev) => {
        this.setState({taskHeader: ev.target.value});
    }

    taskDescHandler = (ev) => {
        this.setState({taskDescription: ev.target.value});
    }

    saveNewTaskHander = (ev) => {
        ev.preventDefault();
        //If Validation Succcess
        let taskHeader = this.state.taskHeader;
        let taskDescription = this.state.taskDescription;
        if (taskHeader === null || taskHeader.length === 0){
            this.setState({errorMessage: <h3 className="loginFail">Task header field is empty!</h3>});
            return false;
        }
        else if (taskDescription === null || taskDescription.length === 0){
            this.setState({errorMessage: <h3 className="loginFail">Task description field is empty!</h3>});
            return false;
        }
        else{
            this.setState({submitted:true});
            this.props.loadStatusHandler();
            this.props.addNewTask(this.state.taskDescription, this.state.taskHeader,this.props.token,this.props.userID);
        }
        
    }


    render(){

        const { classes } = this.props;

        console.log(this.props);
        
        let redirect = this.state.submitted ? <Redirect to="/tasklist" /> : null;
        return (
            <div>
                {redirect}
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
        tasks:state.tasks,
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
        addNewTask: (description, header,token,userID) => dispatch(actionList.addTaskToFirebase(description, header,token,userID))
    }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Input));