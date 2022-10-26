import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
//import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">La Gloria de Calvillo</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <li>
           
            <Button style={{color: "black", width: "100%"}}   onClick={() => navigate("/dashboard") }>
            <DashboardIcon/>
            Dashboard
            </Button>
    
          </li>
          <li>
            <span>Register Usuario</span>
          </li>
        </ul>
      </div>
      <div className="bottom"></div>
    </div>
  );
};

export default Sidebar;
