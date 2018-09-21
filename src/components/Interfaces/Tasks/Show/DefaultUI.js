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
import Dialog from './Dialog';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});



class DefaultUI extends Component {

    state = {
        edit: false,
        open: false,
        taskid:'',
        taskheader:'',
        taskdesc:'',
        showTaskURL: '',
        editTaskURL: '',
    };


    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({
            selectedValue: value,
            open: false,
        });
    };


    handleClickListItem = event => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };

    handleMenuItemClick = (value) => {
        let chooseType = value;
        let taskID = this.state.taskid;
        let showTaskURL = this.state.showTaskURL;
        let editTaskURL = this.state.editTaskURL;

        switch (chooseType) {
            case 'Show':
                this.props.taskHistory.push(showTaskURL);
                break;
            case 'Edit':
                this.props.taskHistory.push(editTaskURL);
                //this.props.onEditStart(taskID,taskName,taskDesc);
                break;
            case 'Delete':
                this.props.onRemove(taskID);
                break;
            default:
                break;
        }
    };



    render(){
        
        const { classes } = this.props;

        let taskID = this.props.taskNumber;
        let showTaskURL ="show/" + taskID;
        let editTaskURL = "edit/" + taskID;
        let taskName = this.props.taskName;
        let taskDesc = this.props.taskDesc;
        let taskDeadline = this.props.taskDeadline;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        aria-label="When device is locked"
                        onClick={this.handleClickOpen}
                    >
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={taskName}
                            secondary={taskDeadline}
                        />
                    </ListItem>
                    <Divider />
                </List>
                <Dialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={(value) => {
                        this.setState({
                            edit:true,
                            taskid: taskID,
                            taskheader: taskName,
                            taskdesc: taskDesc,
                            showTaskURL: showTaskURL,
                            editTaskURL: editTaskURL,
                        }, () => {
                            this.handleClose(value);
                            this.handleMenuItemClick(value);
                        });
                    }}
                />
            </div>
        );
    }
}


DefaultUI.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DefaultUI);