import React, { useState } from "react";
import bcrypt from "bcryptjs";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Login = () => {
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

  const handleLogin = async () => {
    // let user = await send({ action: "GET_BY_USERNAME", username }, "user");
    // bcrypt.compare(
    //   password + user.password_salt,
    //   user.password_hash,
    //   function (err, res) {
    //     if (res) {
    //       navigate("/dashboard");
    //       alert("Login Exitoso UwU");
    //     } else {
    //       alert("Login Fallido >x<");
    //     }
    //   }
    // );
    const userInfo = {
      username: username,
      password: password,
    };
    let res = await axiosInstance.post("/login", userInfo)

    console.log(res);

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
