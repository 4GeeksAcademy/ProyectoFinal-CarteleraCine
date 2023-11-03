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
                        redirect: 'follow',
                        body: JSON.stringify(newMovie),
                        headers: {
                                    "Content-Type": "application/json"
                                }
                            };
                      
                       fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/movies/" + params.id, requestOptions)
                        .then(response => response.json())
                        .then(result => console.log(result))
                
            }
        }
        
        useEffect (()=> {
            actions.loadSomeData(params.id)
        }, [])

        useEffect (()=> {
            setName(store.current_movie?.name),
            setReleaseDate(store.current_movie?.releaseDate),
            setRating(store.current_contact?.rating),
            setOverview(store.current_contact?.overview)
            setImageUrl(store.current_contact?.imageUrl)
        }, [store.current_movie])
    
	return (
		<form action="/">
			<h1 className="d-flex justify-content-center mt-5">{props.opt == "add" ? "Add a new movie" : "Edit movie"}</h1>
			<div className="mb-3 mx-5">
                <label htmlFor="name" className="form-label">Name</label>
                <input value= {name} onChange={(e) => {setName(e.target.value)}} name="Name" type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="releaseDate" className="form-label">Release Date</label>
                <input value= {releaseDate} onChange={(e) => {setReleaseDate(e.target.value)}} name="releaseDate" type="text" className="form-control" />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="rating" className="form-label">Rating</label>
                <input value= {rating} onChange={(e) => {setRating(e.target.value)}} name="Rating" type="text" className="form-control"  />
            </div>
			<div className="mb-3 mx-5">
                <label htmlFor="overview" className="form-label">Overview</label>
                <input value= {overview} onChange={(e) => {setOverview(e.target.value)}} name="Overview" type="text" className="form-control"  />
            </div>
            <div className="mb-3 mx-5">
                <label htmlFor="imageUrl" className="form-label">Image URL</label>
                <input value={imageUrl} onChange={(e) => {setImageUrl(e.target.value)}} name="image_url" type="text" className="form-control" />
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