import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAddOutlined';
import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined';
import RoomAddIcon from '@mui/icons-material/AddHomeOutlined';
import logo from '../../assets/logo/La_Gloria_de_Calvillo.png'
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    let navigate = useNavigate();

    const changePage = (url) => {
        navigate(url);
    }

    
    return (
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'>
                    <img src={logo} />
                </span>
            </div>
            <div className='center'>
                <ul>
                    <li onClick={() => changePage("/dashboard")}>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                    <li onClick={() => changePage("/register")}>
                        <PersonAddIcon  className='icon'/>
                        <span>Registrar Usuario</span>
                    </li>
                    <li onClick={() => changePage("/calendar")}>
                        <CalendarIcon className='icon' />
                        <span>Calendario</span>
                    </li>
                    <li onClick={() => changePage("/crearHabitacion")}>
                        <RoomAddIcon className='icon' />
                        <span>Crear habitacion</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'></div>
        </div>
    )
}

export default Sidebar;
