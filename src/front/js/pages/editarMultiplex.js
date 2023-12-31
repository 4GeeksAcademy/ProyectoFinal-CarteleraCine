import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const EditarMultiplex = () => {
    const { store, actions } = useContext(Context);
    const params = useParams()
    const [cadena, setCadena] = useState(store.cadena.cadena)
    const [cinema, setCinema] = useState(store.cadena.cinema)
    const [ciudad, setCiudad] = useState(store.cadena.ciudad)
    const [pais, setPais] = useState(store.cadena.pais)
    const navigate = useNavigate()

    const guardarCambios = async () => {
        let response = await actions.editarMultiplex(params.id, cadena, cinema, ciudad, pais);
        // location.replace("/cadenas")
        if (response == 200) {
            navigate("/cadenas")
        }
        console.log(response);
    };

    useEffect(() => {
        actions.mostrarMultiplex_id(params.id)
    }, [])

    return (
        <div className="container " >
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="cadena" className="form-label text-start"><h5>Cadena:</h5></label>
                        <input type="text" className="form-control" id="cadena" aria-describedby="cadenaHelp" defaultValue={store.cadena.cadena} onChange={(e) => setCadena(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="cinema" className="form-label text-start"><h5>Cinema:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="cinemaHelp" defaultValue={store.cadena.cinema} onChange={(e) => setCinema(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="ciudad" className="form-label text-start"><h5>Ciudad:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="ciudadHelp" defaultValue={store.cadena.ciudad} onChange={(e) => setCiudad(e.target.value)} />
                    </div>
                </div>
                <div className="col">
                    <div className="mb-3">
                        <label htmlFor="pais" className="form-label text-start"><h5>Pais:</h5></label>
                        <input type="text" className="form-control" id="cinema" aria-describedby="paisHelp" defaultValue={store.cadena.pais} onChange={(e) => setPais(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="ml-auto">
                <button className="btn btn-warning" type="button" onClick={() => guardarCambios()}>
                    Guardar Cambios
                </button>
                <Link to="/cadenas">
                    <span className="text mx-3" href="#" role="button" >
                        Vuelve a la lista
                    </span>
                </Link>
            </div>
        </div>
    )
}