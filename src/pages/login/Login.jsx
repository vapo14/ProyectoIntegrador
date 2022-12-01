import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "username") {
      setUsername(value);
    }

    if (id === "password") {
      setPassword(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username,
      password,
    };
    const data = await login(credentials);
    if (data !== "FAILED") {
      navigate("/dashboard");
    } else {
      console.error("Error on login", data);
    }
  };

  return (
    <div className="login">
      <Sidebar />
      <div className="loginContainer">
        <Navbar />
        <div className="top">
          <h1>Ingresar Usuario</h1>
        </div>
        <div className="bottom">
          <div className="form">
            <form onSubmit={handleLogin}>
              <div className="formInput">
                <label>Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleInputChange(e)}
                  id="username"
                />
              </div>
              <div className="formInput">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => handleInputChange(e)}
                  id="password"
                />
              </div>
              <button className="loginButton" type="button" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
