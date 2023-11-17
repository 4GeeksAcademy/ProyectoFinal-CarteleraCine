import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Navbar = () => {
	const { store } = useContext(Context)
	console.log(store.user?.email);

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
				<Link to="/login">
					<button className="btn btn-warning">Login </button>
				</Link>
				<Link to="/login">
					<button className="btn btn-warning "
						onClick={() => localStorage.clear()}>
						<h6>{store.user?.email}</h6>Logout
					</button>
				</Link>
			</div>
		</nav>
	);
};
