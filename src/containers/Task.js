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
        currentTaskDesc:""
    }



    editMode = (id, header, desc) => {
        let currObj = {
            ...this.state,
            currentTaskID: id,
            currentTaskHeader: header,
            currentTaskDesc: desc
        };
        this.setState({
            edit:!this.state.edit,
            currentTaskID: currObj.currentTaskID,
            currentTaskHeader: currObj.currentTaskHeader,
            currentTaskDesc: currObj.currentTaskDesc
        });
    }

    taskHeaderHandler = (ev) => {
        this.setState({ currentTaskHeader: ev.target.value});
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
        this.props.loadTrigger();
        this.props.saveTask(taskID, newTaskHeader, newTaskDesc, token, userID);
        this.setState({edit:false})
    }


    deleteMode(taskID){
        this.props.onDelete(taskID);
    }

    

    render(){

        const taskObj = this.props.tasks;
        let taskHistory = this.props.history;
        let taskRemove = this.taskRemoveHandler;
        let taskEdit = (id, header, description) => this.editMode(id, header, description);
            
        return (
            <div className="TaskInterface">
                {this.state.edit ? 
                    <div>
                        <EditTask
                            onHeaderChange={(ev) => this.taskHeaderHandler(ev)}
                            onDescChange={(ev) => this.taskDescHandler(ev)}
                            onSave={this.saveVal}
                            prevHeaderValue={this.state.currentTaskHeader}
                            prevDescValue={this.state.currentTaskDesc}
                            taskID={this.state.currentTaskID}
                        />
                    </div>
                    :
                    <div>
                        <h2 className="taskListHeader">Tasklist:</h2>
                        {Object.keys(taskObj).map(function (key) {
                            let taskName = taskObj[key].taskHeader;
                            let taskDesc2 = taskObj[key].taskDescription;
                            return (
                                <div key={key}>
                                    <TaskItem
                                        key={key}
                                        taskHistory={taskHistory}
                                        taskName={taskName}
                                        taskDesc={taskDesc2}
                                        onEditStart={(key, taskName, taskDesc2) => taskEdit(key, taskName, taskDesc2)}
                                        onRemove={(id) => taskRemove(id)}
                                        onSave={(taskID, taskHeader, taskDescription) => this.props.saveTask(taskID, taskHeader, taskDescription)}
                                        taskNumber={key}
                                        onDelete={(key) => this.props.onRemoveTask(key)}
                                    />
                                </div>
                            )
                        })}
                        <GoBack />
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
        editTask:(id,text) => dispatch({type:actionTypes.edit}),
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        onRemoveTask: (id,token) => dispatch(actionsList.deleteTaskFromBase(id,token)),
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        newTaskHandler: (ev) => dispatch({ type: actionTypes.newTaskHandler, text: ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask}),
        saveTask: (id, header, description, token, userID) => dispatch(actionsList.updateIngridientsBase(id, header, description, token, userID)),
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));