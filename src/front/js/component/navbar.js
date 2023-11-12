import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Movie Theaters Colombia & Costa Rica</span>
				</Link>
				<div className="ml-auto">
					<Link to="/movie_search">
						<button className="btn btn-secondary">Search</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};