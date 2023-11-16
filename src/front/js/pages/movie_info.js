import React, { useState, useEffect, useContext}  from "react";
import { useParams } from "react-router-dom";

export const MovieInfo = () => {
    const [movie, setMovie] = useState({});
    const params = useParams();
    console.log(params)
    console.log(params.movie_id)

    useEffect (() => {
        
        fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/" + params.movie_id)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setMovie(data)
        })
    }, [])

		return (
            <div className="container">
                <div className="row mt-5" key={movie.id}>
                    <div className="col-4">
                        <img src={movie.image_url}  className="card-img-top" style={{width: "300px", height: "450px"}} alt="..."/>
                    </div>
                    <div className="col-8">
                        <h2>{movie.name}</h2>
                        <p>{movie.release_date}</p>
                        <p className="fst-italic">User Score: </p>
                        <p className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center fs-3" style={{width: "70px", height: "70px"}}>{movie.rating}</p>
                        <h5>Overview</h5>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
			
										
        )}