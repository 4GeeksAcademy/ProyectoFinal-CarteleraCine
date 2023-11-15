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
				</div>
			</div>
		</nav>
	);
};
