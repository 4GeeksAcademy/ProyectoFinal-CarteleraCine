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
    function saveButton() {
        if (props.opt == "add") {
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

            fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/" + params.id, requestOptions)
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

        fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${name}`, requestOptions)
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
        <form className="container" action="/">
            <h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Add a new movie" : "Edit movie"}</h1>
            <div className="mb-3 mx-5">
                <label htmlFor="Name" className="form-label">Name</label>
                <input defaultValue={name} onChange={(e) => { setName(e.target.value) }} type="text" className="form-control" />
            </div>
            <div className="gap-2">
                <button onClick={() => searchMovie()} type="button" className="btn btn-primary mx-5 mb-4">Search movie</button>
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="ImageUrl" className="form-label">Image URL</label>
                <input defaultValue={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="ReleaseDate" className="form-label">Release Date</label>
                <input defaultValue={releaseDate} onChange={(e) => { setReleaseDate(e.target.value) }} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="Rating" className="form-label">Rating</label>
                <input defaultValue={rating} onChange={(e) => { setRating(e.target.value) }} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="Overview" className="form-label">Overview</label>
                <input defaultValue={overview} onChange={(e) => { setOverview(e.target.value) }} type="text" className="form-control" />
            </div>
            <div className="gap-2">
                <button onClick={() => saveButton()} className="btn btn-primary mx-5">Save</button>
                <Link to="/" className="ms-5">
                    or get back to movies
                </Link>
            </div>
        </form>
    );
};