import React, {Component} from 'react';
import HasTasks from './Task';
import {connect} from 'react-redux';
import NoTasks from '../components/Interfaces/Tasks/Add/DefaultUI';
import * as actionsList from '../actions/actions';
import Spinner from '../components/Interfaces/Tasks/Show/Spinner';
import * as actionTypes from '../actions/actionTypes';
import Snackbar from '@material-ui/core/Snackbar';



class Tasks extends Component{

    state = {
        editMode:true,
        snackbar:false,
        open: false,
        vertical: 'bottom',
        horizontal: 'left',
        message:"Done"
    }


    taskHeaderHandler = (header) => {
        this.props.newTaskHeaderHandler(header);
    }

    taskDescHandler = (description) => {
        this.props.newTaskDescHandler(description);
    }

    componentDidMount() {
        this.props.taskListLOAD(this.props.token, this.props.userID);
    }

    handleClick = state => () => {
        this.setState({ open: true, ...state });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    componentWillReceiveProps() {
        const message = this.props.history.location.workType;
        if(message === "Editing"){
            this.setState({ editMode:false, open: true, snackbar:true, message: "Task edited successfully"})
        }
        else if(message === "Deleting"){
            this.setState({ editMode:false, open: true, snackbar:true, message: "Task deleted successfully"})
        }
        else if(message === "Adding"){
            this.setState({ editMode:false, open: true, snackbar:true, message: "Task added successfully"})
        }
        else{
            this.setState({editMode:false});
        }
        this.handleClick({ vertical: 'bottom', horizontal: 'left' });
    }



    
    render(){
        const { vertical, horizontal, open } = this.state;

        const taskListObjectSize = Object.keys(this.props.tasks).length;

        let message = this.state.message;

        return(
                
            <div className="taskListCover">
                {this.state.editMode ?
                        <Spinner />
                    :
                this.props.loaded ? 
                    taskListObjectSize > 0 ?
                    <div>
                        <HasTasks />
                        {
                            this.state.snackbar ?
                            <Snackbar
                                anchorOrigin={{ vertical, horizontal }}
                                open={open}
                                onClose={this.handleClose}
                                ContentProps={{
                                    'aria-describedby': 'message-id',
                                }}
                                message={<span id="message-id">{message}</span>}
                            />
                            :
                            null
                        }
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
        logout: () => dispatch(actionsList.logout()),
        taskListLOAD: (token, userID) => dispatch(actionsList.initTasks(token, userID)),
        newTaskStatusUpdate: () => dispatch({ type:actionTypes.newTaskStatusUpdate}),
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        newTaskHeaderHandler: (ev) => dispatch({ type:actionTypes.newTaskHeaderHandler, value:ev}),
        newTaskDescHandler: (ev) => dispatch({ type:actionTypes.newTaskDescHandler, value:ev}),
        addNewTask: () => dispatch({ type: actionTypes.addNewTask})
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Tasks);