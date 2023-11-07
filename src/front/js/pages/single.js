import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();

	return (
		<div className="jumbotron">
			<h1 className="display-4">Esto muestra el cinema: {store.cadenas[params.theid].cinema}</h1>
			<img src={rigoImageUrl} />
			<hr className="my-4" />

			<Link to="/cadenas">
				<span className="btn btn-primary btn-lg" href="#" role="button">
					Vuelve a la lista
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
