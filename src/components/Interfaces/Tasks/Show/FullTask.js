import React, {Component} from 'react';
import {connect} from 'react-redux';
import NotFound from '../../404';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class ShowFullTask extends Component {
    render(){
        const { classes } = this.props;
        let taskObj;
        let taskID = this.props.match.params.id;
        taskObj = this.props.tasks[taskID];
        let goBack = () => {
            return this.props.history.goBack();
        }
        return (
            <div>
                {taskObj ? 
                    <div className="FieldGroup">
                        <h2>{taskObj.taskHeader}</h2>
                        <p>{taskObj.taskDescription}</p>
                        <p>Deadline: <strong>{taskObj.taskDeadline}</strong></p>
                        <div>
                            <Button onClick={() => goBack()} fullWidth variant="contained" color="primary" className={classes.button}>
                                Go Back
                            </Button>
                            <NavLink to="/newTask" className="navigateButtons">
                                <Button variant="contained" fullWidth color="secondary" className={classes.button}>
                                    Add New Task
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                :
                <NotFound />
                }
            </div>
        );
    }
}


let matStateToProps = (state) =>{
    return {
        tasks:state.tasks
    }
}

ShowFullTask.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default connect(matStateToProps)(withStyles(styles)(ShowFullTask));