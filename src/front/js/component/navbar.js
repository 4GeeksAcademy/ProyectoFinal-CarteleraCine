import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/movies">
					<button className="btn btn-warning">AFE Movies</button>
				</Link>
				<div className="ml-auto">
					<Link to="/showtimes">
						<button className="btn btn-warning">Showtimes</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/cadenas">
						<button className="btn btn-warning">Ver Multiplex</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
