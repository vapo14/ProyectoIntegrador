import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import './rooms.scss';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  const compare = (a, b) => {
    if (a.room_number < b.room_number) {
      return -1;
    }
    if (a.room_number > b.room_number) {
      return 1;
    }
    return 0;
  };

  const fetchRooms = async () => {
    const response = await axiosInstance.get('/rooms');

    const roomsData = response.data;

    roomsData.sort(compare);
    setRooms(roomsData);
  };

  const statusToColorMap = {
    Ocupada: 'hsl(0, 100%, 75%)',
    Reservada: 'hsl(60, 100%, 75%)',
    'Disponible (limpia)': 'hsl(120, 100%, 45%)',
    'Disponible (sucia)': 'hsl(27, 40%, 40%)',
    Mantenimiento: 'hsl(240, 100%, 75%)',
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="rooms">
      <Sidebar />
      <div className="roomsContainer">
        <h1>Habitaciones Registradas</h1>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Numero</TableCell>
                <TableCell>Tipo y Numero de Camas</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Jacuzzi</TableCell>
                <TableCell>Estatus</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room, idx) => (
                <TableRow key={idx}>
                  <TableCell>{room.room_number}</TableCell>
                  <TableCell>{room.beds_type}</TableCell>
                  <TableCell>{room.current_price}</TableCell>
                  <TableCell>{room.jacuzzi ? 'Si' : 'No'}</TableCell>
                  <TableCell
                    style={{ backgroundColor: statusToColorMap[room.status] }}
                  >
                    {room.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to="/createRoom">Crear Habitacion</Link>
      </div>
    </div>
  );
};

export default Rooms;
