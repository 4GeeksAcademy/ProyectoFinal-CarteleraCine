import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MovieForm = (props) => {

    const { store, actions } = useContext(Context);
    const params = useParams();
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [rating, setRating] = useState("");
    const [overview, setOverview] = useState("");

    const newMovie = { name: name, image_url: imageUrl, release_date: releaseDate, rating: rating, overview: overview };
    function saveButton(e) {
        console.log("save button")
        // e.preventDefault()
        if (props.opt == "add") {
            console.log("Add new movie")
            console.log(newMovie)
            console.log(imageUrl)
            return actions.createMovie(newMovie)
        }
        if (props.opt == "edit") {
            let requestOptions = {
                method: 'PUT',
                body: JSON.stringify(newMovie),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            fetch(`${process.env.BACKEND_URL}/api/${params.id}`, requestOptions)
                .then(response => response.json())
                .then(result => console.log(result))

        }
    }
    function searchMovie() {
        let requestOptions = {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxOGQ2YTc0NzcwYmUwZjgwYzliOWY2YTc2OGE0YiIsInN1YiI6IjY1M2ZmODFjNTA3MzNjMDBlMjRhZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bz1YACVZh6J9vBDp8p0bPsGlVpe5BZ-sowdWX5wBwdM"
            }
        };
        fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=es-ES&page=1&query=${name}`, requestOptions)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setName(data.results[0].title)
                setImageUrl(`https://www.themoviedb.org/t/p/w300_and_h450_bestv2` + data.results[0].poster_path)
                setReleaseDate(data.results[0].release_date)
                setRating(data.results[0].vote_average)
                setOverview(data.results[0].overview)

            });
    }

    useEffect(() => {
        actions.displayMovies(params.id)
        console.log(params.id)
    }, [])

    useEffect(() => {
        setName(store.current_movie?.name),
        setImageUrl(store.current_movie?.image_url)
        setReleaseDate(store.current_movie?.release_date),
        setRating(store.current_movie?.rating),
        setOverview(store.current_movie?.overview)

    }, [store.current_movie])

    return (
        <div className="container ">
            <form className="container" action="/movies">
                <h4 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Agregar película" : "Editar película"}</h4>
                <div className="mb-3 mx-5">
                    <label htmlFor="Name" className="form-label"><h5>Título</h5></label>
                    <input defaultValue={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" />
                </div>
                <div className="gap-2">
                    <button onClick={() => searchMovie()} type="button" className="btn btn-dark mx-5 mb-4">Buscar película</button>
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="ImageUrl" className="form-label"><h5>URL Imagen</h5></label>
                    <input defaultValue={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} type="text" className="form-control" />
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="ReleaseDate" className="form-label"><h5>Fecha de estreno</h5></label>
                    <input defaultValue={releaseDate} onChange={(e) => { setReleaseDate(e.target.value) }} type="text" className="form-control" />
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="Rating" className="form-label"><h5>Calificación</h5></label>
                    <input defaultValue={rating} onChange={(e) => { setRating(e.target.value) }} type="text" className="form-control" />
                </div>
                <div className="mb-3 mx-5">
                    <label htmlFor="Overview" className="form-label"><h5>Descripción</h5></label>
                    <input defaultValue={overview} onChange={(e) => { setOverview(e.target.value) }} type="text" className="form-control" />
                </div>
                <div className="gap-2">
                    <button onClick={() => saveButton()} className="btn btn-dark mx-5">Guardar</button>
                    <Link to="/movies" className="ms-5">
                        o volver a películas
                    </Link>
                </div>
            </form>
        </div>
    );
};