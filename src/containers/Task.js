import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import EditTask from '../components/Interfaces/Tasks/Edit/Input';
import {connect} from 'react-redux';
import TaskItem from '../components/Interfaces/Tasks/Show/DefaultUI';
import * as actionTypes from '../actions/actionTypes';
import '../assets/My.css';
import '../assets/bootstrap.min.css';
import GoBack from '../components/Interfaces/Navigation/goBack';
import * as actionsList from '../actions/actions';

class Task extends Component{

    state = {
        edit:false,
        currentTaskID:"",
        currentTaskHeader:"",
        currentTaskDesc:"",
        currentTaskDeadline:""
    }



    editMode = (id, header, desc, deadline) => {
        let currObj = {
            ...this.state,
            currentTaskID: id,
            currentTaskHeader: header,
            currentTaskDesc: desc,
            currentTaskDeadline: deadline
        };
        this.setState({
            edit:!this.state.edit,
            currentTaskID: currObj.currentTaskID,
            currentTaskHeader: currObj.currentTaskHeader,
            currentTaskDesc: currObj.currentTaskDesc,
            currentTaskDeadline: currObj.currentTaskDeadline,
        });
    }

    taskHeaderHandler = (ev) => {
        this.setState({ currentTaskHeader: ev.target.value});
    }

    taskDeadlineHAndler = (value) => {
        this.setState({ currentTaskDeadline: value});
    }

    taskDescHandler = (ev) => {
        this.setState({ currentTaskDesc: ev.target.value});
    }

    taskRemoveHandler = (key) =>{
        this.props.loadTrigger();
        this.props.onRemoveTask(key,this.props.token);
    }

    saveVal = () => {
        let taskID = this.state.currentTaskID;
        let newTaskHeader = this.state.currentTaskHeader;
        let newTaskDesc = this.state.currentTaskDesc;
        let token = this.props.token;
        let userID = this.props.userID;
        let deadline = this.state.currentTaskDeadline;
        this.props.loadTrigger();
        this.props.saveTask(taskID, newTaskHeader, newTaskDesc, token, userID, deadline);
        this.setState({edit:false})
    }

    goBacktoTheTaskList = () =>{
        this.props.loadTrigger();
        this.setState({edit:false});
    }


    deleteMode(taskID){
        this.props.onDelete(taskID);
    }

    

    render(){

        const taskObj = this.props.tasks;
        let taskHistory = this.props.history;
        let taskRemove = this.taskRemoveHandler;
        let taskEdit = (id, header, description, deadline) => this.editMode(id, header, description, deadline);
            
        return (
            <div className="TaskInterface">
                {this.state.edit ? 
                    <div>
                        <EditTask
                            onHeaderChange={(ev) => this.taskHeaderHandler(ev)}
                            onDescChange={(ev) => this.taskDescHandler(ev)}
                            onDeadlineChange={(ev) => this.taskDeadlineHAndler(ev)}
                            onSave={this.saveVal}
                            onGoBack={this.goBacktoTheTaskList}
                            prevHeaderValue={this.state.currentTaskHeader}
                            prevDescValue={this.state.currentTaskDesc}
                            prevDeadlineValue={this.state.currentTaskDeadline}
                            taskID={this.state.currentTaskID}
                        />
                    </div>
                    :
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
                                        onEditStart={() => {
                                            taskEdit(key, taskName, taskDesc2, taskDeadlinePeriod)
                                        }}
                                        onRemove={(id) => taskRemove(id)}
                                        onSave={(taskID, taskHeader, taskDescription, taskDeadlinePeriod) => this.props.saveTask(taskID, taskHeader, taskDescription, taskDeadlinePeriod)}
                                        taskNumber={key}
                                        onDelete={(key) => this.props.onRemoveTask(key)}
                                    />
                                </div>
                            )
                        })}
                        <GoBack history={taskHistory} />
                    </div>
                    
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
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        newTaskHandler: (ev) => dispatch({ type: actionTypes.newTaskHandler, text: ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask}),
        saveTask: (id, header, description, token, userID, deadline) => dispatch(actionsList.updateIngridientsBase(id, header, description, token, userID, deadline)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));