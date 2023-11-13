
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import "../../styles/home.css";

export const Multiplex = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="list-group">
				<div className="list-group-item list-group-item-action">
					<h5 className="mb-1">Heredia</h5>
					<div className="btn-group-vertical">
						<Link to="/">
							<button type="button" className="btn btn-link">Cinemark</button>
						</Link>
						<Link to="/">
							<button type="button" className="btn btn-link">Cinepolis</button>
						</Link>	
					</div>
				</div>
				<div className="list-group-item list-group-item-action">
					<h5 className="mb-1">Medellin</h5>
					<div className="btn-group-vertical">
						<Link to="/">
							<button type="button" className="btn btn-link">CineColombia</button>
						</Link>
						<Link to="/">
							<button type="button" className="btn btn-link">Procinal</button>
						</Link>		
					</div>
				</div>
			</div>
			<div>
				<Link to="/formulario">
					<button className="btn btn-primary">New multiplex</button>
				</Link>
			</div>
			<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
		</div>
	);
};
