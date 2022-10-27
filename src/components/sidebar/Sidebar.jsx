import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
    let navigate = useNavigate();

    const changePage = (url) => {
        navigate(url);
    }

    
    return (
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'>La Gloria de Calvillo</span>
            </div>
            <hr />
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
                </ul>
            </div>
            <div className='bottom'></div>
        </div>
    )
}

export default Sidebar;
