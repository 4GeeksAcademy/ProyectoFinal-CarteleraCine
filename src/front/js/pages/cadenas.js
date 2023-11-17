import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cadenas = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <ul className="list-group">
                {store.cadenas.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between"
                            style={{ background: item.background }} >
                            < div >
                                <h4>{item.cinema}</h4>
                                <br />
                                {"Cinema: " + item.cadena}
                                <br />
                                {"Cadena: " + item.ciudad}
                                <br />
                                {item.pais}
                                <br />
                                <Link to={"/single/" + index}>
                                    <span>{"Ver Más"}</span>
                                </Link>
                            </div >
                            <div className="justify-content-end">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-warning fa fa-trash" type="button"
                                        onClick={() => actions.eliminarMultiplex(index)}>
                                    </button>
                                    <Link to={"/editarMultiplex/" + item.id} >
                                        <button className="btn btn-warning fa fa-pencil" type="button"></button>
                                    </Link>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <br />
            <div className="container">
                <Link to="/formulario">
                    <button className="btn btn-warning">Nuevo multiplex</button>
                </Link>
            </div>
        </div >
    );
};