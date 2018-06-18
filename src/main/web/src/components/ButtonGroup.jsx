import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import {cancelAppointment, confirmAppointment, deleteAppointment} from "../actions/ApiRequestActions";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

class ButtonGroup extends React.Component {

    constructor(props) {
        super(props);
    }

    onConfirm = appointmentId => {
        confirmAppointment(appointmentId);
    };

    onCancel = appointmentId => {
        cancelAppointment(appointmentId);
    };

    onDelete = appointmentId => {
        deleteAppointment(appointmentId);
    };

    render() {
        const { classes, appointment } = this.props;
        return (
            <div>
                <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}>
                    <Icon>edit_icon</Icon>
                </Button>


                <Button variant="outlined" className={classes.button}
                        onClick={() => this.onConfirm(appointment.id)}>
                    Confirm
                </Button>
                <Button variant="outlined" color="primary" className={classes.button}
                        onClick={() => this.onCancel(appointment.id)}>
                    Cancel
                </Button>
                <Button variant="fab" aria-label="delete" className={classes.button}
                        onClick={() => this.onDelete(appointment.id)}>
                    <DeleteIcon/>
                </Button>
            </div>
        );
    };
}

ButtonGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonGroup);