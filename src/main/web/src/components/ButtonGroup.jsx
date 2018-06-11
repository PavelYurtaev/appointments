import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});

function FloatingActionButtons(props) {
    const { classes } = props;
    return (
        <div>
            <Button variant="fab" color="secondary" aria-label="edit" className={classes.button}>
                <Icon>edit_icon</Icon>
            </Button>
            <Button variant="outlined" className={classes.button}>
                Confirm
            </Button>
            <Button variant="outlined" color="primary" className={classes.button}>
                Cancel
            </Button>
            <Button variant="fab" disabled aria-label="delete" className={classes.button}>
                <DeleteIcon />
            </Button>
        </div>
    );
}

FloatingActionButtons.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);