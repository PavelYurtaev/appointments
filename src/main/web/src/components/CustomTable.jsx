import React from 'react';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import FileDownload from '@material-ui/icons/FileDownload';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePaginationActions from './TablePaginationActions';
import AppointmentModal from "./AppointmentModal";


const actionsStyles = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
    },
});


const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);


let counter = 0;
function createData(name, calories, fat) {
    counter += 1;
    return { id: counter, name, calories, fat };
}

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

class CustomPaginationActionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                createData('Cupcake', 305, 3.7),
                createData('Donut', 452, 25.0),
                createData('Eclair', 262, 16.0),
                createData('Frozen yoghurt', 159, 6.0),
                createData('Gingerbread', 356, 16.0),
                // createData('Honeycomb', 408, 3.2),
                // createData('Ice cream sandwich', 237, 9.0),
                // createData('Jelly Bean', 375, 0.0),
                // createData('KitKat', 518, 26.0),
                // createData('Lollipop', 392, 0.2),
                // createData('Marshmallow', 318, 0),
                // createData('Nougat', 360, 19.0),
                // createData('Oreo', 437, 18.0),
            ].sort((a, b) => (a.calories < b.calories ? -1 : 1)),
            page: 0,
            rowsPerPage: 5,
        };
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };




    render() {
        const { classes } = this.props;
        const { data, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        const CustomTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);
        // fetch()

        return (
            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <div>
                        <Button variant="fab" color="primary" aria-label="add" className={classes.button}>
                            <AddIcon />
                        </Button>
                        <Button variant="contained" color="default" className={classes.button}>
                            CSV
                            <FileDownload  />
                        </Button>
                    </div>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>Dessert (100g serving)</CustomTableCell>
                                <CustomTableCell numeric>Calories</CustomTableCell>
                                <CustomTableCell numeric>Fat (g)</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                return (
                                    <div>
                                        <TableRow key={n.id} >
                                            <TableCell component="th" scope="row">{n.name}</TableCell>
                                            <TableCell numeric>{n.calories}</TableCell>
                                            <TableCell numeric>{n.fat}</TableCell>
                                        </TableRow> <AppointmentModal />
                                    </div>
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
                                    count={data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActionsWrapped}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);