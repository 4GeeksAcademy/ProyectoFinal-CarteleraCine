import React, {useContext, useState, useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MovieForm = (props) => {

        const { store, actions } = useContext(Context);
        const params = useParams();
        const [name, setName] = useState("");
        const [releaseDate, setReleaseDate] = useState("");
        const [rating, setRating] = useState("");
        const [overview, setOverview] = useState("");
        const [imageUrl, setImageUrl] = useState("");
        const newMovie = {name: name, release_date: releaseDate, rating: rating, overview: overview, image_url: imageUrl };
        function saveButton () {
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
        
        useEffect (()=> {
            actions.displayMovies(params.id)
            console.log(params.id)
        }, [])

        useEffect (()=> {
            setName(store.current_movie?.name),
            setReleaseDate(store.current_movie?.release_date),
            setRating(store.current_movie?.rating),
            setOverview(store.current_movie?.overview)
            setImageUrl(store.current_movie?.image_url)
        }, [store.current_movie])
    
	return (
		<form action="/">
			<h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Add a new movie" : "Edit movie"}</h1>
			<div className="mb-3 mx-5">
                <label htmlFor="Name" className="form-label">Name</label>
                <input defaultValue= {name} onChange={(e) => {setName(e.target.value)}} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="ReleaseDate" className="form-label">Release Date</label>
                <input defaultValue= {releaseDate} onChange={(e) => {setReleaseDate(e.target.value)}} type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="Rating" className="form-label">Rating</label>
                <input defaultValue= {rating} onChange={(e) => {setRating(e.target.value)}} type="text" className="form-control"  />
            </div>
			<div className="mb-3 mx-5">
                <label htmlFor="Overview" className="form-label">Overview</label>
                <input defaultValue= {overview} onChange={(e) => {setOverview(e.target.value)}} type="text" className="form-control"  />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="ImageUrl" className="form-label">Image URL</label>
                <input defaultValue={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} type="text" className="form-control" />
            </div>
			<div className="d-grid gap-2">
                <button onClick={() => saveButton()} className="btn btn-primary mx-5 mt-3">Save</button>
				<Link to="/" className="ms-5">
					or get back to movies
				</Link>
			</div>
        </form>
	);
};