import { useRef, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './createRoom.scss';

const CreateRoom = () => {
  const roomNumRef = useRef();
  const bedAmountRef = useRef();
  const bedTypeRef = useRef();
  const priceRef = useRef();
  const jacuzziRef = useRef();

  const handleSubmit = () => {
    // TODO: Handle Room creation in database
    console.table([
      roomNumRef.current.value,
      bedAmountRef.current.value,
      bedTypeRef.current.value,
      priceRef.current.value,
      jacuzziRef.current.checked,
    ]);
  };

  return (
    <div className="createRoom">
      <Sidebar />
      <div className="createRoomContainer">
        <h1 className="title">Crear Habitacion</h1>

        <label className="label" htmlFor="roomNum">
          Numero de Habitacion
        </label>
        <input ref={roomNumRef} type="number" name="roomNum" id="roomNum" />

        <label className="label" htmlFor="bedAmount">
          Cantidad de Camas
        </label>
        <input
          ref={bedAmountRef}
          type="number"
          name="bedAmount"
          id="bedAmount"
        />

        <label className="label" htmlFor="bedType">
          Tipo de Camas
        </label>
        <select name="bedType" id="bedType" ref={bedTypeRef}>
          <option value="individual">Individual</option>
          <option value="matrimonial">Matrimonial</option>
          <option value="queen">Queen</option>
          <option value="king">King</option>
        </select>

        <div className="masked-input-container">
          <label className="label" htmlFor="price">
            Precio
          </label>
          <span className="input-prefix">$</span>
          <input ref={priceRef} type="number" name="price" id="price" />
        </div>

        <input ref={jacuzziRef} type="checkbox" name="jacuzzi" id="jacuzzi" />
        <label htmlFor="jacuzzi">Tiene Jacuzzi</label>

        <button className="submit-button" onClick={handleSubmit}>
          Crear Habitacion
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
