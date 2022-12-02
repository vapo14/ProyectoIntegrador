import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./dashboard.scss";
import StickyHeadTable from "../dashboard/Dashboardrows";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Navbar from "../../components/navbar/Navbar";


const Dashboard = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">
                <Navbar />
                <div className="bottom">
                    <Button className="dashboardButtons" variant="contained" component={Link} to="/addBooking" endIcon={<AddBoxIcon />}>
                        Crear Reservación
                    </Button>
                </div>
                <StickyHeadTable />

            </div>
        </div>
    );
}

export default Dashboard