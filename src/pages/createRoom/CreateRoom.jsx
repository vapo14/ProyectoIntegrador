import { useRef, useState } from "react";
import { MenuItem, Select } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import BackIcon from "@mui/icons-material/KeyboardBackspace";
import Navbar from "../../components/navbar/Navbar";
import axiosInstance from "../../api/axiosInstance";
import "./createRoom.scss";
import { Link } from "react-router-dom";
import { hover } from "@testing-library/user-event/dist/hover";

const CreateRoom = () => {
  const [status, setStatus] = useState("Seleccione una opcion");
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
      await axiosInstance.post("/rooms", room);
      clearInputs();
    } catch (err) {
      alert("No se pudo crear la habitacion...");
      console.error(err);
    }
  };

  const clearInputs = () => {
    roomNumRef.current.value = "";
    bedAmountRef.current.value = "";
    priceRef.current.value = "";
    jacuzziRef.current.checked = false;
    setStatus("Seleccione una opcion");

    alert("La habitación fue creada con éxito.");
  };

  return (
    <div className="createRoom">
      <Sidebar />
      <div className="createRoomContainer">
        <Navbar />
        <div className="bottom">
          <div className="form">
            <form>
            <h1>Crear Cuarto</h1>
              <div className="formInput">
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
              </div>

              <div className="formInput">
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
              </div>

              <div className="formInput">
                <label>Estatus</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                  class="form-select"
                >
                  <option value="Ocupada">Ocupada</option>
                  <option value="Reservada">Reservada</option>
                  <option value="Disponible (limpia)">
                    Disponible {"("}limpia{")"}
                  </option>
                  <option value="Disponible (sucia)">
                    Disponible {"("}sucia{")"}
                  </option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>

              <div className="formInput">
                <label className="label" htmlFor="price">
                  Precio
                </label>
                <input
                  ref={priceRef}
                  type="number"
                  placeholder="5000"
                  name="price"
                  id="price"
                />
              </div>
              <div className="formInput">
                <label htmlFor="jacuzzi">
                  Tiene Jacuzzi?{" "}
                  <input
                    ref={jacuzziRef}
                    type="checkbox"
                    name="jacuzzi"
                    id="jacuzzi"
                    style={{ marginRight: "100px" }}
                  />
                </label>
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Crear Habitación
              </button>
              <Link className="linkHover" to="/rooms" style={{color: "#2F313E",
        textDecoration: 'none', fontFamily:"OpenSansBold", marginLeft:"40px", fontSize: "1.2rem", marginBottom: "20px"}}>Regresar</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
