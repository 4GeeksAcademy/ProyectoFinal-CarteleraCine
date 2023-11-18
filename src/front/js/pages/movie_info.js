import React, { useState, useEffect, useContext}  from "react";
import { useParams } from "react-router-dom";

export const MovieInfo = () => {
    const [movie, setMovie] = useState({});
    const params = useParams();
    console.log(params)
    console.log(params.movie_id)

    useEffect (() => {
        fetch(`${process.env.BACKEND_URL}/api/movies/${params.movie_id}`)
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
                    <div className="col-8 mt-5">
                        <h2>{movie.name}</h2>
                        <p>Fecha de estreno: {movie.release_date}</p>
                        <p className="fst-italic">Calificación: </p>
                        <p className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center fs-3" style={{width: "70px", height: "70px"}}>{movie.rating}</p>
                        <h5>Descripción</h5>
                        <p>{movie.overview}</p>
                    </div>
                </div>
            </div>
			
										
        )}