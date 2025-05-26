import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    sessionStorage.removeItem("userFound");
    const navigate = useNavigate();

    const [adminUsername, setUsername] = useState('');
    const [adminPassword, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        

        const formData = new FormData();
        formData.append('adminUsername', adminUsername);
        formData.append('adminPassword', adminPassword);

        try {
            const response = await axios.post('http://localhost:8080/adminland2', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if(response.data == "User Found"){
                sessionStorage.setItem("userFound",JSON.stringify(true));
            }

            console.log(response.data);
            if(response.data === "User not found"){
                setErrorMessage('Invalid adminUsername or adminPassword. Please try again.');
            }

            else{
                sessionStorage.setItem("adminUsername",adminUsername);
                navigate("/admin/dashboard/");
            }
        } catch (error) {
                console.error(error);
                setErrorMessage('Invalid adminUsername or adminPassword. Please try again.');
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login Page for Book My Game Admin</h2>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <form onSubmit={handleLogin}>
                    <div className="form-group mb-3">
                        <label htmlFor="adminUsername">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="adminUsername"
                            placeholder="Enter adminUsername"
                            value={adminUsername}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="adminPassword">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="adminPassword"
                            placeholder="Password"
                            value={adminPassword}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form><br/>
                <Link to={`/`}>new user?</Link>
            </div>
        </div>
    );
};

export default LoginPage;
