import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListContent from './ListContent.json';


export default function BasicTable() {
  return (
    <div className='listt'>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow className=' bg-gray-400'>
            <TableCell>Date </TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right">Action</TableCell>
            <TableCell align="right">Item</TableCell>
            <TableCell align="right">Target</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ListContent.map((row,id) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.admin}</TableCell>
              <TableCell align="right">{row.action}</TableCell>
              <TableCell align="right">{row.item}</TableCell>
              <TableCell align="right">{row.target}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
