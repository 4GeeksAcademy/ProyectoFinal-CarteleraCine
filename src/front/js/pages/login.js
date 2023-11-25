import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, actions} = useContext(Context)

    function sendData(e){
        e.preventDefault()
        actions.login(email, password)
    }

	return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {store.auth === true ? <Navigate to="/movies"/>:
                    <>
                    <form onSubmit={sendData} className="custom-form">
                        <h3 className="text-center mb-1">Iniciar sesión</h3>
                        <p className="text-center mb-4">Entra con tu usuario registrado</p>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-dark mt-4 me-4">Log in</button>
                        {/* <Link to="/signup">
                            <button type="submit" className="btn btn-dark mt-4">Create new account</button>
                        </Link> */}
                    </form>
                    </>
            }
                </div>
            </div>
        </div>
	);
};