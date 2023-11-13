import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Cadenas = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="container">
			<ul className="list-group">
				{store.cadenas.map((item, index) => {
					return (
						<li
							key={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }} >
							<Link to={"/single/" + index}>
								<span>Link to: {item.cadena}</span>
							</Link>
							<button>
								<i className="fa fa-trash" type="button" onClick={() => actions.eliminarMultiplex(index)} />
							</button>
							<button>
								<i className="fa-solid fa-pencil" type="button" onClick={() => actions.editarMultiplex(item.index)} />
							</button>
						</li>
					);
				})}
			</ul>
			<br />
			<div className="container">
				<Link to="/">
					<button className="btn btn-primary">Vuelve a multiplex</button>
				</Link>
			</div>

		</div>
	);
};
