import React from 'react';
import '../../../../assets/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

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
        props.onGoBack();
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