import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

export const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()

    function sendData(){
        actions.signup(email,password)
        navigate("/")
    }

	return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
		            <form className="container my-4">
                        <h3 className="text-center mb-1">Crear usuario</h3>
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
                        <button onClick={() => sendData()} type="submit" className="btn btn-dark mt-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
	);
};
