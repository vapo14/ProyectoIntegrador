//import * as React from 'react';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import "./dashboard.scss";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";


const columns = [
  { id: "user_id", label: "Folio_Usuario" },
  { id: "guest_name", label: "Nombre" },
  { id: "start_date", label: "Check-In" },
  {
    id: "end_date",
    label: "Check-out",
  },
  {
    id: "total_price",
    label: "Precio_Total",
    format: (value) => value.toFixed(2),
  },
  {
    id: "form_of_booking",
    label: "Forma de Reserva",
    format: (value) => value.toFixed(2),
  },
  {
    id: "company_name",
    label: "Nombre_Compañía",
    format: (value) => value.toFixed(2),
  },
  {
    id: "number_of_adults",
    label: "Num_adultos",
    format: (value) => value.toFixed(2),
  },
  {
    id: "number_of_children",
    label: "Num_niños",
    format: (value) => value.toFixed(2),
  },
  {
    id: "payment_date",
    label: "Fecha_pago",
    format: (value) => value.toFixed(2),
  },

  {
    id: "origin",
    label: "Origen",
    format: (value) => value.toFixed(2),
  },

  {
    id: "room_number",
    label: "Habitaciones",
    format: (value) => value.toFixed(2),
  },

  {
    id: "options",
    label: "Opciones",
  },
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

  //coments
  const [Rows, setRows] = useState([]);

  const getAllReservations = async () => {
    let all = await axiosInstance.get("/reservations");

    
    let dataRows =  all.data.map((res) => {
      let date_format = new Date().toLocaleDateString('en-US');
      res.payment_date = date_format;
      res.start_date = date_format;
      res.end_date = date_format;
      res.room_number = res.rooms.map((room) => room.room_number).join(",");
      return res;
    })
    setRows(
      dataRows
    );
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  //coments
  return (
    <Paper sx={{ maxWidth: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "rgba(255, 255, 255)",
                  backgroundColor: "purple",
                  fontFamily: "OpenSansBold",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ backgroundColor: "white" }}>
            {Rows.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            ).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.guestid}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "options") {
                      return (
                        <Link to={`/editReservation/${row._id}`}>
                          <Button variant="contained">Edit</Button>
                        </Link>
                      );
                    } else {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number" ? (
                            column.format(value)
                          ) : (
                            <span>{value}</span>
                          )}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        style={{ backgroundColor: "whitesmoke" }}
        rowsPerPageOptions={[5, 10, 15]}
        labelRowsPerPage={"Filas por columna"}
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
