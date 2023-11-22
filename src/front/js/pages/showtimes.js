import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";

export const Showtimes = () => {
	const { store, actions } = useContext(Context);
	

	return (
		<div className="showtimePage container">
			<h3 className="text-black ms-2 mb-4 mt-3">Cartelera</h3>
			<Link to="/AddShowtime">
				<button className="mb-3 btn btn-warning">Crear nuevo horario</button>
			</Link>
			<div className="row g-4 d-flex flex-row">
				{store.showtimes.map((item, index) => {
					return (
						<div className="col" key={item.id}>
							
							<div>
								<h4>{item.movie_name}</h4>
								<p>{item.multiplex_cinema}</p>
								<p>{item.showtime}</p>
							</div>
							<div>
								<Link to={"/EditShowtime/" + item.id}>
									<button style={{ border: "none", backgroundColor: "white" }}><FontAwesomeIcon icon={faPencil} style={{ fontSize: "12px" }} className="lh-1 pencil text-secondary" /></button>
								</Link>
								<button style={{ border: "none", backgroundColor: "white" }} onClick={() => actions.deleteShowtime(item.id)}><FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "12px" }} className="lh-1 trash text-secondary" /></button>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};