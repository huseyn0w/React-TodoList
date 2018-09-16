import React from 'react';
import '../../../../assets/bootstrap.min.css';
import Input from './Input';

const DefaultUI = (props) => {
    let newTask = () => {
        props.onAdd();
    }
    let taskHeaderHandler = (ev) => {
        props.onTaskHeader(ev);
    }
    let taskDescHandler = (ev) => {
        props.onTaskDesc(ev);
    }
    return (
        props.status ? 
            <Input taskHeaderHandler={(ev) => taskHeaderHandler(ev)} taskDescHandler={(ev) => taskDescHandler(ev)} onAddTask={props.onSaveNewTask}  />
        : 
            <div className="FieldGroup">
                <h1>No Tasks has been found. You can add new one now.</h1>
                <button type="button" className="btn btn-success newTask" onClick={newTask}>Add New Task</button>
            </div>
    )
}

export default DefaultUI;