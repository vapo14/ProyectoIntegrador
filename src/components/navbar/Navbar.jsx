import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="user-greeting">Hola Usuario</div>
        <div className="search">
          <SearchIcon className="icon" />
          <input type="text" placeholder="Buscar..." />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
