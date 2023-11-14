import React from 'react'
import Logo from '../../img/logo Movies/logoMovies2.png';
import { Link } from "react-router-dom";
import style from "../../styles/Home.module.css";

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="logoMovies2.png" className="w-25 h-25 mx-4" alt="Logo" />
                    </a>
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
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">
                                    Cartelera
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Proximos Extrenos
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link to="/ciudades" className="nav-link">
                                    Ciudades
                                </Link>
                            </li>
                            <form className="d-flex">
                                <input className={style.button}  type="search" placeholder="Search" aria-label="Search" />
                                <button className={style.button}  type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search border-radius: 20px; height: 40px;" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg></button>
                            </form>



                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar