import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
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
        <span className="logo">La Gloria de Calvillo</span>
      </div>
      <hr />
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
          <li onClick={() => changePage("/crearHabitacion")}>
            <span>Crear habitacion</span>
          </li>
          <li onClick={() => changePage("/calendar")}>
            <span>Calendario</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <Button variant="contained" onClick={handleLogOut}>
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
