import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ShowtimeForm = (props) => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [movieName, setMovieName] = useState("");
    const [multiplexCinema, setMultiplexCinema] = useState("");
    const [showtime, setShowtime] = useState([]);
    const newShowtime = { movie_name: movieName, multiplex_cinema: multiplexCinema, showtime: showtime };
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

    const handleChange = (e) => {
        // Destructuring
        const { value, checked } = e.target;
 
        console.log(`${value} is ${checked}`);
 
        // Case 1 : The user checks the box
        if (checked) {
            setShowtime ([...showtime, value]);
        }
 
        // Case 2  : The user unchecks the box
        else {
            setShowtime([
                showtime.filter(
                    (e) => e !== value
                )
                ]);
        }
    };


    return (
        <form className="container" action="/showtimes">
            <h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Agregar horario" : "Editar horario"}</h1>
            <select className="form-select" value={movieName} onChange={(e) => { setMovieName(e.target.value) }} >
                <option value="Peliculas">Peliculas</option>
                {store.movies.map(movie => (<option key={movie.id}>{movie.name}</option>))};
            </select>
            <select className="form-select" value={multiplexCinema} onChange={(e) => { setMultiplexCinema(e.target.value) }} >
                <option value="Cinemas">Cinemas</option>
                {store.cadenas.map(multiplex => (<option key={multiplex.id}>{multiplex.cinema}</option>))};
            </select>
            <div className="ms-2 mt-3">
                <p>Horarios:</p>
            </div>
            <div className="d-flex">
                <div className="form-check ms-2 me-4">
                    <input className="form-check-input" type="checkbox" value="13:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        13:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="14:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        14:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="15:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        15:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="16:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        16:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="17:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        17:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="18:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        18:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="19:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        19:00
                    </label>
                </div>
                <div className="form-check me-4">
                    <input className="form-check-input" type="checkbox" value="20:00" onChange={handleChange} id="showtime"/>
                    <label className="form-check-label" htmlFor="showtime">
                        20:00
                    </label>
                </div>
            </div>
            <div className="gap-2 mt-4">
                <button onClick={() => saveButton()} className="btn btn-dark mx-5">Guardar</button>
                <Link to="/showtimes" className="ms-5">
                    volver a horarios
                </Link>
            </div>
        </form>
    );
};