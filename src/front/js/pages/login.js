import React, { useState, useContext } from "react"
import { Context } from "../store/appContext";

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context);

    function sendData(e) {
        e.preventDefault()
        console.log("send Data");
        actions.login(email, password)
    }

  
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={sendData} className="custom-form">

                        <h3 className="text-center mb-1">Iniciar sesión</h3>
                        <p className="text-center mb-4">Entra con tu usuario registrado</p>

                        {/* <div className="mb-3">
                            <label htmlFor="inputName" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div> */}

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

                        <div className="mb-3 form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="gridCheck1"
                            />
                            <label className="form-check-label" htmlFor="gridCheck1">
                                Remember me
                            </label>
                        </div>

                        <button type="submit" className="btn btn-dark">Sign in</button>
                    </form>
                </div>
            </div>
        </div>
    )
};