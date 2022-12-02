import "./dashboard.scss";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";


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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResId, setSelectedResId] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteReservation = async () => {
    const reservationId = selectedResId;
    try {
      await axiosInstance.delete(`/reservations/${reservationId}`);
      alert('La reservacion se elimino con exito.');
      setIsModalOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar la reservacion.');
    }
  }

  const handleOpenModal = (id) => {
    setSelectedResId(id);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  //coments
  const [Rows, setRows] = useState([]);

  const getAllReservations = async () => {
    let all = await axiosInstance.get("/reservations");
    
    let dataRows =  all.data.map((res) => {
      res.payment_date = new Date(res.payment_date).toLocaleDateString('en-US');
      res.start_date = new Date(res.start_date).toLocaleDateString('en-US');
      res.end_date = new Date(res.end_date).toLocaleDateString('en-US');
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
    <>
      <Paper sx={{ maxWidth: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={{
                  "& th": {
                    color: "#F5F5F5",
                    backgroundColor: "#CA5D26",
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
                          <>
                            <Link to={`/editReservation/${row._id}`}>
                              <IconButton variant="contained" size="small"><EditIcon /></IconButton>
                            </Link>
                            <IconButton onClick={() => handleOpenModal(row._id)} variant="contained" size="small" color="error"><DeleteIcon /></IconButton>
                          </>
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
      <Dialog onClose={handleCloseModal} open={isModalOpen}>
        <DialogTitle>Eliminar Reservacion</DialogTitle>
        <Grid container direction="column">
          <span>¿Seguro que quieres eliminar la reservacion?</span>
          <span style={{ color: 'red' }}>Esta operacion es permanente, por lo que la información se perderá.</span>

          <Grid display="flex" justifyContent="space-evenly" >
            <Button variant="contained" onClick={handleCloseModal}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={handleDeleteReservation}>Eliminar</Button>
          </Grid>
        </Grid>
      </Dialog>
    </>
  );
}
