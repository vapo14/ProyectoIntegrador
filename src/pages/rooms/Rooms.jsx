import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/navbar/Navbar';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
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
    Ocupada: 'linear-gradient(107.2deg, rgb(150, 15, 15) 10.6%, rgb(247, 0, 0) 91.1%)',
    Reservada: 'linear-gradient(109.6deg, rgb(255, 194, 48) 11.2%, rgb(255, 124, 0) 100.2%)',
    'Disponible (limpia)': 'linear-gradient(109.6deg, rgb(0, 204, 130) 11.2%, rgb(58, 181, 46) 91.7%)',
    'Disponible (sucia)': 'linear-gradient(to top, #c79081 0%, #dfa579 100%)',
    Mantenimiento: 'linear-gradient(111.5deg, rgb(20, 100, 196) 0.4%, rgb(33, 152, 214) 100.2%)',
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="rooms">
      <Sidebar />
      <div className="roomsContainer">
        <Navbar />
        <h1>Habitaciones Registradas</h1>
        <Button className='createButton' variant="contained" component={Link} to="/createRoom" style={{ color: '#F5F5F5', backgroundColor: '#CA5D26', borderColor: '#CA5D26' }} endIcon={<AddBoxIcon />}>
          Crear Habitacion
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{
                  "& th": {
                    color: "#F5F5F5",
                    backgroundColor: "#CA5D26",
                    fontFamily: "OpenSansBold",
                  },
                }}>
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
                    style={{ background: statusToColorMap[room.status], color: '#F5F5F5', fontFamily: "OpenSansBold"}}
                  >
                    {room.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Rooms;
