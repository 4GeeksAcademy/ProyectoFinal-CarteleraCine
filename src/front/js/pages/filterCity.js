import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import LogoMoviesImage from '../../img/FondoMovieCine2.png';

export const FilterCity = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();


    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {store.cadenas.map((item, index) => {
                return (
                    (item.ciudad == params.name) ?
                        <div key={index} className="col">
                            <div className="card mt-4 mx-1" style={{ background: "#0d6efd", border: "3px solid #ffffff" }}>
                                <img src={LogoMoviesImage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.cinema}</h5>
                                    <p className="card-text">
                                        <strong>Cadena:</strong> {item.cadena} <br />
                                        <strong>Ciudad:</strong> {item.ciudad} <br />
                                    </p>
                                    <Link to={"/single/" + item.id} className="btn" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>
                                        Ver Más
                                    </Link>
                                    {store.auth === true ?
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button
                                            className="btn"
                                            style={{
                                                backgroundColor: '#0d6efd',
                                                color: '#ffffff',
                                                border: '1px solid #ffffff'
                                            }}
                                            onClick={() => actions.eliminarMultiplex(index)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                        <Link to={"/editarMultiplex/" + item.id} >
                                            <button className="btn"
                                                style={{
                                                    backgroundColor: '#0d6efd',
                                                    color: '#ffffff',
                                                    border: '1px solid #ffffff'
                                                }} >
                                                <i className="fa fa-pencil"></i>
                                            </button>
                                        </Link>
                                    </div> : null}
                                </div>
                            </div >
                               
                        </div> 
                        : null   )}

            )}
            <div className="col">
                {store.auth === true ?
                    <div className="card-body mt-3">
                        <Link to="/formulario" className="btn" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>
                            Nuevo multiplex
                        </Link>
                    </div> : null}
            </div>
        </div >

    );

}