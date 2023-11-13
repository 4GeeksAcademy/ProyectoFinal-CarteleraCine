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
							<button className="icon-button" onClick={() => (city.name)}>
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
  </svg>
</button>


							
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
