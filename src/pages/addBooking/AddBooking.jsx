import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addBooking.scss";

import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';


const AddBooking = () => {
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="dashboardContainer">

              <p> hola soy add booking</p>

            </div>
    
        </div>
    );
}

export default AddBooking