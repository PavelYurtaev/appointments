import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import ButtonGroup from './ButtonGroup';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { hideAppointmentModal, showAppointmentModal } from "../actions/AppointmentActions";
import { saveNote } from "../actions/ApiRequestActions";

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button onClick={this.props.onClickInfoButton} variant="outlined" color="primary" >Open</Button>
                <Modal
                    // aria-labelledby="simple-modal-title"
                    // aria-describedby="simple-modal-description"
                    open={this.props.modalVisible}
                    onClose={this.props.onCloseModal}>

                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography variant="title" id="modal-title">
                            Appointment info
                        </Typography>
                        <div>
                            <TextField
                                id="multiline-flexible"
                                label="Multiline"
                                multiline
                                rowsMax="4"
                                value="vLAUE"
                                onChange={() => 1} // TODO
                                margin="normal"
                            />
                            <Button onClick={note =>this.props.onSaveNote(note)} variant="outlined" color="primary">Save</Button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseModal: () => {
            dispatch(hideAppointmentModal());
        },

        onClickInfoButton: () => {
            dispatch(showAppointmentModal());
        },

        onSaveNote: (note) => {
            dispatch(saveNote(note))
        }

    }
};

const mapStateToProps = (state) => {
    return {
        modalVisible: state.modalVisible,
        currentPage: state.currentPage
    };
};

const SimpleModalWrapped = withStyles(styles)(SimpleModal);
export default connect(mapStateToProps, mapDispatchToProps)(SimpleModalWrapped);
