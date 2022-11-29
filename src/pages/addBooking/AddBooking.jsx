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


const AddBooking = () => {
    //guest_Table has
    const [fullname, setFullname] = useState("");
    const [origin, setOrigin] = useState("");
    //room_Table has 
    const [roomnumber, setRoomNumber] = useState("");
    const [bedtypenumber, setBedTypeNumber] = useState("");
    const [currentprice, setCurrentPrice] = useState("");
    const [jacuzzi, setJacuzzi] = useState("");
    //reservation_Table has 
    const [startdate, setStartdate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY'));
    const [enddate, setEnddate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY') );
    const [tscreated, setTscreated] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY') );
    const [tsupdated, setTsupdated] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY') );
    const [totalprice, setTotalprice] = useState("");
    const [formofbooking, setFormofbooking] = useState("");
    const [companyname, setCompanyname] = useState("");
    const [numberofadults, setNumberofadults] = useState("");
    const [numberofchildren, setNumberofchildren] = useState("");
    const [paymentdate, setPaymentdate] = React.useState(dayjs('2022-02-10').format('DD-MM-YYYY') );

    const handleChangeJacuzzi = (event) => {
        setJacuzzi(event.target.value);
    };


    const handleChange = (newValue) => {
        setStartdate(newValue);
    };

    const handleChange2 = (newValue) => {
        setEnddate(newValue);
    };


    const handleChange3 = (newValue) => {
        setTscreated(newValue);
    };


    const handleChange4 = (newValue) => {
        setTsupdated(newValue);
    };


    const handleChange5 = (newValue) => {
        setPaymentdate(newValue);
    };

    const createGuest = async (e) => {
        const guest = {
            full_name: fullname,
            origin: origin,
        }
        await axiosInstance.post("/guests", guest);
    }

    const createRoom = async (e) => {
        const room = {
            room_number: roomnumber,
            beds_type_number: bedtypenumber,
            current_price: currentprice,
            jacuzzi: jacuzzi,
        }
        await axiosInstance.post("/rooms", room);
    }

    const createReservation = async (e) => {
        const reservation = {
            start_date: startdate,
            end_date: enddate,
            ts_created: tscreated,
            ts_updated: tsupdated,
            total_price: totalprice,
            form_of_booking: formofbooking,
            company_name: companyname,
            number_of_adults: numberofadults,
            number_of_children: numberofchildren,
            payment_date: paymentdate,
        };

        await axiosInstance.post("/reservations/create", reservation);

    };

    const createCompleteReservation = async (e) => {
        createGuest();
        createRoom();
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
                                id="full_name"
                                label="Nombre Completo"
                                type="nombre completo"
                                onChange={(e) => { setFullname(e.target.value) }}
                                value={fullname}
                            />


                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="room_number"
                                label="Numero de Cuartos"
                                type="numero de cuartos"
                                onChange={(e) => { setRoomNumber(e.target.value) }}
                                value={roomnumber}
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
                                inputFormat="DD-MM-YYYY"
                                className="horizontalTF"
                                sx={{ background: "purple" }}
                                id="ts_created"
                                label="Comienzo TS"
                                type="comienzo ts"
                                onChange={handleChange3}
                                value={tscreated}
                                renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
                            />

                        </div>


                        <div className="input_Anotherfield">
                            <DesktopDatePicker
                                inputFormat="DD-MM-YYYY"
                                className="whiteColor"
                                sx={{ background: "white" }}
                                id="ts_updated"
                                label="Fin TS"
                                type="fin ts"
                                onChange={handleChange4}
                                value={tsupdated}
                                renderInput={(params) => <TextField {...params} sx={{ width: '14em' }} />}
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
                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="form_of_booking"
                                label="Forma de Reserva"
                                type="forma de reserva"
                                onChange={(e) => { setFormofbooking(e.target.value) }}
                                value={formofbooking}
                            />



                        </div>


                        <div className="input_Anotherfield">
                            <TextField
                                sx={{ background: "white" }}
                                id="company_name"
                                label="Nombre_Compañía"
                                type="nombre compañía"
                                onChange={(e) => { setCompanyname(e.target.value) }}
                                value={companyname}
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

                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="number_of_children"
                                label="Num_niños"
                                type="num_niños"
                                onChange={(e) => { setNumberofchildren(e.target.value) }}
                                value={numberofchildren}
                            />


                        </div>


                        <div className="input_Anotherfield">

                        <InputLabel id="demo-simple-select-label">Jacuzzi</InputLabel>
                            <Select
                                className="whiteColor"
                                sx={{ width: '14em' }}
                                labelId="demo-simple-select-autowidth-label"
                                id="jacuzzi"
                                value={jacuzzi}
                                onChange={handleChangeJacuzzi}
                                autoWidth
                                label="Jacuzzi"
                            >
                                <MenuItem value={"true"}>Si</MenuItem>
                                <MenuItem value={"false"}>No</MenuItem>
                            </Select>

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

                          

                            <TextField
                                className="horizontalTF"
                                sx={{ background: "white" }}
                                id="bed_type_number"
                                label="Tipo de cama #"
                                type="Tipodecama"
                                onChange={(e) => { setBedTypeNumber(e.target.value) }}
                                value={bedtypenumber}
                            />
                        </div>

                        <div className="input_Anotherfield">
                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                sx={{ background: "white", width: '14em' }}
                                id="current_price"
                                label="Precio Actual"
                                type="precioactual"
                                onChange={(e) => { setCurrentPrice(e.target.value) }}
                                value={currentprice}
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