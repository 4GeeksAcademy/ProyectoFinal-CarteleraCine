import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Now playing movies</span>
				</Link>
				<Link to="/upcoming_movies">
					<span className="navbar-brand mb-0 h1">Upcoming movies</span>
				</Link>
				<div className="ml-auto">
					<Link to="/movie_search">
						<button className="btn btn-primary">Search</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};