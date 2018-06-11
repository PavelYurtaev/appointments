import React from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PaginationComponent from './PaginationComponent';
import AppointmentModal from "./AppointmentModal";
import {
    cancelAppointment,
    confirmAppointment,
    deleteAppointment,
    downloadCSV,
    getAllCompanies,
    getAppointment,
    getAppointments,
    saveAppointment,
    saveNote
} from '../actions/ApiRequestActions';
import {changePage, fillAppointments, setRowsOnPage} from "../actions/AppointmentActions";

const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(PaginationComponent);


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});

class CustomTable extends React.Component {

    componentDidMount() {
        this.props.onGetAppointments();
    }

    render() {
        const { appointments, rowsOnPage, currentPage, classes} = this.props;

        const emptyRows = rowsOnPage - Math.min(rowsOnPage, currentPage * rowsOnPage); // вернуть ResponseEntity

        const CustomTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Info</CustomTableCell>
                                <CustomTableCell>Date</CustomTableCell>
                                <CustomTableCell>Company</CustomTableCell>
                                <CustomTableCell>Contact person</CustomTableCell>
                                <CustomTableCell>Status</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {appointments.slice(currentPage * rowsOnPage, currentPage * rowsOnPage + rowsOnPage).map(app => {
                                return (
                                        // TODO
                                        <TableRow key={app.id} >
                                            <TableCell style={{width: 30}}><AppointmentModal /></TableCell>
                                            <TableCell >{app.date}</TableCell>
                                            <TableCell component="th" scope="row">{app.name / app.url}</TableCell>
                                            <TableCell numeric>{app.status}</TableCell> {/*{contact person}//*/}
                                            <TableCell numeric>{app.status}</TableCell>
                                        </TableRow>

                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    colSpan={3}
                                    count={appointments.length}
                                    rowsPerPage={rowsOnPage}
                                    page={currentPage}
                                    onChangePage={(event, page) => this.props.handleChangePage(event, page)}
                                    onChangeRowsPerPage={(event) => this.props.handleChangeRowsPerPage(event.target.value)}
                                    ActionsComponent={TablePaginationActionsWrapped}/>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
     return {
        appointments: state.appointments,
         currentPage: state.currentPage,
         rowsOnPage: state.rowsOnPage
     }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetAppointments: () => {
            getAppointments().then((response) => {
                    dispatch(fillAppointments(response.content));
            }).catch(error => {
                alert('Error ' + error.message);
            });
        },

        handleChangePage: (event, page) => dispatch(changePage(event, page)),

        handleChangeRowsPerPage: (number) => dispatch(setRowsOnPage(number)),
    }
};

const WrappedCustomTable = withStyles(styles)(CustomTable);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedCustomTable);