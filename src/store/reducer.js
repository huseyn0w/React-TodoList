import * as actionTypes from '../actions/actionTypes';


let initialState = {
    counter:0,
    taskName:null,
    isAuth:false,
    signupResult:null,
    tokenID:"",
    userID:null,
    tryLogin: "null",
    tasks: {},
    NewtaskStatus: false,
    currenTaskHeader: "",
    currenTaskDesc: "",
    loaded:false
}




const Tasks = (state = initialState, action) => {
   switch (action.type) {
       case actionTypes.removeTask:
           let copyTasks = {...state.tasks};
           delete copyTasks[action.id];
           return {
               ...state,
               tasks: copyTasks,
               loaded:true
           }
       case actionTypes.newTaskStatusUpdate:
           return {
               ...state,
               NewtaskStatus: !state.NewtaskStatus
           }
       case actionTypes.newTaskHandler:
            return {
                ...state,
                currentInputValue: action.text
            }
       case actionTypes.addNewTask:
            let actionCode = action.taskCode;
            return {
                ...state,
                tasks: {
                    ...state.tasks,
                    [actionCode]: {
                        taskHeader: action.header,
                        taskDescription: action.description,
                        taskDeadline: action.taskDeadline
                    },
                },
                NewtaskStatus:false,
                loaded:true
            }
       case actionTypes.loadModeOn:
           return {
               ...state,
               loaded:false
           }
       case actionTypes.saveTask:
           let taskObj = {...state.tasks};
           taskObj[action.id].taskHeader = action.header;
           taskObj[action.id].taskDescription = action.description;
           taskObj[action.id].taskDeadline = action.taskDeadline;
           return {
               ...state,
               tasks: taskObj,
               loaded:true
           }
        case actionTypes.newTaskHeaderHandler:
            let newArray = {
                ...state,
                currenTaskHeader:action.value
            };
            return {
                ...state,
                currenTaskHeader: newArray.currenTaskHeader
            };
        case actionTypes.newTaskDescHandler:
            let newArray2 = {
                ...state,
                currenTaskDesc: action.value
            };
            return {
                ...state,
                currenTaskDesc: newArray2.currenTaskDesc
            };
        case actionTypes.taskListLOAD:
            return {
                ...state,
                tasks:action.finalObj,
                loaded:true
            }
        case actionTypes.loginSuccess:
            return {
                ...state,
                tokenID:action.token,
                userID:action.userID,
                loaded:false,
                tryLogin: true,
                isAuth:true
            }
        case actionTypes.loginFail:
            return {
                ...state,
                tokenID: action.token,
                isAuth:false,
                tryLogin: false,
                signupResult: false
            }
        case actionTypes.logout:
            return {
                ...state,
                tokenID:null,
                isAuth: false,
                tasks: {},
                tryLogin: null
            }
       default:
           return state;
   }
}

export default Tasks;