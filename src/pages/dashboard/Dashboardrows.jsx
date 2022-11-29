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

const columns = [
  { id: "guest_id", label: "Folio_Invitado" },
  { id: "user_id", label: "Folio_Usuario" },

  { id: "start_date", label: "Check-In" },
  { id: "full_name", label: "Nombre" },
  {
    id: "end_date",
    label: "Check-out",
  },
  {
    id: "ts_created",
    label: "Comienzo TS",
  },
  {
    id: "ts_updated",
    label: "Fin TS",
    format: (value) => value.toFixed(2),
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

  /*
  function createData(guest_id, user_id, start_date, full_name, end_date, ts_created,ts_updated,total_price,form_of_booking,company_name,number_of_adults, number_of_children, payment_date,origin, room_number ) {

    return { guest_id, user_id, start_date, full_name, end_date, ts_created,ts_updated,total_price,form_of_booking,company_name,number_of_adults, number_of_children, payment_date,origin, room_number};
  }
  
  const rows = [
    createData('1', '1', "02-10-2022", "Sebas S", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "32"),
    createData('2', '2', "02-10-2022", "Victor P", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "10"),
    createData('3', '3', "02-10-2022", "Eduardo A", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "3"),
    createData('4', '4', "02-10-2022", "Cesar M", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "2"),
    createData('5', '5', "02-10-2022", "Javier Sosa", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "5"),
    createData('6', '6', "02-10-2022", "Sebas S", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "36"),
    createData('7', '7', "02-10-2022", "Victor P", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "52"),
    createData('8', '8', "02-10-2022", "Eduardo A", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "6"),
    createData('9', '9', "02-10-2022", "Cesar M", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "22"),
    createData('10', '10', "02-10-2022", "Javier Sosa", "02-10-2022", "02-10-2022", "02-10-2022", 4000, "Booking", "Company Name", "3", "3","02-10-2022","Mexico", "32"),
  ];
  */

  //coments
  const [Rows, setRows] = useState([]);

  const getAllReservations = async () => {
    let all = await axiosInstance.get("/reservations");
    console.log(all);
    setRows(
      all.data.map((res) => {
        res.room_number = res.rooms.map((room) => room.room_number).join(",");
        return res;
      })
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
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? (
                          column.format(value)
                        ) : (
                          <span>{value}</span>
                        )}
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
