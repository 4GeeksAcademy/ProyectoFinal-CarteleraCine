
import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const [cinema, setCinema] = useState({});
	const params = useParams();
	useEffect (() => {
        fetch(`${process.env.BACKEND_URL}/api/multiplex/${params.theid}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setCinema(data)
        })
       
    }, [])
	return (
		<div className="container">
			<h1 className="display-4 mt-4 mb-4 d-flex justify-content-center">Esto muestra el cinema: {cinema.cinema}</h1>
			
			{store.showtimes.map((item, index) => {
					return (
					<div key={item.id} className="container">
                        <div>
                            {(item.multiplex_cinema == cinema.cinema) ? <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#movie" aria-expanded="false" aria-controls="collapseExample">{item.movie_name}</button> : null}
                        </div>
                        <div className="collapse" id="movie">
                            {(item.multiplex_cinema == cinema.cinema) ? <div className="card card-body d-grid gap-2 col-12 mx-auto"><button className="btn btn-light">{item.showtime}</button></div> : null}
                        </div>        
					</div>    
	)})}
			
			<Link to="/cadenas">
				<span className="btn btn-warning btn-lg mt-4 ms-3" href="#" role="button">
					Vuelve a la lista
				</span>
			</Link>
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};
