import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/home">
					<span className="navbar-brand mb-0 h1"> </span>
				</Link>
				<div className="ml-auto">
					<Link to="/City">
						<button className="btn btn-primary">Cities</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
