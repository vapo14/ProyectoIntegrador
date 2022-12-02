import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import AddBookingIcon from '@mui/icons-material/AddCircleOutline';
import logo from '../../assets/logo/La_Gloria_de_Calvillo.png';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
  let navigate = useNavigate();
  const { logout, authed } = useAuth();

  const changePage = (url) => {
    navigate(url);
  };

  const handleLogOut = () => {
    logout();
    navigate("/login");
  };

  if (!authed) {
    return <div></div>;
  }

  return (
    <div className="sidebar">
      <div className="top">
        <span className='logo'>
          <img src={logo} />
        </span>
      </div>
      <div className="center">
        <ul>
          <li onClick={() => changePage("/dashboard")}>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <li onClick={() => changePage("/register")}>
            <PersonAddIcon className="icon" />
            <span>Registrar Usuario</span>
          </li>
          <li onClick={() => changePage("/rooms")}>
            <BedOutlinedIcon className='icon' />
            <span>Habitaciones</span>
          </li>
          <li onClick={() => changePage("/calendar")}>
            <CalendarIcon className='icon' />
            <span>Calendario</span>
          </li>
          <li onClick={() => changePage("/addBooking")}>
            <AddBookingIcon className='icon' />
            <span>Crear reservación</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <Button onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
