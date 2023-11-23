import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate()
	// console.log(store.user?.email);

	function handleLogout() {
		actions.logout()
		navigate("/cadenas")
	}
	
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
					{/* <button className="btn btn-warning">Login </button> */}
					{store.auth === false? <button className="btn btn-warning ">Login</button> : null}
				</Link>
				{store.auth === true ? 
				<button className="btn btn-warning "  onClick={() => handleLogout()} >
					<h6>{store.user?.name}</h6>
					Logout
				</button> : null}
				{/* <Link to="/login">
					<button className="btn btn-warning "
						onClick={() => localStorage.clear()}>
						<h6>{store.user?.name}</h6>Logout
					</button>
				</Link> */}
			</div>
		</nav>
	);
};
