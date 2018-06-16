import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from './ButtonGroup';
import TextField from '@material-ui/core/TextField';
import {saveNote} from "../actions/ApiRequestActions";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

class SimpleModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            note: ''
        }
    }

    getModalStyle = () => {
        return {
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
        };
    };

    onCloseModal = () => {
        this.setState({open: false})
    };

    onOpenModal = () => {
        this.setState({open: true})
    };


    onSaveNote = () => {
        let noteObj = {
            appointmentId: this.props.appointment.id,
            note: this.state.note,
        };
        return () => saveNote(noteObj);
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button onClick={this.onOpenModal} variant="outlined" color="primary" >Open</Button>
                <Modal open={this.state.open} onClose={this.onCloseModal}>

                    <div style={this.getModalStyle()} className={classes.paper}>
                        {/*TODO add full appointment info*/}
                        <Typography variant="title" id="modal-title">
                            Appointment info
                        </Typography>
                        <div>
                            <TextField
                                id="multiline-flexible"
                                label="Enter note"
                                multiline
                                rowsMax="4"
                                value={this.state.note}
                                onChange={event => this.setState({note : event.target.value})} // TODO
                                margin="normal"
                            />
                            <Button onClick={this.onSaveNote()} variant="outlined" color="primary">Save</Button>
                        </div>
                        <ButtonGroup />
                    </div>
                </Modal>
            </div>
        );
    }

}

SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleModal);
