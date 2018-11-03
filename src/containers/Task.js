import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import TaskItem from '../components/Interfaces/Tasks/Show/DefaultUI';
import * as actionTypes from '../actions/actionTypes';
import '../assets/My.css';
import '../assets/bootstrap.min.css';
import GoBack from '../components/Interfaces/Navigation/goBack';
import * as actionsList from '../actions/actions';


class Task extends Component{

    state = {
        modeType:'',
        open: false,
        vertical: 'top',
        horizontal: 'center',
        editMode:false,
        todos: Object.values(this.props.tasks),
        currentPage: 1,
        todosPerPage: 5
    }


    handleClick = (event) => {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }




    taskRemoveHandler = (key) => {
        this.props.loadTrigger();
        this.props.history.push({
            pathname: '/tasklist',
            workType: "Deleting"
        })
        this.props.onRemoveTask(key, this.props.token);
    }

    componentDidUpdate() {
        if (Object.keys(this.props.tasks).length !== Object.keys(this.state.todos).length){
            this.setState({
                todos: Object.values(this.props.tasks)
            })
        }
    }


    
    

    render() {


        const taskObj = this.props.tasks;

        const { todos, currentPage, todosPerPage } = this.state;

        let currentArray = [...todos];
        var objectKeys = Object.keys(taskObj);
        currentArray.map(function (array, index) {
            array.key = objectKeys[index];
            return array;
        })
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);



        let taskHistory = this.props.history;
        let taskRemove = this.taskRemoveHandler;

        const renderTodos = currentTodos.map((todo, index) => {
            let taskName = todo.taskHeader;
            let taskDesc2 = todo.taskDescription;
            let taskDeadlinePeriod = todo.taskDeadline;
            let taskKey = todo.key;
            return <div key={index}>
                <TaskItem
                    key={index}
                    taskHistory={taskHistory}
                    taskName={taskName}
                    taskDesc={taskDesc2}
                    taskDeadline={taskDeadlinePeriod}
                    onRemove={(taskKey) => taskRemove(taskKey)}
                    onSave={(taskID, taskHeader, taskDescription, taskDeadlinePeriod, taskStatus) => this.props.saveTask(taskID, taskHeader, taskDescription, taskDeadlinePeriod, taskStatus)}
                    taskNumber={taskKey}
                />
            </div>;
        });


        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
            pageNumbers.push(i);
        }


        const renderPageNumbers = pageNumbers.length > 1
            ?
            pageNumbers.map(number => {
                return (
                    <li
                        key={number}
                        id={number}
                        onClick={this.handleClick}
                        className={number === this.state.currentPage ? 'active' : 'page'}
                    >
                        {number}
                    </li>
                );
            })
            :
            null;



        return (
            <div className="TaskInterface">
                <h2 className="taskListHeader">Tasklist:</h2>
                {renderTodos}
                <ul id="page-numbers">
                    {renderPageNumbers}
                </ul>
                <GoBack history={taskHistory} />
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