
import React, { useState } from "react";
import bcrypt from 'bcryptjs';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./login.scss";
import send from "../../util/message-emitter";
import { Navigate } from "react-router-dom"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        
        if(id === "username") {
            setUsername(value);
        }

        if(id === "password") {
            setPassword(value);
        }
    }

    const handleLogin = async() => {
        console.log("Submit button was clicked, username is ", username);
        let user = await send({ action: "GET_BY_USERNAME", username }, "user");
        let currentUserPasswordHash = bcrypt.hashSync(password + user.password_salt);
        if(user.password_hash == currentUserPasswordHash){
            alert("Login Exitoso UwU");
            <Navigate to="/" replace={true}/>
        } else {
            alert("Login Fallido >x<");
        }
    }

    return (
        <div className="login">
            <Sidebar />
            <div className="loginContainer">
                <Navbar />
                <div className="top">
                    <h1>Ingersar Usuario</h1>
                </div>
                <div className="bottom">
                    <div className="form">
                        <form onSubmit={handleLogin}>
                            <div className="formInput">
                                <label>Usuario</label>
                                <input type="text" value={username} onChange = {(e) => handleInputChange(e)} id="username"/>
                            </div>
                            <div className="formInput">
                                <label>Contraseña</label>
                                <input type="password" value={password} onChange = {(e) => handleInputChange(e)} id="password"/>
                            </div>
                            <button className="loginButton" type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login