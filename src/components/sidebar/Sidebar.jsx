import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className='top'>
                <span className='logo'>La Gloria de Calvillo</span>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <li>
                        <DashboardIcon className='icon'/>
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <PersonAddIcon  className='icon'/>
                        <span>Registrar Usuario</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'></div>
        </div>
    )
}

export default Sidebar