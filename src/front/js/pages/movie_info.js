import React, { useState, useEffect, useContext}  from "react";
import { useParams } from "react-router-dom";

import { Context } from "../store/appContext";

export const MovieInfo = () => {
   
    const params = useParams();
    const [movie, setMovie] = useState({})
    console.log(params)
    console.log(params.movie_id)

    useEffect (() => {
        let requestOptions = {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxOGQ2YTc0NzcwYmUwZjgwYzliOWY2YTc2OGE0YiIsInN1YiI6IjY1M2ZmODFjNTA3MzNjMDBlMjRhZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bz1YACVZh6J9vBDp8p0bPsGlVpe5BZ-sowdWX5wBwdM"
            }
            };

        fetch("https://api.themoviedb.org/3/movie/" + params.movie_id, requestOptions)
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
                            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}  className="card-img-top" style={{width: "300px", height: "450px"}} alt="..."/>
                        </div>
                        <div className="col-8">
                            <h2>{movie.title}</h2>
                            <p>{movie.release_date}</p>
                            <p className="fst-italic">Vote Average</p>
                            <p className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center fs-3" style={{width: "70px", height: "70px"}}>{movie.vote_average}</p>
                            <h5>Overview</h5>
                            <p>{movie.overview}</p>
                        </div>
                    </div>
                </div>
						
        )};