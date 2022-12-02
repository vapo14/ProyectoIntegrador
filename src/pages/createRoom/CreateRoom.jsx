import { useRef, useState } from 'react';
import { MenuItem, Select } from '@mui/material';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axiosInstance from '../../api/axiosInstance';
import './createRoom.scss';
import { Link } from 'react-router-dom';

const CreateRoom = () => {
  const [status, setStatus] = useState('Seleccione una opcion');
  const roomNumRef = useRef();
  const bedAmountRef = useRef();
  const priceRef = useRef();
  const jacuzziRef = useRef();

  const handleSubmit = async () => {
    const room = {
      room_number: roomNumRef.current.value,
      beds_type: bedAmountRef.current.value,
      current_price: priceRef.current.value,
      jacuzzi: jacuzziRef.current.checked,
      status: status,
    };

    try {
      await axiosInstance.post('/rooms', room);
      clearInputs();
    } catch (err) {
      alert('No se pudo crear la habitacion...');
      console.error(err);
    }
  };

  const clearInputs = () => {
    roomNumRef.current.value = '';
    bedAmountRef.current.value = '';
    priceRef.current.value = '';
    jacuzziRef.current.checked = false;
    setStatus('Seleccione una opcion');

    alert('La habitación fue creada con éxito.');
  };

  return (
    <div className="createRoom">
      <Sidebar />
      <div className="createRoomContainer">
        <Navbar />

        <label className="label" htmlFor="roomNum">
          Numero de Habitación
        </label>
        <input
          ref={roomNumRef}
          type="number"
          placeholder="1234"
          name="roomNum"
          id="roomNum"
        />

        <label className="label" htmlFor="bedAmount">
          Cantidad y Tipo de Camas
        </label>
        <input
          ref={bedAmountRef}
          type="text"
          placeholder="Ej: 2M (2 matrimoniales)"
          name="bedAmount"
          id="bedAmount"
        />

        <label className="label" htmlFor="status">
          Estatus
        </label>
        <Select
          sx={{ minWidth: '6em' }}
          id="status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          value={status}
        >
          <MenuItem value={'Ocupada'}>Ocupada</MenuItem>
          <MenuItem value={'Reservada'}>Reservada</MenuItem>
          <MenuItem value={'Disponible (limpia)'}>
            Disponible {'('}limpia{')'}
          </MenuItem>
          <MenuItem value={'Disponible (sucia)'}>
            Disponible {'('}sucia{')'}
          </MenuItem>
          <MenuItem value={'Mantenimiento'}>Mantenimiento</MenuItem>
        </Select>

        <div className="masked-input-container">
          <label className="label" htmlFor="price">
            Precio
          </label>
          <span className="input-prefix">$</span>
          <input
            ref={priceRef}
            type="number"
            placeholder="5000"
            name="price"
            id="price"
          />
        </div>

        <input ref={jacuzziRef} type="checkbox" name="jacuzzi" id="jacuzzi" />
        <label htmlFor="jacuzzi">Tiene Jacuzzi</label>

        <button className="submit-button" onClick={handleSubmit}>
          Crear Habitación
        </button>

        <Link to="/rooms">Regresar</Link>
      </div>
    </div>
  );
};

export default CreateRoom;
