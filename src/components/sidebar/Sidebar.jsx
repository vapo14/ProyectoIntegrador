import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';

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
                        <DashboardIcon />
                        <span>Dashboard</span>
                    </li>
                    <li>
                        <span>Register Usuario</span>
                    </li>
                </ul>
            </div>
            <div className='bottom'></div>
        </div>
    )
}

export default Sidebar