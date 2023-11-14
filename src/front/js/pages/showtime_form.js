import React, {useContext, useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ShowtimeForm = (props) => {

        const { store, actions } = useContext(Context);
        const params = useParams();
        const [movieName, setMovieName] = useState("");
        const [showtime, setShowtime] = useState("");
        const [imageUrl, setImageUrl] = useState("");
        const newShowtime = {movie_name: movieName, showtime: showtime, image_url: imageUrl};
        function saveButton () {
            if (props.opt == "add") {
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
                      
                       fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/showtimes/" + params.id, requestOptions)
                        .then(response => response.json())
                        .then(result => console.log(result))
                
            }
        }
        function searchMovie () {
            let requestOptions = {
                method: 'GET',
                body: JSON.stringify(),
                headers: {
                    "Accept": "application/json",
                    "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxOGQ2YTc0NzcwYmUwZjgwYzliOWY2YTc2OGE0YiIsInN1YiI6IjY1M2ZmODFjNTA3MzNjMDBlMjRhZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bz1YACVZh6J9vBDp8p0bPsGlVpe5BZ-sowdWX5wBwdM"
                }
                };
    
            fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${movieName}`, requestOptions)
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    setMovieName(data.results[0].title)
                    setImageUrl(`https://www.themoviedb.org/t/p/w300_and_h450_bestv2` + data.results[0].poster_path)
                });
        }

        useEffect (()=> {
            actions.displayShowtimes(params.id)
            console.log(params.id)
        }, [])

        useEffect (()=> {
            setMovieName(store.current_showtime?.movie_name),
            setShowtime(store.current_showtime?.showtime),
            setImageUrl(store.current_showtime?.image_url)
        }, [store.current_showtime])
    
	return (
		<form className="container" action="/showtimes">
			<h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Add a new showtime" : "Edit showtime"}</h1>
			<div className="mb-3 mx-5">
                <label htmlFor="MovieName" className="form-label">Movie Name</label>
                <input defaultValue= {movieName} onChange={(e) => {setMovieName(e.target.value)}} type="text" className="form-control" />
            </div>
            <div className="gap-2">
                <button onClick={() => searchMovie()} type="button" className="btn btn-primary mx-5 mb-4">Search movie</button>
			</div>
            <div className="mb-3 mx-5">
                <label htmlFor="Showtime" className="form-label">Showtime</label>
                <input defaultValue= {showtime} onChange={(e) => {setShowtime(e.target.value)}} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="ImageUrl" className="form-label">Image URL</label>
                <input defaultValue={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} type="text" className="form-control" />
            </div>
			<div className="gap-2">
                <button onClick={() => saveButton()} className="btn btn-primary mx-5">Save</button>
				<Link to="/showtimes" className="ms-5">
					or get back to showtimes
				</Link>
			</div>
        </form>
	);
};