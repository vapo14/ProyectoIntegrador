import "./navbar.scss";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { UserData, authed } = useAuth();

  if (!authed) {
    return <div></div>;
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="user-greeting">Hola {UserData.username}!</div>
      </div>
    </div>
  );
};

export default Navbar;
