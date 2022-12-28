import React from "react";
import { State } from "../store/actions";
import LoadingSpin from "react-loading-spin";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { CSSProperties } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

type Props = {
  fetchData: () => void
  state: State,
  sortData: () => void,
  sort: Boolean
};

const errorStyle: CSSProperties = {
  color: "red",
  fontWeight: "bold",
  fontSize: 16,
  verticalAlign: "5%"
};

const tableStyle: CSSProperties = {
  tableLayout: 'fixed',
  marginBottom: '48px',
  boxShadow: '0px 0px 2px 1px rgba(0,0,0,0.2)'
};

const iconStyle: CSSProperties = {
  width: '16px',
  height: '16px',
  verticalAlign: 'middle'
}

export const TableData = ({ fetchData, state, sort, sortData }: Props) => {
  const { loading, errResp, data } = state;
  const arrow = (sort) ? <ArrowUpwardIcon style={iconStyle} /> : <ArrowDownwardIcon style={iconStyle} />
  return (
    <Table style={tableStyle}>
      <TableHead>
        <TableRow>
          <TableCell scope="col" onClick={sortData}>Date {arrow}</TableCell>
          <TableCell scope="col">UserID</TableCell>
          <TableCell scope="col">Old Value</TableCell>
          <TableCell scope="col">New Value</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.length > 0 && data.map((key, index) => {
          const date = new Date(data[index].timestamp);
          return (
            <TableRow key={index}>
              <TableCell>
                {date.toLocaleDateString("sv")}
              </TableCell>
              <TableCell>
                {data[index].id}
              </TableCell>
              <TableCell>
                {data[index].diff[0].newValue}
              </TableCell>
              <TableCell>
                {data[index].diff[0].newValue}
              </TableCell>
            </TableRow>
          )
        })}
        <TableRow>
          <TableCell colSpan={4} className='table-button'>
            {!loading ? (!errResp.errMsg ? <Button variant="contained" onClick={fetchData}>Load More</Button> : <div>
              <div style={errorStyle}>We had problems fetching your data. Please try again.</div>
              <Button variant="contained" onClick={fetchData}>Retry</Button>
            </div>) : <LoadingSpin />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default TableData;