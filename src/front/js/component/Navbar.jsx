import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import style from "../../styles/Home.module.css";

const Navbar = () => {
    const {store, actions} = useContext(Context)
	const navigate = useNavigate()

	function handleLogout() {
		actions.logout()
		navigate("/")
	}
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid mx-auto text-center">
                    
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto text-center">
                            <li className="nav-item fw-bold">
                                <Link to="/" className="nav-link active me-5" style={{ color: 'White' }} aria-current="page" href="#">
                                    Inicio 
                                </Link>
                            </li>
                            <li className="nav-item fw-bold">
                                <Link to="/movies" className="nav-link active me-5" style={{ color: 'White' }} aria-current="page" href="#">
                                    Cartelera 
                                </Link>
                            </li>
                            <li className="nav-item ms-3 fw-bold" >
                                <Link to="/cadenas" className="nav-link me-5" style={{ color: 'white' }} href="#">
                                    Ver Multiplex
                                </Link>
                            </li>

                            <li className="nav-item me-5 ms-3 fw-bold" >
                                <Link to="/ciudades" className="nav-link" style={{ color: 'white' }}>
                                    Ciudades
                                </Link> 
                            </li>
                            {store.auth === true ?
                            <li className="nav-item me-5 ms-3 fw-bold" >
                            <Link to="/showtimes" className="nav-link" style={{ color: 'white' }}>
                                Crear horarios
                            </Link> 
                            </li>
                            : null}
                            <li className="nav-item ms-3 fw-bold" >
                                <Link to="/login" className="nav-link" style={{ color: 'white' }}>
                                    Inicio de sesion
                                </Link> 
                            </li>
                            <li className="nav-item ms-3 fw-bold">
                                {store.auth === true ? <button onClick={()=>handleLogout()} className="btn btn-dark nav-item ms-3 fw-bold" style={{ color: 'white' }}>Logout</button> : null}
                            </li>
                            {/* <form className="d-flex">
                                <input className={`${style.button} ms-3`} type="search" placeholder="Search" aria-label="Search" />
                                <button className={`${style.button} me-3`} type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search border-radius: 20px; height: 40px;" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                            </form>

                            <form type="button" className={`${style.button} ms-5`} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                Inicio de sesión <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-check" viewBox="0 0 16 16">
                                    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                                    <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                                </svg>
                            </form>

                            {/* Modal */}
                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" style={{ backgroundColor: '#573609' }}>
                                    <div className="modal-content" style={{ backgroundColor: '#d5c488e8' }}>
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="staticBackdropLabel">Iniciar sesión con tu usuario registrado</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleDropdownFormEmail1" className="form-label">User/Email</label>
                                                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="User" />
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                                                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
                                                </div>
                                                <div className="mb-3">
                                                    <div className="form-check">
                                                        <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                                                        <label className="form-check-label" htmlFor="dropdownCheck">
                                                            Remember me
                                                        </label>
                                                    </div>
                                                </div>
                                                <button type="submit" className={style.button}>Sign in</button>
                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item" href="#">New around here? Sign up</a>
                                            <a className="dropdown-item" href="#">Forgot password?</a>
                                            <button type="button" className={style.button} data-bs-dismiss="modal">Close</button>
                                            {/* <button type="button" className="btn btn-primary">Understood</button> */}
                                        </div>
                                    </div>
                                </div>
                            </div> 

                        </ul>
                    </div>
                </div>
            </nav >
        </div >
    )
}

export default Navbar