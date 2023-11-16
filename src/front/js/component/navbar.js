import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div className="ml-auto">
					<Link to="/cadenas">
						<button className="btn btn-warning">Ir a multiplex</button>
					</Link>
					<div className="container-fluid">
						<Link to="/">
							<span className="navbar-brand mb-0 h1">AFE Movies</span>
						</Link>
						<div className="ml-auto">
							<Link to="/showtimes">
								<button className="btn btn-secondary">Showtimes</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
