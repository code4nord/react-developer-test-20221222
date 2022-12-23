import { TableBody, Table, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const TableLayout = ({ classes, updateState, data, errMsg, sortByDate }) => {
  const { fetchedData, isLoading } = data;
  return (
    <div className={classes.responsiveTable}>
      <Table className={classes.root}>
        <TableHead>
          <TableRow>
            <TableCell onClick={() => sortByDate()}><Typography className={classes.tableHeader}>Date</Typography></TableCell>
            <TableCell><Typography className={classes.tableHeader}>User ID</Typography></TableCell>
            <TableCell><Typography className={classes.tableHeader}>Old Value</Typography></TableCell>
            <TableCell><Typography className={classes.tableHeader}>New Value</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchedData && fetchedData.data.map(row => {
            const date = new Date(row.timestamp);
            return (
              <TableRow key={row.id}>
                <TableCell>
                  {date.toLocaleDateString("sv")}
                </TableCell>
                <TableCell>
                  {row.id}
                </TableCell>
                <TableCell>
                  {row.diff[0].oldValue}
                </TableCell>
                <TableCell>
                  {row.diff[0].newValue}
                </TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell colSpan={'4'} style={{ "textAlign": "center" }}>
              {!isLoading ? (!errMsg ? <Button variant="contained" color="primary" onClick={() => {
                updateState(true);
              }} >
                Load More
              </Button> :
                <>
                  <Typography className={classes.error}>{errMsg}</Typography>
                  <Button variant="contained" color="primary" onClick={() => {
                    updateState(true);
                  }} >
                    Retry
                  </Button>
                </>) :
                <CircularProgress />
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table >
    </div>
  )
}

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: "0px 1px 4px 1px rgba(0, 0, 0, 0.3)",
    marginTop: '40px',
    borderRadius: '4px'
  },
  error: {
    color: 'red',
    marginBottom: '16px',
  },
  tableHeader: {
    fontWeight: '600'
  },
  responsiveTable: {
    overflowX: 'auto',
    padding: "10px",
    margin: "10px"
  }
});

export default withStyles(styles)(TableLayout);;