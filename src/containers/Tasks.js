import React, {Component} from 'react';
import HasTasks from './Task';
import {connect} from 'react-redux';
import NoTasks from '../components/Interfaces/Tasks/Add/DefaultUI';
import * as actionsList from '../actions/actions';
import Spinner from '../components/Interfaces/Tasks/Show/Spinner';
import * as actionTypes from '../actions/actionTypes';

class Tasks extends Component{


    taskHeaderHandler = (header) => {
        this.props.newTaskHeaderHandler(header);
    }

    taskDescHandler = (description) => {
        this.props.newTaskDescHandler(description);
    }

    componentDidMount() {
        this.props.taskListLOAD(this.props.token, this.props.userID);
    }
    
    render(){
        const taskListObjectSize = Object.keys(this.props.tasks).length;
        return(
            <div className="TasksCover">
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
        taskListLOAD: (token, userID) => dispatch(actionsList.initTasks(token, userID)),
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        newTaskHeaderHandler: (ev) => dispatch({ type:actionTypes.newTaskHeaderHandler, value:ev}),
        newTaskDescHandler: (ev) => dispatch({ type:actionTypes.newTaskDescHandler, value:ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks);