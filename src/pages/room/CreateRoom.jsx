import { useRef, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import send from '../../util/message-emitter';
import './createRoom.scss';

const CreateRoom = () => {
  const roomNumRef = useRef();
  const bedAmountRef = useRef();
  const bedTypeRef = useRef();
  const priceRef = useRef();
  const jacuzziRef = useRef();

  const handleSubmit = async () => {
    const room = [
      roomNumRef.current.value,
      bedAmountRef.current.value,
      priceRef.current.value,
      jacuzziRef.current.checked,
    ];
    console.table([...room]);

    let res = await send({ action: 'CREATE', room }, 'room');

    if (!res) alert('No se pudo crear la habitación...');
    else clearInputs();
  };

  const clearInputs = () => {
    roomNumRef.current.value = '';
    bedAmountRef.current.value = '';
    priceRef.current.value = '';
    jacuzziRef.current.checked = false;

    alert('La habitación fue creada con éxito.');
  };

  return (
    <div className="createRoom">
      <Sidebar />
      <div className="createRoomContainer">
        <h1 className="title">Crear Habitación</h1>

        <label className="label" htmlFor="roomNum">
          Numero de Habitación
        </label>
        <input ref={roomNumRef} type="number" name="roomNum" id="roomNum" />

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
          Crear Habitación
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
