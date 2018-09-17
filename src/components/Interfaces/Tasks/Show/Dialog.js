import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slideshow from '@material-ui/icons/Slideshow';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';


const actions = ['Show', 'Edit', 'Delete'];

const styles = {
  avatar: {
    color: '#000',
    backgroundColor:'transparent'
  },
};

class SimpleDialog extends React.Component {

  handleClose = () => {
    this.props.onClose(this.props.selectedValue);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  iconSetup = value => {
    switch (value) {
      case 'Show':
        return <Slideshow />;
      case 'Edit':
        return <Edit />;
      case 'Delete':
        return <Delete />;
      default:
        break;
    }

  }

  render() {
    const { classes, onClose, selectedValue, ...other } = this.props;

    return (
      <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
        <DialogTitle id="simple-dialog-title">Choose an action</DialogTitle>
        <div>
          <List>
            {actions.map(action => (
              <ListItem button onClick={() => this.handleListItemClick(action)} key={action}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                  {this.iconSetup(action)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={action} />
              </ListItem>
            ))}
          </List>
        </div>
      </Dialog>
    );
  }
}

SimpleDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedValue: PropTypes.string,
};

export default withStyles(styles)(SimpleDialog);