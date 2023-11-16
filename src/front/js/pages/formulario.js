import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/home.css";

export const Formulario = () => {
    const { store, actions } = useContext(Context);
    const [multiplex, setMultiplex] = useState({
        cadena: "",
        cinema: "",
        ciudad: "",
        pais: ""
    });

    const handleChange = (event) => {
        setMultiplex({
            ...multiplex,
            [event.target.name]: event.target.value
        });
    }

    const saveMultiplex = async (event) => {
        event.preventDefault();
        const result = await actions.crearMultiplex(multiplex);
        console.log(result);
        if (result === 200) {
            alert("¡Creado satisfactoriamente!");
        } else if (result === 409) {
            alert("Ya existe");
        } else {
            alert("Error", "Algo salió mal al crear el multiplex.");
        }
    }

    return (
        <div className="container col-5 center">
            <form onSubmit={saveMultiplex}>
                <div className="form-group">
                    <label htmlFor="cadena"><h5>Cadena</h5></label>
                    <input name="cadena" value={multiplex.cadena} onChange={handleChange}
                        type="text" className="form-control" id="cadena" placeholder="Cadena" />
                </div>
                <div className="form-group">
                    <label htmlFor="cinema"><h5>Cinema</h5></label>
                    <input name="cinema" value={multiplex.cinema} onChange={handleChange}
                        type="text" className="form-control" id="cinema" placeholder="Cinema" />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad"><h5>Ciudad</h5></label>
                    <input name="ciudad" value={multiplex.ciudad} onChange={handleChange}
                        type="text" className="form-control" id="ciudad" placeholder="ciudad" />
                </div>
                <div className="form-group">
                    <label htmlFor="pais"><h5>Pais</h5></label>
                    <input name="pais" value={multiplex.pais} onChange={handleChange}
                        type="text" className="form-control" id="pais" placeholder="pais" />
                </div>
                <br></br>
                <button type="submit" className="btn btn-warning ">submit</button>
                <Link to="/cadenas">
                    <span className="text mx-3" href="#" role="button">
                        Vuelve a la lista
                    </span>
                </Link>
            </form>
        </div>
    );
}
