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
import InputAdornment from '@mui/material/InputAdornment';
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

console.log(startdate);
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

        await axiosInstance.post("/reservations/create", reservation_data);
    };

    const createCompleteReservation = async (e) => {
        createReservation();
    }

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">


                <Typography className="reservation" variant="h3" style={{ color: 'purple', borderColor: 'purple', fontFamily: "OpenSansBold", textDecoration: "underline", marginTop: "1em" }}>
                    Nueva Reservación📝
                </Typography>

                <form>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>

                        <div className="input_Textfield">
                            <TextField
                                sx={{ background: "white" }}
                                id="guest_name"
                                label="Nombre Completo"
                                type="nombre completo"
                                onChange={(e) => { setGuestName(e.target.value) }}
                                value={guestname}
                            />


                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="rooms"
                                label="Numero de Cuartos"
                                type="numero de cuartos"
                                onChange={(e) => { setRooms(e.target.value) }}
                                value={rooms}
                            />

                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="origin"
                                label="Origen"
                                type="origen"
                                onChange={(e) => { setOrigin(e.target.value) }}
                                value={origin}
                            />
                        </div>



                        <div className="input_Anotherfield">
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

                            <DesktopDatePicker
                                inputFormat="DD-MM-YYYY"
                                className="horizontalTF"
                                sx={{ background: "purple" }}
                                id="end_date"
                                label="Check-out"
                                type="Check-out"
                                onChange={handleChange2}
                                value={enddate}
                                renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                            />

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


                        <div className="input_Anotherfield">
                            <TextField
                                className="whiteColor"
                                sx={{ background: "white" }}
                                id="form_of_booking"
                                label="Forma de Reserva"
                                type="forma de reserva"
                                onChange={(e) => { setFormofbooking(e.target.value) }}
                                value={formofbooking}
                            />

                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="company_name"
                                label="Nombre_Compañía"
                                type="nombre compañía"
                                onChange={(e) => { setCompanyname(e.target.value) }}
                                value={companyname}
                            />
                            <TextField
                                className="horizontalTF"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{ background: "white", width: '14em' }}
                                id="total_price"
                                label="Precio_Total"
                                type="precio_total"
                                onChange={(e) => { setTotalprice(e.target.value) }}
                                value={totalprice}

                            />

                        </div>


                        <div className="input_Anotherfield">


                            <TextField
                                className="whiteColor"
                                sx={{ background: "white" }}
                                id="number_of_children"
                                label="Num_niños"
                                type="num_niños"
                                onChange={(e) => { setNumberofchildren(e.target.value) }}
                                value={numberofchildren}
                            />

                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="number_of_adults"
                                label="Num_adultos"
                                type="num_adultos"
                                onChange={(e) => { setNumberofadults(e.target.value) }}
                                value={numberofadults}
                            />

                        </div>

                        <div className="createButton">
                            <Button component={Link} to="/dashboard" variant="contained" onClick={createCompleteReservation} style={{ color: 'white', backgroundColor: 'purple', borderColor: 'purple' }} endIcon={<AddBoxIcon />}>
                                Crear Reservación
                            </Button>
                        </div>

                    </LocalizationProvider>
                </form>

            </div>

        </div>
    );
}

export default AddBooking