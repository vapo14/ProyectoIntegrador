import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import GeneratePassword from "../../security/generatePassword";
import "./register.scss";
import axiosInstance from "../../api/axiosInstance";
import { FormErrors } from "./FormErrors";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("Administrador");
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "fullname") {
      setFullname(value);
    }

    if (id === "username") {
      setUsername(value);
    }

    if (id === "password") {
      setPassword(value);
    }

    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (id === "role") {
      setUserRole(value);
    }
  };

  const validateSubmit = () => {
    if (password !== confirmPassword) {
      setFormErrors({
        username: "",
        password: "Las contraseñas no coinciden.",
      });
      return false;
    }

    if (!password.length >= 8) {
      setFormErrors({
        username: "",
        password:
          "La contraseña es demasiado corta, porfavor escribe al menos 8 caracteres.",
      });
      return false;
    }

    if (!username.length >= 6) {
      setFormErrors({
        username:
          "El usuario proporcionado es demasiado corto, porfavor escribe al menos 6 caracteres",
        password: "",
      });
      return false;
    }

    if (!username.length >= 6 && !password.length >= 8) {
      setFormErrors({
        username:
          "El usuario proporcionado es demasiado corto, porfavor escribe al menos 6 caracteres",
        password:
          "La contraseña es demasiado corta, porfavor escribe al menos 8 caracteres.",
      });
      return false;
    }

    return true;
  };

  const clearInputs = () => {
    setFullname("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");

    alert("El usuario fue creado con éxito.");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateSubmit()) {
      return;
    }

    var passwordObj = GeneratePassword(password);

    const user = {
      username : username,
      full_name : fullname,
      password_hash : passwordObj.hash_password,
      password_salt : passwordObj.salt,
    };

    console.log(user)

    let res = await axiosInstance.post("/users", user);
    console.log("RES: ", res);

    if (!res) {
      alert("No se pudo crear el usuario..");
    } else {
      clearInputs();
    }
  };

  return (
    <div className="register">
      <Sidebar />
      <div className="registerContainer">
        <Navbar />
        <div className="top">
          <h1>Registar Nuevo Usuario</h1>
        </div>
        <div className="bottom">
          <div className="form">
            <form>
              <div className="formInput">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => handleInputChange(e)}
                  id="fullname"
                />
              </div>
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
              <div className="formInput">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => handleInputChange(e)}
                  id="confirmPassword"
                />
              </div>
              <div className="formInput">
                <label>Rol de usuario</label>
                <select
                  id="role"
                  value={userRole}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="Administrator">Administrador</option>
                  <option value="User">Usuario</option>
                </select>
              </div>
              <button onClick={handleSubmit} type="submit">
                Registrar
              </button>
              <FormErrors formErrors={formErrors} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
