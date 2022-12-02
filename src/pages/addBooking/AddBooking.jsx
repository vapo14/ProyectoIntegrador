import Sidebar from "../../components/sidebar/Sidebar";
import "./addBooking.scss";
import TextField from '@mui/material/TextField';
import axiosInstance from "../../api/axiosInstance";
import React, { useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Navbar from "../../components/navbar/Navbar";
import useAuth from '../../hooks/useAuth';

const AddBooking = () => {
    const { UserData } = useAuth();
    //reservation_Table has
    const [rooms, setRooms] = useState("");

    const [guestname, setGuestName] = useState("");
    const [origin, setOrigin] = useState("");

    const [startdate, setStartdate] = React.useState(dayjs());
    const [enddate, setEnddate] = React.useState(dayjs());
    const [totalprice, setTotalprice] = useState("");
    const [formofbooking, setFormofbooking] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [numberofadults, setNumberofadults] = useState("");
    const [numberofchildren, setNumberofchildren] = useState("");
    const [paymentdate, setPaymentdate] = React.useState(dayjs());

    const handleChange = (newValue) => {
        setStartdate(newValue);
    };

    const handleChange2 = (newValue) => {
        setEnddate(newValue);
    };

    const handleChange5 = (newValue) => {
        setPaymentdate(newValue);
    };



    const createReservation = async (e) => {
        let rooms_array = rooms.split(',');
        let room_numbers = rooms_array.map((roomStr) => parseInt(roomStr));

        const reservation = {
            user_id: UserData.userId,
            guest_name: guestname,
            origin: origin,
            start_date: startdate,
            end_date: enddate,
            total_price: totalprice,
            form_of_booking: formofbooking,
            company_name: companyname,
            number_of_adults: numberofadults,
            number_of_children: numberofchildren,
            payment_date: paymentdate,
        };

        const reservation_data = {
            room_numbers,
            reservation
        }

        if (UserData.userId === "" || guestname === "" || origin === "" ||
            startdate === "" || enddate === "" || totalprice === "" ||
            formofbooking === "" || companyname === "" || numberofadults === "" ||
            numberofchildren === "" || paymentdate === "" || room_numbers === "") {
            alert('No se llenaron los campos correctamente, reservacion no creada');
        } else {
            try {
                await axiosInstance.post("/reservations/create", reservation_data);
                alert('Reservacion creada con exito');
            } catch (err) {
                alert('No se pudo actualizar la reservacion');
                console.error(err);
            }
        }

    };



    const createCompleteReservation = async (e) => {
        createReservation();
    }

    return (
        <div className="reservation">
            <Sidebar />
            <div className="reservationContainer">
                <Navbar />
                <div className="bottom">
                    <div className="form">
                        <form>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <h1>Crear Reservación</h1>
                                <div className="formInput">
                                    <label>Nombre completo</label>
                                    <input
                                    type="text"
                                    value={guestname}
                                    onChange={(e) => { setGuestName(e.target.value) }}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Numero de Cuarto</label>
                                    <input
                                    type="number"
                                    min="12"
                                    value={rooms}
                                    onChange={(e) => { setRooms(e.target.value) }}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Origen</label>
                                    <input
                                    type="text"
                                    value={origin}
                                    onChange={(e) => { setOrigin(e.target.value) }}
                                    />
                                </div>
                                <div className="datePicker">
                                    <DesktopDatePicker
                                        inputFormat="DD-MM-YYYY"
                                        className="whiteColor"
                                        sx={{ background: "purple" }}
                                        id="start_date"
                                        label="Check-In"
                                        type="check-in"
                                        onChange={handleChange}
                                        value={startdate}
                                        renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                                    />
                                </div>
                                <div className="datePicker">
                                    <DesktopDatePicker
                                        inputFormat="DD-MM-YYYY"
                                        className="whiteColor"
                                        sx={{ background: "purple" }}
                                        id="end_date"
                                        label="Check-out"
                                        type="Check-out"
                                        onChange={handleChange2}
                                        value={enddate}
                                        renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                                    />
                                </div>
                                <div className="datePicker">
                                    <DesktopDatePicker
                                        inputFormat="DD-MM-YYYY"
                                        className="whiteColor"
                                        sx={{ background: "purple" }}
                                        id="payment_date"
                                        label="Fecha de Pago"
                                        type="fecha_pago"
                                        onChange={handleChange5}
                                        value={paymentdate}
                                        renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                                    />
                                </div>
                                <div className="formInput">
                                <label>Forma de Reserva</label>
                                    <select
                                    value={formofbooking}
                                    onChange={(e) => { setFormofbooking(e.target.value) }}
                                    class="form-select"
                                    >
                                    <option value="Online">Online</option>
                                    <option value="Directamente">Directamente</option>
                                    <option value="Agencia de Viajes">Agencia de Viajes</option>
                                    <option value="Telefono">Telefono</option>
                                    <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Nombre de Compañía</label>
                                    <input
                                    type="text"
                                    value={companyname}
                                    onChange={(e) => { setCompanyname(e.target.value) }}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Precio Total</label>
                                    <input
                                    type="number"
                                    value={totalprice}
                                    onChange={(e) => { setTotalprice(e.target.value) }}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Numero de niños</label>
                                    <input
                                    type="number"
                                    value={numberofchildren}
                                    onChange={(e) => { setNumberofchildren(e.target.value) }}
                                    />
                                </div>
                                <div className="formInput">
                                    <label>Numero de adultos</label>
                                    <input
                                    type="number"
                                    value={numberofadults}
                                    onChange={(e) => { setNumberofadults(e.target.value) }}
                                    />
                                </div>

                                <button class="submitButton"onClick={createCompleteReservation} type="button">
                                    Crear Reservación
                                </button>

                            </LocalizationProvider>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AddBooking;