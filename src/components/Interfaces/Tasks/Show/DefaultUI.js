import React, {Component} from 'react';
import '../../../../assets/My.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SendIcon from '@material-ui/icons/Send';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';




const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

const options = [
    'Show',
    'Edit',
    'Delete'
];

const ITEM_HEIGHT = 48;

class DefaultUI extends Component {

    state = {
        anchorEl: null,
        selectedIndex: 1,
    };

    handleClickListItem = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (ev, index) => {
        this.setState({
            selectedIndex: index,
            anchorEl: null
        });
        let chooseType = ev.nativeEvent.target.textContent;
        let taskID = ev.nativeEvent.target.attributes.taskid.value;
        let taskName = ev.nativeEvent.target.attributes.taskname.value;
        let taskDesc = ev.nativeEvent.target.attributes.taskdesc.value;
        let taskURL = ev.nativeEvent.target.attributes.taskurl.value;

        switch (chooseType) {
            case 'Show':
                this.props.taskHistory.push(taskURL);
                break;
            case 'Edit':
                this.props.onEditStart(taskID,taskName,taskDesc);
                break;
            case 'Delete':
                this.props.onRemove(taskID);
                break;
            default:
                break;
        }
    };

    handleClose = (ev) => {
        this.setState({
            anchorEl: null
        });
    };

    render(){
        
        const { classes } = this.props;
        const { anchorEl } = this.state;

        let taskID = this.props.taskNumber;
        let taskUrl ="task-" + taskID;
        let taskName = this.props.taskName;
        let taskDesc = this.props.taskDesc;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={taskName}
                            secondary="Here will be a deadline"
                        />
                    </ListItem>
                    <Divider />
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '50vw',
                        maxWidth:'auto'
                        },
                    }}
                >
                {options.map((option, index) => (
                    <MenuItem
                    key={option}
                    onClick={event => this.handleMenuItemClick(event, index)}
                    taskurl={taskUrl} taskname={taskName} taskid={taskID} taskdesc={taskDesc}
                    >
                    {option}
                    </MenuItem>
                ))}
                </Menu>
            </div>
        );
    }
}


DefaultUI.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultUI);