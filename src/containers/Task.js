import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TaskItem from '../components/Interfaces/Tasks/Show/DefaultUI';
import * as actionTypes from '../actions/actionTypes';
import '../assets/My.css';
import '../assets/bootstrap.min.css';
import GoBack from '../components/Interfaces/Navigation/goBack';
import * as actionsList from '../actions/actions';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

class Task extends Component{

    state = {
        modeType:'',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        editMode:false
    }



    goBacktoTheTaskList = () =>{
        this.setState({modeType:'Edit'},() => {console.log('salam')})
    }

    taskRemoveHandler = (key) => {
        this.props.loadTrigger();
        this.props.onRemoveTask(key, this.props.token);
    }


    handleClick = state => () => {
        this.setState({ open: true, ...state });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    
    

    render(){

        const { vertical, horizontal, open } = this.state;
        const taskObj = this.props.tasks;
        let taskHistory = this.props.history;
        let taskRemove = this.taskRemoveHandler;
            
        return (
            <div className="TaskInterface">
                <div>
                    <h2 className="taskListHeader">Tasklist:</h2>
                    {Object.keys(taskObj).map(function (key) {
                        let taskName = taskObj[key].taskHeader;
                        let taskDesc2 = taskObj[key].taskDescription;
                        let taskDeadlinePeriod = taskObj[key].taskDeadline;
                        return (
                            <div key={key}>
                                <TaskItem
                                    key={key}
                                    taskHistory={taskHistory}
                                    taskName={taskName}
                                    taskDesc={taskDesc2}
                                    taskDeadline={taskDeadlinePeriod}
                                    onRemove={(id) => taskRemove(id)}
                                    onSave={(taskID, taskHeader, taskDescription, taskDeadlinePeriod, taskStatus) => this.props.saveTask(taskID, taskHeader, taskDescription, taskDeadlinePeriod, taskStatus)}
                                    taskNumber={key}
                                    onDelete={(key) => this.props.onRemoveTask(key)}
                                />
                            </div>
                        )
                    })}
                    <GoBack history={taskHistory} />
                </div>
                {this.state.modeType === "Edit" ? 
                    <div>
                        <Button onClick={this.handleClick({ vertical: 'bottom', horizontal: 'left' })}>
                            Bottom-Left
                        </Button> 
                        <Snackbar
                            anchorOrigin={{ vertical, horizontal }}
                            open={open}
                            onClose={this.handleClose}
                            ContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">I love snacks</span>}
                        />
                    </div>
                    :
                    null
                }
            </div>
        );
    }
} 

let mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        userID: state.userID,
        token: state.tokenID,
        NewtaskStatus: state.NewtaskStatus,
        currentInputValue: state.currentInputValue
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        onRemoveTask: (id,token) => dispatch(actionsList.deleteTaskFromBase(id,token)),
        newTaskHandler: (ev) => dispatch({ type: actionTypes.newTaskHandler, text: ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask}),
        saveTask: (id, header, description, token, userID, deadline, taskStatus) => dispatch(actionsList.updateIngridientsBase(id, header, description, token, userID, deadline, taskStatus)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));