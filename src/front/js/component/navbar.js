import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Go to home</span>
				</Link>
				<div className="ml-auto">
					<Link to="/City">
						<button className="btn btn-primary">New City</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
