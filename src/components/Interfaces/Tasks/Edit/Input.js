import React from 'react';
import '../../../../assets/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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


const Input = (props) => {
    
    const { classes } = props;

     let goBack = () => {
        props.onSave();
     }

    let formsaveHander = (ev) =>{
        ev.preventDefault();
        props.onSave();
    }
    return (
        <div className="Field">
            <div className="FieldGroup">
                <h2>Taks editing interface</h2>
                <form onSubmit={formsaveHander}>
                    <TextField
                        required
                        id = "taskHeader"
                        label = "Task Header"
                        fullWidth
                        margin = "normal"
                        onChange={props.onHeaderChange}
                        defaultValue={props.prevHeaderValue}
                    />
                    <TextField
                        required
                        id = "taskDescription"
                        label = "Task Description"
                        fullWidth
                        margin = "normal"
                        multiline={true}
                        rows={3}
                        rowsMax={10}
                        onChange={props.onDescChange}
                        defaultValue={props.prevDescValue}
                    />
                    <TextField
                        id="date"
                        fullWidth
                        defaultValue={props.prevDeadlineValue}
                        label="Task Deadline"
                        type="date"
                        onChange ={(ev) => {
                            props.onDeadlineChange(ev.currentTarget.value);
                        }}
                    />
                    <FormGroup row>
                        <FormControlLabel
                        control={
                            <Switch
                            checked={props.prevTaskStatus}
                            onChange={() => props.onStatusChange()}
                            value="taskStatus"
                            />
                        }
                        label={props.prevTaskStatus ? 'Task Status: Done' : 'Task Status: Pending'}
                        />
                    </FormGroup>
                    <Button variant="contained" fullWidth color="primary" onClick={formsaveHander} className={classes.button}>
                        Save Changes
                    </Button>
                    <Button variant="contained" fullWidth color="secondary" onClick={goBack} className={classes.button}>
                        Go back
                    </Button>
                </form>
            </div>
        </div>
    );
}

Input.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);