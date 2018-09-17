import React from 'react';
import '../../../../assets/bootstrap.min.css';
import Input from './Input';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    menu: {
        width: 200,
    },
});

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
    const { classes } = props;

    return (
        props.status ? 
            <Input taskHeaderHandler={(ev) => taskHeaderHandler(ev)} taskDescHandler={(ev) => taskDescHandler(ev)} onAddTask={props.onSaveNewTask}  />
        : 
            <div className="FieldGroup">
                <h1>No Tasks has been found. You can add new one now.</h1>
                <Button variant="contained" fullWidth color="secondary" onClick={newTask} className={classes.button}>
                    Add New Task
                </Button>
            </div>
    )
}

DefaultUI.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultUI);