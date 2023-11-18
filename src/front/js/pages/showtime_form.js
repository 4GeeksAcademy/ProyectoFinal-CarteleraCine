import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ShowtimeForm = (props) => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [movieName, setMovieName] = useState("");
    const [cinema, setCinema] = useState("");
    const [showtime, setShowtime] = useState("");
    const newShowtime = { movie_name: movieName, multiplex_cinema: cinema, showtime: showtime };
    function saveButton() {
        if (props.opt == "add") {
            console.log("IS THIS WORKING")
            console.log(newShowtime)
            
            return actions.createShowtime(newShowtime)
        }
        if (props.opt == "edit") {
            let requestOptions = {
                method: 'PUT',
                body: JSON.stringify(newShowtime),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            fetch(`${process.env.BACKEND_URL}/api/showtimes/${params.id}`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))

        }
    }

    useEffect(() => {
        actions.displayShowtimes(params.id)
        console.log(params.id)
        
    }, [])


    return (
        <form className="container" action="/showtimes">
            <h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Agregar horario" : "Editar horario"}</h1>
            <select className="form-select" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} >
                <option selected>Peliculas</option>
                {store.movies.map(movie => (<option key={movie.id}>{movie.name}</option>))};
            </select>
            <select className="form-select" value={cinema} onChange={(e) => { setCinema(e.target.value) }} >
                <option selected>Cinemas</option>
                {store.cadenas.map(multiplex => (<option key={multiplex.id}>{multiplex.cinema}</option>))};
            </select>
            <select className="form-select" value={showtime} onChange={(e) => { setShowtime(e.target.value) }} >
                <option selected>Horarios</option>
                <option >14:00</option>
                <option>16:00</option>
                <option>18:00</option>
                <option>20:00</option>
            </select>
            <div className="gap-2 mt-4">
                <button onClick={() => saveButton()} className="btn btn-warning mx-5">Guardar</button>
                <Link to="/showtimes" className="ms-5">
                    volver a horarios
                </Link>
            </div>
        </form>
    );
};