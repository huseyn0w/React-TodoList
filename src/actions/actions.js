import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';

export const loadTaskList = (initialObjectState) => {
    return {
        type: actionTypes.taskListLOAD,
        finalObj: initialObjectState
    };
};


export const initTasks = (token, userID) => {
    return dispatch => {
        let queryString = 'https://todolist-56a62.firebaseio.com/tasks/tasks.json?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
        axios.get(queryString)
        .then(function (response) {
            let finalObj = {
                ...response.data
            }
            dispatch(loadTaskList(finalObj));
        });
    };
};

export const updateTaskState = (updatedObject, taskNumber) => {
    return {
        type: actionTypes.saveTask,
        id: taskNumber,
        description: updatedObject[taskNumber].taskDescription,
        header: updatedObject[taskNumber].taskHeader,
        taskDeadline: updatedObject[taskNumber].taskDeadline,
        taskStatus: updatedObject[taskNumber].taskStatus
    };
};

export const updateIngridientsBase = (taskNumber, header, description, token, userID, taskDeadline, taskStatus) => {
    return dispatch => {
        axios.patch('https://todolist-56a62.firebaseio.com/tasks/tasks.json?auth=' + token,
        { 
         [taskNumber]: {
             taskDescription: description,
             taskHeader: header,
             userID: userID,
             taskDeadline: taskDeadline,
             taskStatus: taskStatus
         }
        })
        .then(function (response) {
            dispatch(updateTaskState(response.data, taskNumber));
        })
        .catch(function (error) {
            console.log('problem' + error);
        })
    };
}


export const removeTask = (taskID) => {
    return {
        type: actionTypes.removeTask,
        id: taskID
    };
};

export const deleteTaskFromBase = (taskNumber, token) => {
    return dispatch => {
        axios.delete('https://todolist-56a62.firebaseio.com/tasks/tasks/' + taskNumber + '.json?auth=' + token)
         .then(function (response) {
             dispatch(removeTask(taskNumber));
         })
        .catch(function (error) {
            console.log('problem' + error);
        })
    };
}

export const addTaskToRedux = (description, header, taskCode, taskDeadline) => {
    return {
        type: actionTypes.addNewTask,
        description: description,
        header:header,
        taskCode:taskCode,
        taskDeadline:taskDeadline,
        taskStatus:false
    };
};

export const addTaskToFirebase = (description, header, token, userID, taskDeadline) => {
    return dispatch => {
        axios.post('https://todolist-56a62.firebaseio.com/tasks/tasks.json?auth=' + token,
            {
                taskDescription:description,
                taskHeader:header,
                userID:userID,
                taskDeadline:taskDeadline,
                taskStatus:false
            }
        )
        .then(function (response) {
            dispatch(addTaskToRedux(description, header, response.data.name, taskDeadline));
        })
        .catch(function (error) {
            console.log('problem' + error);
        })
    };
}

export const authSuccess = (token) => {
    let userID = localStorage.getItem('localID');
    return {
        type: actionTypes.loginSuccess,
        token: token,
        userID: userID
    };
};

export const authFail = () => {
    return {
        type: actionTypes.loginFail
    };
};

export const loginAction = (email, password) => {
    return dispatch => {
        let authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJe28Q2yToVSOtylDVxYgoPcZ6WnQRkfc', authData)
            .then(function (response) {
                let expiresIn = Number(new Date().getTime() + Number(response.data.expiresIn) * 1000 );
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('localID', response.data.localId);
                localStorage.setItem('expiresIn', expiresIn);
                localStorage.setItem('idToken', response.data.idToken);
                dispatch(authSuccess(response.data.idToken));
            })
            .catch(function (error) {
                dispatch(authFail());
            });
    }
};

export const logout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('idToken');
    localStorage.removeItem('localID');
    return {
        type: actionTypes.logout
    };
};


export const tokenTimeCheck = () => {
    return dispatch => {
        let currTime = new Date();
        let expTime = new Date(Number(localStorage.getItem('expiresIn')));
        if(expTime){
            if(currTime > expTime){
                dispatch(logout());
            }
            else{
                let idToken = localStorage.getItem('idToken');
                dispatch(authSuccess(idToken));
            }
        }
    };
};

export const userSignUp = (email,password) => {
    return dispatch => {
        let authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJe28Q2yToVSOtylDVxYgoPcZ6WnQRkfc', authData)
            .then(function (response) {
                let expiresIn = Number(new Date().getTime() + Number(response.data.expiresIn) * 1000 );
                localStorage.setItem('email', response.data.email);
                localStorage.setItem('expiresIn', expiresIn);
                localStorage.setItem('localID', response.data.localId);
                localStorage.setItem('idToken', response.data.idToken);
                dispatch(authSuccess(response.data.idToken));
            })
            .catch(function (error) {
                dispatch(authFail());
            });
    };
};

