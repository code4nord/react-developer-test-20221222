import { TableBody, Table, TableCell, TableHead, TableRow, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

export const TableLayout = ({ classes, updateState, data, errMsg }) => {
  const { fetchedData, isLoading } = data;
  return (
    <Table className={classes.root}>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>User ID</TableCell>
          <TableCell>Old Value</TableCell>
          <TableCell>New Value</TableCell>
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
  )
}

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.2)",
    marginBottom: '40px',
  },
  table: {
    minWidth: 700,
  },
  error: {
    color: 'red',
    marginBottom: '16px',
  }
});

export default withStyles(styles)(TableLayout);;