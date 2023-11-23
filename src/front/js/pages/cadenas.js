// import React, { useState, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import { Context } from "../store/appContext";

// export const Cadenas = () => {
//     const { store, actions } = useContext(Context);

//     return (
//         <div className="container">
//             <ul className="list-group">
//                 {store.cadenas.map((item, index) => {
//                     return (
//                         <li
//                             key={index}
//                             className="list-group-item d-flex justify-content-between mt-4 bg-secondary text-white"
//                             style={{ background: item.background }} >
//                             < div >
//                                 <h4>{item.cinema}</h4>
//                                 <br />
//                                 {"Cinema: " + item.cadena}
//                                 <br />
//                                 {"Cadena: " + item.ciudad}
//                                 <br />
//                                 {item.pais}
//                                 <br />
//                                 <Link to={"/single/" + item.id}>
//                                     <span>{"Ver Más"}</span>
//                                 </Link>
//                             </div >
//                             <div className="justify-content-end">
//                                 <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//                                     <button className="btn btn-dark fa fa-trash" type="button"
//                                         onClick={() => actions.eliminarMultiplex(index)}>
//                                     </button>
//                                     <Link to={"/editarMultiplex/" + item.id} >
//                                         <button className="btn btn-dark fa fa-pencil" type="button"></button>
//                                     </Link>
//                                 </div>
//                             </div>
//                         </li>
//                     );
//                 })}
//             </ul>
//             <br />
//             <div className="container">
//                 <Link to="/formulario">
//                     <button className="btn btn-dark">Nuevo multiplex</button>
//                 </Link>
//             </div>
//         </div >
//     );
// };


import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import LogoMoviesImage from '../../img/FondoMovieCine2.png';

export const Cadenas = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="row row-cols-1 row-cols-md-3 g-4">
            {store.cadenas.map((item, index) => (
                <div key={index} className="col">
                    <div className="card mt-4 mx-1" style={{ background: "#0d6efd" , border: "3px solid #ffffff"}}>
                        <img src={LogoMoviesImage} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{item.cinema}</h5>
                            <p className="card-text">
                                <strong>Cadena:</strong> {item.cadena} <br />
                                <strong>Ciudad:</strong> {item.ciudad} <br />
                                <strong>País:</strong> {item.pais}
                            </p>
                            <Link to={"/single/" + item.id} className="btn" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>
                                Ver Más
                            </Link>


                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            {/* <button className="btn" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }} fa fa-trash" type="button" onClick={() => actions.eliminarMultiplex(index)}></button> */}
                        <button
                            className="btn"
                            style={{
                                backgroundColor: '#0d6efd',
                                color: '#ffffff',
                                border: '1px solid #ffffff'
                            }}
                            onClick={() => actions.eliminarMultiplex(index)}
                        >
                            <i className="fa fa-trash"></i>
                        </button>
                        <Link to={"/editarMultiplex/" + item.id}>
                            <button className="btn"
                            style={{
                                backgroundColor: '#0d6efd',
                                color: '#ffffff',
                                border: '1px solid #ffffff'
                            }} >
                            <i className="fa fa-pencil"></i>
                            </button>
                        </Link>
                    </div>
                </div>
                </div>
    ))
}
<div className="col">

    <div className="card-body">
        <Link to="/formulario" className="btn" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>
            Nuevo multiplex
        </Link>

    </div>
</div>
        </div >
    );
};
