import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";

export const EditarMultiplex = () => {
    const { store, actions } = useContext(Context);
    const [multiplex, setMultiplex] = useState({
        cadena: "",
        cinema: "",
        ciudad: "",
        pais: ""
    });
    const [editIndex, setEditIndex] = useState(null);
    const [editedMultiplex, setEditedMultiplex] = useState({});


    const editarMultiplex = (index) => {
        setEditIndex(index);
        setEditedMultiplex(store.cadenas[index]);
    };

    const guardarCambios = () => {
        if (editIndex !== null) {
            actions.editarMultiplex(editedMultiplex, editIndex);
            setEditIndex(null);
            setEditedMultiplex({});
        }
    }

    return (
        <div className="container">
            <ul className="list-group">
                {store.cadenas.map((item, index) => {
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between">

                            <img src={item.image} style={{ width: '20%', height: '15%' }} alt="Imagen" />

                            {editIndex === index ? (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Cadena"
                                        value={editedMultiplex.cadena || ""}
                                        onChange={(e) => setEditedMultiplex({ ...editedMultiplex, cadena: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Cinema"
                                        value={editedMultiplex.cinema || ""}
                                        onChange={(e) => setEditedMultiplex({ ...editedMultiplex, cinema: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Ciudad"
                                        value={editedMultiplex.ciudad || ""}
                                        onChange={(e) => setEditedMultiplex({ ...editedMultiplex, ciudad: e.target.value })}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Pais"
                                        value={editedMultiplex.pais || ""}
                                        onChange={(e) => setEditedMultiplex({ ...editedMultiplex, pais: e.target.value })}
                                    />
                                    <button onClick={guardarCambios(editedMultiplex)}>Guardar</button>
                                </div>
                            ) : (
                                <div >
                                    {item.cadena}
                                    <br />
                                    {item.cinema}
                                    <br />
                                    {item.ciudad}
                                    <br />
                                    {item.pais}
                                    <br />
                                </div>
                            )}
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button className="btn btn-warning" type="button" onClick={() => actions.editarMultiplex(index)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />

                                </svg></button>
                            </div>
                        </li>
                    )
                }
                )
                }
            </ul>
        </div>
    )
}