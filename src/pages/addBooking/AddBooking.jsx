import Sidebar from "../../components/sidebar/Sidebar";
import "./addBooking.scss";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axiosInstance from "../../api/axiosInstance";
import React, { useState } from "react";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Navbar from "../../components/navbar/Navbar";


const AddBooking = () => {
    //reservation_Table has
    const [rooms, setRooms] = useState("");

    const [guestname, setGuestName] = useState("");
    const [origin, setOrigin] = useState("");

    const [startdate, setStartdate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY'));
    const [enddate, setEnddate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY'));
    const [totalprice, setTotalprice] = useState("");
    const [formofbooking, setFormofbooking] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [numberofadults, setNumberofadults] = useState("");
    const [numberofchildren, setNumberofchildren] = useState("");
    const [paymentdate, setPaymentdate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY'));


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
        console.log(rooms);
        let rooms_array = rooms.split(',');
        let room_numbers = rooms_array.map((roomStr) => parseInt(roomStr));

        const reservation = {
            user_id: "637a8e6630c3283b2a45751e",
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

        await axiosInstance.post("/reservations/create", reservation_data);
    };

    const createCompleteReservation = async (e) => {
        createReservation();
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Navbar />
                <div className="bottom">
                    <div className="form">
                        <form>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <div className="formInput">
                                    <label>Nombre Completo</label>
                                    <input onChange={(e) => { setGuestName(e.target.value) }} value={guestname} />
                                </div>

                                <div className="formInput">
                                    <label>Numero de Cuartos</label>
                                    <input onChange={(e) => { setRooms(e.target.value) }} value={rooms} />
                                </div>
                                <div className="formInput">
                                    <label>Origen</label>
                                    <input onChange={(e) => { setOrigin(e.target.value) }} value={origin} />
                                </div>


                                <div className="formInput">
                                    <label>Forma de Reserva</label>
                                    <input onChange={(e) => { setFormofbooking(e.target.value) }} value={formofbooking} />
                                </div>
                                <div className="formInput">
                                    <label>Nombre de Compañia</label>
                                    <input onChange={(e) => { setCompanyname(e.target.value) }} value={companyname} />
                                </div>
                                <div className="formInput">
                                    <label>Precio Total</label>
                                    <input onChange={(e) => { setTotalprice(e.target.value) }} value={totalprice} />
                                </div>

                                <div className="formInput">
                                    <label>Numero de niños</label>
                                    <input onChange={(e) => { setNumberofchildren(e.target.value) }} value={numberofchildren} />
                                </div>
                                <div className="formInput">
                                    <label>Numero de adultos</label>
                                    <input onChange={(e) => { setNumberofadults(e.target.value) }} value={numberofadults} />

                                </div>

                                <div className="formInput">
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

                                <div className="formInput">
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

                                <div className="formInput">
                                    <DesktopDatePicker
                                        className="horizontalTF"
                                        inputFormat="DD-MM-YYYY"
                                        sx={{ background: "purple" }}
                                        id="payment_date"
                                        label="Fecha_Pago"
                                        type="fecha_pago"
                                        onChange={handleChange5}
                                        value={paymentdate}
                                        renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                                    />

                                </div>

                                <div className="formInput">
                                    <Button component={Link} to="/dashboard" variant="contained" onClick={createCompleteReservation} style={{ color: 'white', backgroundColor: 'purple', borderColor: 'purple' }} endIcon={<AddBoxIcon />}>
                                        Crear Reservación
                                    </Button>
                                </div>

                            </LocalizationProvider>
                        </form>
                    </div>
                </div>
            </div>                                   
        </div>
    );
}

export default AddBooking