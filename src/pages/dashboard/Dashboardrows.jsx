//import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./dashboard.scss";
import React, { useEffect, useState } from "react";
import send from "../../util/message-emitter";

const columns = [
  { id: 'guest_id', label: 'Folio_Invitado'},
  { id: 'user_id', label: 'Folio_Usuario'},

  { id: 'start_date', label: 'Check-In'},
  { id: 'full_name', label: 'Nombre'},
  {
    id: 'end_date',
    label: 'Check-out',
  },
  {
    id: 'ts_created',
    label: 'Comienzo TS',
  },
  {
    id: 'ts_updated',
    label: 'Fin TS',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'total_price',
    label: 'Precio_Total',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'form_of_booking',
    label: 'Forma de Reserva',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'company_name',
    label: 'Nombre_Compañía',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'number_of_adults',
    label: 'Num_adultos',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'number_of_children',
    label: 'Num_niños',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'payment_date',
    label: 'Fecha_pago',
    format: (value) => value.toFixed(2),
  },

];

/*
function createData(guestid, userid, checkin, checkout, tscreated, tsupdated, preciototal, formofbooking, nombredecompania, numadultos, numninios, paymentdate) {
  return {guestid, userid, checkin, checkout, tscreated, tsupdated, preciototal, formofbooking, nombredecompania, numadultos, numninios, paymentdate};
}

const rows = [
  createData('1', '21/10/2022','25/10/2022', 'Marco','Towers','@towers', '614--', 'Sencillo', '2', '2200'),
  createData('2', '22/10/2022','26/10/2022', 'Victor','Patreon','@patreon','614--', 'Sencillo', '2', '2200'),
  createData('3', '23/10/2022','27/10/2022', 'Eduardo','Almencho','@almencho', '614--', 'Sencillo', '2', '2200'),
  createData('4', '24/10/2022','28/10/2022', 'Javier','Chocha','@chocha', '614--', 'Sencillo', '2', '2200'),
];*/

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [Rows, setRows] = useState([]);
  const getAllReservations = async () => {
    let all = await send({ action: "GET_ALL" }, "reservation");
    console.log(all);
    for (let key in all) {
      let reservation = all[key];
      //console.log("etesech",reservation);
      let guest = await send({ action: "GET_BY_ID", guest_id: reservation["guest_id"] }, "guest");
      reservation.full_name = guest.full_name;
      }
      setRows(all);
  };
  
  useEffect(() => {
    getAllReservations();
  }, []);

  
  return (
    <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow sx={{"& th": {color: "rgba(255, 255, 255)",backgroundColor: "purple", fontFamily:"OpenSansBold"}}}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{backgroundColor:'white'}} >
            {Rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.guestid}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{backgroundColor:'whitesmoke'}}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage= {"Filas por columna"}
        component="div"
        count={Rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
