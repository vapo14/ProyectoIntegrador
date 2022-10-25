import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "./dashboard.scss";


const columns = [
  { id: 'folio', label: 'Folio'},
  { id: 'checkin', label: 'Check-In'},
  {
    id: 'checkout',
    label: 'Check-out',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'nombre',
    label: 'Nombre',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'apellido',
    label: 'Apellido',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'correo',
    label: 'Correo',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'telefono',
    label: 'Telefono',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'tipodecuarto',
    label: 'Tipo de Cuarto',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cantcuartos',
    label: 'Cantidad de Cuartos',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'monto',
    label: 'Monto',
    format: (value) => value.toFixed(2),
  },
];

function createData(folio, checkin, checkout, nombre, apellido, correo, telefono, tipodecuarto, cantcuartos, monto) {
  //const density = checkout / size;
  return { folio, checkin, checkout, nombre, apellido, correo, telefono, tipodecuarto, cantcuartos, monto};
}

const rows = [
  createData('1', '21/10/2022','25/10/2022', 'Marco','Towers','@towers', '614--', 'Sencillo', '2', '2200'),
  createData('2', '22/10/2022','26/10/2022', 'Victor','Patreon','@patreon','614--', 'Sencillo', '2', '2200'),
  createData('3', '23/10/2022','27/10/2022', 'Eduardo','Almencho','@almencho', '614--', 'Sencillo', '2', '2200'),
  createData('4', '24/10/2022','28/10/2022', 'Javier','Chocha','@chocha', '614--', 'Sencillo', '2', '2200'),
  createData('1', '21/10/2022','25/10/2022', 'Marco','Towers','@towers', '614--', 'Sencillo', '2', '2200'),
  createData('2', '22/10/2022','26/10/2022', 'Victor','Patreon','@patreon','614--', 'Sencillo', '2', '2200'),
  createData('3', '23/10/2022','27/10/2022', 'Eduardo','Almencho','@almencho', '614--', 'Sencillo', '2', '2200'),
  createData('4', '24/10/2022','28/10/2022', 'Javier','Chocha','@chocha', '614--', 'Sencillo', '2', '2200'),
  createData('1', '21/10/2022','25/10/2022', 'Marco','Towers','@towers', '614--', 'Sencillo', '2', '2200'),
  createData('2', '22/10/2022','26/10/2022', 'Victor','Patreon','@patreon','614--', 'Sencillo', '2', '2200'),
  createData('3', '23/10/2022','27/10/2022', 'Eduardo','Almencho','@almencho', '614--', 'Sencillo', '2', '2200'),
  createData('4', '24/10/2022','28/10/2022', 'Javier','Chocha','@chocha', '614--', 'Sencillo', '2', '2200'),
  createData('1', '21/10/2022','25/10/2022', 'Marco','Towers','@towers', '614--', 'Sencillo', '2', '2200'),
  createData('2', '22/10/2022','26/10/2022', 'Victor','Patreon','@patreon','614--', 'Sencillo', '2', '2200'),
  createData('3', '23/10/2022','27/10/2022', 'Eduardo','Almencho','@almencho', '614--', 'Sencillo', '2', '2200'),
  createData('4', '24/10/2022','28/10/2022', 'Javier','Chocha','@chocha', '614--', 'Sencillo', '2', '2200'),


];

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

  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.checkin}>
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
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
