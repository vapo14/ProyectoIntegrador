import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss";
import StickyHeadTable from "../dashboard/Dashboardrows";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Navbar from "../../components/navbar/Navbar";


const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Navbar />
                <div className="dashboardButtons">
                    <Button className="nuevResButton" variant="outlined" style={{ color: '#CA5D26', backgroundColor: '#F5F5F5', borderColor: '#CA5D26', fontFamily:"OpenSansBold" }} endIcon={<AutoAwesomeIcon />}>
                        Nuevas Reservaciones
                    </Button>
                    <Button variant="contained" component={Link} to="/addBooking" style={{ color: '#F5F5F5', backgroundColor: '#CA5D26', borderColor: '#CA5D26' }} endIcon={<AddBoxIcon />}>
                        Añadir Reservacion
                    </Button>
                </div>
                <StickyHeadTable />

            </div>
        </div>
    );
}

export default Dashboard