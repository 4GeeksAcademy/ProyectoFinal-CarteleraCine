import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const City = () => {
	const { store, actions } = useContext(Context);

	const [newCity, setNewCity] = useState({
		name: "",
		image: ""
	});

	const addCity = () => {
		actions.addCity({
			name: newCity.name,
			image: newCity.image
		});
		setNewCity({
			name: "",
			image: ""
		});
	};

	return (
		<div className="text-center mt-4 p-2 mx-2">
			<div>
				<h2>Nueva Ciudad</h2>
				<input
					className="mx-2"
					type="text"
					placeholder="Nombre"
					value={newCity.name}
					onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
				/>
				<input
					className="mx-2"
					type="text"
					placeholder="imagen"
					value={newCity.image}
					onChange={(e) => setNewCity((prevCity) => ({ ...prevCity, image: e.target.value }))}
				/>

				<button className="btn btn-warning" onClick={addCity}>Agregar Ciudad</button>
			</div>

			<div>
				{/* <h2>Ciudades:</h2> */}

				<ul>
				<br />
					{store.City.map((city, index) => (

						<li className="container text-center" style={{ width: '40%', height: '30%' , listStyleType: 'none' }} key={index}>
						<div className="row">
						<div className="col align-self-center mb-2 fw-bold">
						<br />
							{city.name}
							
						</div>
						</div>
						<div className="row mt-2">
							<img div className="col align-self-center mt-2"src={city.image}  style={{ width: '40%', height: '30%' }} alt={city.name} />
						</div>
						
					</li>
					))}
				</ul>
			</div>

			<br />
			<Link to="/">
				<div className="d-grid gap-2 d-md-block">
					<button className="btn btn-warning" type="button">Ir a la página principal</button>
				</div>
			</Link>
		</div>
	);
};
