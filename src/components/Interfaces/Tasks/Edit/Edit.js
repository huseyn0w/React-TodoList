import React, { Component } from 'react';
import EditInterface from './Input';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as actionTypes from '../../../../actions/actionTypes';
import * as actionsList from '../../../../actions/actions';
import Spinner from '../../../Interfaces/Tasks/Show/Spinner';
import NotFound from '../../404';

class Edit extends Component {

    state = {
        edit: false,
        currentTaskID: "",
        currentTaskHeader: "",
        currentTaskDesc: "",
        currentTaskDeadline: "",
        currentTaskStatus: false,
        savebuttonDisabled:true,
        loading: true
    }

    componentWillReceiveProps(){
        this.setState({loading:false});
    }


    componentDidMount() {
        let taskID = this.props.match.params.id,
            token = this.props.token,
            userID = this.props.userID;
        this.props.oneTask(token, userID, taskID);
    }

    mainStateHandler = (obj, taskID) => {
        this.setState({
            currentTaskID: taskID,
            currentTaskHeader: obj.taskHeader,
            currentTaskDesc: obj.taskDescription,
            currentTaskDeadline: obj.taskDeadline,
            currentTaskStatus: obj.taskStatus
        })
    }


    taskHeaderHandler = (ev) => {
        this.setState({ currentTaskHeader: ev.target.value, savebuttonDisabled: false});
    }

    taskDescHandler = (ev) => {
        this.setState({ currentTaskDesc: ev.target.value, savebuttonDisabled: false});
    }
    
    taskDeadlineHandler = (value) => {
        this.setState({ currentTaskDeadline: value, savebuttonDisabled: false});
    }


    taskStatusHandler = () => {
        this.setState({ currentTaskStatus: !this.state.currentTaskStatus, savebuttonDisabled: false});
    }

    saveVal = () => {
        let taskID = this.state.currentTaskID;
        let newTaskHeader = this.state.currentTaskHeader;
        let newTaskDesc = this.state.currentTaskDesc;
        let deadline = this.state.currentTaskDeadline;
        let taskStatus = this.state.currentTaskStatus;
        let token = this.props.token;
        let userID = this.props.userID;
        this.props.saveTask(taskID, newTaskHeader, newTaskDesc, token, userID, deadline, taskStatus);
        this.props.history.goBack();
    }



    render(){
        
        let taskObj = null;
        let loadStatus = this.state.loading
        taskObj = this.props.currentTaskObj;
        let history = this.props.history;
        let taskID = this.props.match.params.id;

        return(
            <div>
                {loadStatus === true ? 
                    <Spinner />
                    :
                    loadStatus === false && Object.keys(taskObj).length > 0 ?
                    <EditInterface
                        onSaveButtonEnable={this.SaveButtonEnable}
                        onmainStateChangeHandler={(obj, taskID) => this.mainStateHandler(obj, taskID)}
                        savebuttonDisabledValue={this.state.savebuttonDisabled}
                        history={history}
                        taskID={taskID}
                        onHeaderChange={(ev) => this.taskHeaderHandler(ev)}
                        onDescChange={(ev) => this.taskDescHandler(ev)}
                        onDeadlineChange={(ev) => this.taskDeadlineHandler(ev)}
                        onStatusChange={this.taskStatusHandler}
                        onSave={this.saveVal}
                        taskObj={taskObj}
                        taskStatus={this.state.currentTaskStatus}
                    />
                    : 
                    <NotFound />
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
        currentInputValue: state.currentInputValue,
        currentTaskObj: state.currentTaskObj
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        oneTask: (token, userID, taskID) => dispatch(actionsList.oneTask(token, userID, taskID)),
        saveTask: (id, header, description, token, userID, deadline, taskStatus) => dispatch(actionsList.updateIngridientsBase(id, header, description, token, userID, deadline, taskStatus)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Edit));