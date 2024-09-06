import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
  { id: 'assetName', label: 'Asset Name', minWidth: 50 },
  { id: 'site', label: 'Site', minWidth: 50 },
  { id: 'assetId', label: 'Asset ID', minWidth: 50 },
  { id: 'serialNumber', label: 'Serial Number', minWidth: 60 },
  { id: 'modal', label: 'Modal', minWidth: 60 },
  { id: 'tagNumber', label: 'Tag Number', minWidth: 60 },
  { id: 'date', label: 'Date', minWidth: 110 },
  { id: 'rfid', label: 'RFID', minWidth: 60 },
  { id: 'purchasePrice', label: 'Purchase Price', minWidth: 60 },
  { id: 'purchaseDate', label: 'Purchase Date', minWidth: 100 },
  { id: 'purchaseInvoice', label: 'Purchase Invoice', minWidth: 60 },
  { id: 'expectedLife', label: 'Expected Life', minWidth: 60 },
  { id: 'supplier', label: 'Supplier', minWidth: 60 },
  { id: 'manufacturer', label: 'Manufacturer', minWidth: 60 },
  { id: 'assetStatus', label: 'Asset Status', minWidth: 60 },
  { id: 'costCenter', label: 'Cost Center', minWidth: 60 },
  { id: 'parentAsset', label: 'Parent Asset', minWidth: 60 },
  { id: 'dateRemoved', label: 'Date Removed', minWidth: 110 },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based, so we add 1
  const year = date.getFullYear();

  return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
};

const AssetDetails = () => {
  const [assets, setAssets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/assetDetails");
        setAssets(response.data);
        console.log(response.data); // Ensure data is logged correctly
      } catch (error) {
        console.error("Error fetching the asset details", error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center', marginTop: 15, fontSize: 30, fontWeight: 'bolder',color:'#2158b8' }}>Asset Details</h1>
      <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 5, marginLeft: 0, marginRight: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center" // Align center for headers
                    style={{ minWidth: column.minWidth,background:'#2158b8',color:'white', fontWeight: 'bold', fontSize: '12px' }} // Adjust font size here
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {assets
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((asset) => (
                  <TableRow hover key={asset.assetId}>
                    {columns.map((column) => {
                      const value = ['purchaseDate', 'date', 'dateRemoved'].includes(column.id) ? formatDate(asset[column.id]) : asset[column.id];
                      return (
                        <TableCell key={column.id} align="center" style={{ fontSize: '12px' }}> {/* Adjust font size here */}
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={assets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AssetDetails;
