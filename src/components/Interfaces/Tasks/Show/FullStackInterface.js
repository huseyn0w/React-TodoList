import React from 'react';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


const FullStackInterface = (props) => {
    const { classes } = props;
    return (
        <div className="FieldGroup">
            <h2>{props.header}</h2>
            <p>{props.description}</p>
            <p>Deadline: <strong>{props.deadline}</strong></p>
            <p>Status: <strong>{props.status}</strong></p>
            <div>
                <Button onClick={props.ongoback} fullWidth variant="contained" color="primary" className={classes.button}>
                    Go Back
                </Button>
                <NavLink to="/newTask" className="navigateButtons">
                    <Button variant="contained" fullWidth color="secondary" className={classes.button}>
                        Add New Task
                    </Button>
                </NavLink>
            </div>
        </div>
    );
}

FullStackInterface.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullStackInterface);