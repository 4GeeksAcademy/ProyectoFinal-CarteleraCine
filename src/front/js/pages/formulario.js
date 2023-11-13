import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Formulario = () => {
    const {store, actions } = useContext(Context)
    const [multiplex, setMultiplex] = useState({
        cadena: "",
        cinema: "",
        ciudad: "",
        pais: ""
    })

    const handleChange = (event) => {
        setMultiplex({
            ...multiplex,
            [event.target.name]: event.target.value
        })
    }

    const saveMultiplex = async (event) => {
        event.preventDefault()
        const result = await actions.crearMultiplex(multiplex)
        console.log(result);
        if (result === 200) {
           alert("Creado satisfactoriamente")
        } else {
            alert("Ya existe")
        }
    }

    // const editarMultiplex = async (event) => {
	// 	event.preventDefault();
	// 	const result = await actions.editarMultiplex(multiplex);
	// 	if (result === 200) {
	// 		alert("Editado satisfactoriamente");
	// 	} else {
	// 		alert("Error", "Inténtalo de nuevo", error);
	// 	}
	// };
    
    return (
        <div className="container">
            <form onSubmit={saveMultiplex}>
                <div className="form-group">
                    <label htmlFor="cadena">Cadena</label>
                    <input name="cadena" value={multiplex.cadena} onChange={handleChange}
                        type="text" className="form-control" id="cadena" placeholder="Cadena" />
                </div>
                <div className="form-group">
                    <label htmlFor="cinema">Cinema</label>
                    <input name="cinema" value={multiplex.cinema} onChange={handleChange} 
                        type="text" className="form-control" id="cinema" placeholder="Cinema" />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input name="ciudad" value={multiplex.ciudad} onChange={handleChange} 
                        type="text" className="form-control" id="ciudad" placeholder="ciudad" />
                </div>
                <div className="form-group">
                    <label htmlFor="pais">Pais</label>
                    <input name="pais" value={multiplex.pais} onChange={handleChange} 
                        type="text" className="form-control" id="pais" placeholder="pais" />
                </div>
                <button type="submit" className="btn btn-primary">submit</button>
            </form>
        </div>
    );
};
