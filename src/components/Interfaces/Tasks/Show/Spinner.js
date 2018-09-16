import React from 'react';
import '../../../../assets/My.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});

const Spinner = (props) => {
    const { classes } = props;
    return (
        < div className="spinnerCover">
            <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={7} />
        </div>
    );
}

Spinner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Spinner);