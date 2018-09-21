import React, {Component} from 'react';
import {connect} from 'react-redux';
import NotFound from '../../404';
import FullTaskInterface from './FullStackInterface';
import * as actionTypes from '../../../../actions/actionTypes';
import * as actionsList from '../../../../actions/actions';
import Spinner from '../../../Interfaces/Tasks/Show/Spinner';



class ShowFullTask extends Component {

    state = {
        currentTaskObj: '',
        loading:true
    }

    componentWillReceiveProps(){
        this.setState({loading:false});
    }

    componentDidMount(){

        let taskID = this.props.match.params.id,
            token = this.props.token,
            userID = this.props.userID;
        this.props.oneTask(token, userID, taskID);

    }

    goBack = () => {
        this.props.history.goBack();
    }

    render(){
        let taskObj = null;
        let loadStatus = this.state.loading;
        taskObj = this.props.currentTaskObj;
        return (
            <div>
                {loadStatus === true ?
                    <Spinner /> 
                :
                loadStatus === false && Object.keys(taskObj).length > 0 ?
                <FullTaskInterface 
                    header={taskObj.taskHeader}
                    description={taskObj.taskDescription}
                    deadline={taskObj.taskDeadline}
                    status={taskObj.taskStatus ? 'Done' : 'Pending'}
                    ongoback={this.goBack}
                />
                :
                    <NotFound />
                }
            </div>
        );
    }
}


let matStateToProps = (state) =>{
    return {
        userID: state.userID,
        token: state.tokenID,
        currentTaskObj:state.currentTaskObj
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        loadTrigger:() => dispatch({type:actionTypes.loadModeOn}),
        oneTask: (token, userID, taskID) => dispatch(actionsList.oneTask(token, userID, taskID)),
    }
}



export default connect(matStateToProps, mapDispatchToProps)(ShowFullTask);