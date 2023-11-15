import React, { useState, useEffect, useContext } from "react";
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
							< div >
								<h4>{item.ciudad}</h4>
								<br />
								{"Cinema: " + item.cinema}
								<br />
								{"Cadena: " + item.cadena}
								<br />
								{item.pais}
								<br />
								<Link to={"/single/" + index}>
									<span>{"Ver Más"}</span>
								</Link>
							</div >
							<div className="list-group-item d-flex justify-content-end">
								<button>
									<i className="fa fa-trash" type="button" onClick={() => actions.eliminarMultiplex(index)} />
								</button>
								<Link to={"/editarMultiplex/"+ item.id} >
									<button >
										<i className="fa fa-pencil" type="button" 
										// onClick={() => actions.editarMultiplex(item.index)} 
										/>
									</button>
								</Link>
							</div>
						</li>
					);
				})}
			</ul>
			<br />
			<div className="container">
				<Link to="/formulario">
					<button className="btn btn-primary">Nuevo multiplex</button>
				</Link>
			</div>

		</div >
	);
};
