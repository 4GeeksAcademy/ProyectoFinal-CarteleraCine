import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";

export const Movies = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="moviePage container">
			{/* <Link to="/Add">
				<button className="mb-3 ms-2 mt-4 btn btn-dark" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>Crear nueva película</button>
			</Link> */}
			<div className="row g-4 d-flex flex-row mt-5">
				{store.movies.map((item, index) => {
					return (
						<div className="col" key={item.id}>
							<div className="card ms-1 mb-4" style={{ width: "200px", height: "470px", background: "black" }}>
								<img src={item.image_url} className="card-img-top" alt="..." />
								<div className="card-body">
									<Link to={"/movies/" + item.id}>
										<p className="lh-1">{item.name}</p>
									</Link>
									<p className="lh-1" style={{ fontSize: "12px" }}>{item.release_date}</p>
								</div>
								{store.auth === true ?
								<div className="card-footer">
									<Link to={"/Edit/" + item.id}>
										<button style={{ border: "none", background: "black" }}><FontAwesomeIcon icon={faPencil} style={{ fontSize: "12px" }} className="lh-1 pencil text-secondary" /></button>
									</Link>
									<button style={{ border: "none", background: "black" }} onClick={() => actions.deleteMovie(item.id)}><FontAwesomeIcon icon={faTrashCan} style={{ fontSize: "12px" }} className="lh-1 trash text-secondary" /></button>
								</div>
								: null}
							</div>
						</div>
					);
				})}
				{store.auth === true ?
				<Link to="/Add">
				<button className="mb-3 ms-2 mt-4 btn btn-dark" style={{ backgroundColor: '#0d6efd', color: '#ffffff', border: '1px solid #ffffff' }}>Crear nueva película</button>
				</Link> : null}
			</div>
		</div>
	);
};