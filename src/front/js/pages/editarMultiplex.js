import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";


export const EditarMultiplex = () => {
    const { store, actions } = useContext(Context);
    const params = useParams()

    const [cadena, setCadena] = useState(store.cadena.cadena)
    const [cinema, setCinema] = useState(store.cadena.cinema)
    const [ciudad, setCiudad] = useState(store.cadena.ciudad)
    const [pais, setPais] = useState(store.cadena.pais)

    const guardarCambios = () => {
        actions.editarMultiplex(params.id, cadena, cinema, ciudad, pais);
    };

    useEffect(() => {
        actions.mostrarMultiplex_id(params.id)
    }, [])

    return (
        <div className="container " >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label text-start"><h5>Cadena:</h5></label>
                        <input type="text" className="form-control" id="cadena" aria-describedby="emailHelp" defaultValue={store.cadena.cadena} onChange={(e) => setCadena(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label text-start"><h5>Cinema:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="emailHelp" defaultValue={store.cadena.cinema} onChange={(e) => setCinema(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label text-start"><h5>Ciudad:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="emailHelp" defaultValue={store.cadena.ciudad} onChange={(e) => setCiudad(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label text-start"><h5>Pais:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="emailHelp" defaultValue={store.cadena.pais} onChange={(e) => setPais(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="">
                <button className="btn btn-warning" type="submit" onClick={() => guardarCambios()}>
                    Guardar Cambios
                </button>
            </div>
        </div>
    )
}