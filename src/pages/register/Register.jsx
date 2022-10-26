import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./register.scss";

const Register = () => {
    const [fullname, setFullname] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [userRole, setUserRole] = useState(null);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        if(id === "fullname") {
            setFullname(value);
        }

        if(id === "username") {
            setUsername(value);
        }

        if(id === "password") {
            setPassword(value);
        }

        if(id === "confirmPassword") {
            setConfirmPassword(value);
        }

        if(id === "role") {
            setUserRole(value);
        }

    }

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
                                <input type="text" value={fullname} onChange = {(e) => handleInputChange(e)} id="fullname" />
                            </div>
                            <div className="formInput">
                                <label>Usuario</label>
                                <input type="text" value={username} onChange = {(e) => handleInputChange(e)} id="username"/>
                            </div>
                            <div className="formInput">
                                <label>Contraseña</label>
                                <input type="password" value={password} onChange = {(e) => handleInputChange(e)} id="password"/>
                            </div>
                            <div className="formInput">
                                <label>Confirmar Contraseña</label>
                                <input type="password" value={confirmPassword} onChange = {(e) => handleInputChange(e)} id="confirmPassword"/>
                            </div>
                            <div className="formInput">
                                <label>Rol de usuario</label>
                                <select id="role" value={userRole} onChange = {(e) => handleInputChange(e)} > 
                                    <option value="Administrator">Administrador</option>
                                    <option value="User">Usuario</option>
                                </select>
                            </div>
                            <button>Registrar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register