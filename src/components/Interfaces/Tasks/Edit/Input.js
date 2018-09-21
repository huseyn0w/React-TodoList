import React, {Component} from 'react';
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


class Input extends Component {

    componentDidMount(){
        this.props.onmainStateChangeHandler(this.props.taskObj, this.props.taskID);
    }
    

    goBack = () => {
        this.props.history.goBack();
    }

    formsaveHander = (ev) =>{
        ev.preventDefault();
        this.props.onSave();
    }

    render(){
        const { classes } = this.props;
        return (
            <div className="Field">
                <div className="FieldGroup">
                    <h2>Taks editing interface</h2>
                    <form onSubmit={this.formsaveHander}>
                        <TextField
                            required
                            id = "taskHeader"
                            label = "Task Header"
                            fullWidth
                            margin = "normal"
                            onChange={this.props.onHeaderChange}
                            defaultValue={this.props.taskObj.taskHeader}
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
                            onChange={this.props.onDescChange}
                            defaultValue={this.props.taskObj.taskDescription}
                        />
                        <TextField
                            id="date"
                            fullWidth
                            defaultValue={this.props.taskObj.taskDeadline}
                            label="Task Deadline"
                            type="date"
                            onChange ={(ev) => {
                                this.props.onDeadlineChange(ev.currentTarget.value);
                            }}
                        />
                        <FormGroup row>
                            <FormControlLabel
                            control={
                                <Switch
                                checked={this.props.taskStatus}
                                onChange={() => this.props.onStatusChange()}
                                value="taskStatus"
                                />
                            }
                            label={this.props.taskStatus ? 'Task Status: Done' : 'Task Status: Pending'}
                            />
                        </FormGroup>
                        <Button variant="contained" disabled={this.props.savebuttonDisabledValue} fullWidth color="primary" onClick={this.formsaveHander} className={classes.button}>
                            Save Changes
                        </Button>
                        <Button variant="contained" fullWidth color="secondary" onClick={this.goBack} className={classes.button}>
                            Go back
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

Input.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);