import React from 'react';
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


const goBack = (props) => {


  const { classes } = props;

  return (
    <div className="navigateButtons">
        <NavLink to="/">
            <Button variant="contained" color="secondary" className={classes.button}>
                Go Back
            </Button>
        </NavLink>
        <NavLink to="/newTask" ala="sdadasd">
            <Button variant="contained" color="primary"  className={classes.button}>
                Add New Task
            </Button>
        </NavLink>
    </div>
  );
}

goBack.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(goBack);