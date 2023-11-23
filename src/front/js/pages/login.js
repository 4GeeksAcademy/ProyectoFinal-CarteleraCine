
import React, { useState, useContext } from "react"
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";

export const Login = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { actions } = useContext(Context)
    const { store } = useContext(Context)

    function sendData(e) {
        e.preventDefault()
        console.log("send Data");
        console.log(name, email, password);
        actions.login(name, email, password)
    }

    return (
        <div>
            {store.auth === true ? <Navigate to = "/movies"/> :
                <>
                    "No Estas Logueado"
                    <form onSubmit={sendData}>
                        <h1 className="text-center">LOGIN</h1>
                        <div className="container">
                            <div className="row col mb-3">
                                <label htmlFor="inputName3" className="col-sm-2 col-form-label">Name</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="name" value={name} onChange={(e) => setName(e.target.value)} id="inputName3" />
                                </div>
                            </div>
                            <div className="row col mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} id="inputEmail3" />
                                </div>
                            </div>
                            <div className="row col mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} id="inputPassword3" />
                                </div>
                            </div>
                            <div className="row col mb-3">
                                <div className="col-sm-10 offset-sm-2">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" id="gridCheck1" />
                                        <label className="form-check-label" htmlFor="gridCheck1">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-warning">Sign in</button>
                            </div>
                        </div>
                    </form>
                </>
            }
        </div>
    )
};
