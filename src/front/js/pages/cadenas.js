import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cadenas = () => {
    const { store, actions } = useContext(Context);  

    return (
        <div className="container">
            <div className="container mt-4">
                <Link to="/formulario">
                    <button className="btn btn-dark">Nuevo multiplex</button>
                </Link>
            </div>
            <ul className="list-group">
                {store.cadenas.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between mt-4 bg-secondary text-white"
                            style={{ background: item.background }} >
                            < div >
                                <h4>{item.cinema}</h4>
                                <br />
                                {"Cadena: " + item.cadena}
                                <br />
                                {"Ciudad: " + item.ciudad}
                                <br />
                                {item.pais}
                                <br />
                                <Link to={"/single/" + item.id}>
                                    <span>{"Ver Más"}</span>
                                </Link>
                            </div >
                            <div className="justify-content-end">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark fa fa-trash" type="button"
                                        onClick={() => actions.eliminarMultiplex(index)}>
                                    </button>
                                    <Link to={"/editarMultiplex/" + item.id} >
                                        <button className="btn btn-dark fa fa-pencil" type="button"></button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <br />
            
        </div >
    );
};
