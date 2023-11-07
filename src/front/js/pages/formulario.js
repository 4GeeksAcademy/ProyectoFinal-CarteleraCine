import React, { useContext } from "react";
import "../../styles/home.css";

export const Formulario = () => {
    return (
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="cadena">Cadena</label>
                    <input type="cadena" className="form-control" id="cadena" placeholder="Cadena" />
                </div>
                <div className="form-group">
                    <label htmlFor="cinema">Cinema</label>
                    <input type="cinema" className="form-control" id="cinema" placeholder="Cinema" />
                </div>
                <div className="form-group">
                    <label htmlFor="ciudad">Ciudad</label>
                    <input type="Ciudad" className="form-control" id="Ciudad" placeholder="Ciudad" />
                </div>
                <div className="form-group">
                    <label htmlFor="pais">Pais</label>
                    <input type="Pais" className="form-control" id="Pais" placeholder="Pais" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}


