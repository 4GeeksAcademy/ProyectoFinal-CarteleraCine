import React, { useState, useEffect, useContext}  from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const MovieInfo = () => {
    const { store, actions } = useContext(Context);
    const [movie, setMovie] = useState({});
    const [paseo, setPaseo] = useState([]);
    const [oxigeno, setOxigeno] = useState([]);
    const [molinos, setMolinos] = useState([]);
    const [santaFe, setSantaFe] = useState([]);
    const [florida, setFlorida] = useState([]);
    const [aventura, setAventura] = useState([]);
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
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/1`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setPaseo(data)
        })
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/2`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setOxigeno(data)
        })
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/3`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setMolinos(data)
        })
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/4`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setSantaFe(data)
        })
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/5`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setFlorida(data)
        })
        fetch(`${process.env.BACKEND_URL}/api/showtimes/movie/${params.movie_id}/multiplex/6`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setAventura(data)
        })
    }, [])

		return (
            <div className="container">
                <div className="row mt-5" key={movie.id}>
                    <div className="col-4">
                        <img src={movie.image_url}  className="card-img-top mb-5" style={{width: "300px", height: "450px"}} alt="..."/>
                    </div>
                    <div className="col-8 mt-5 mb-5">
                        <h2>{movie.name}</h2>
                        <p>Fecha de estreno: {movie.release_date}</p>
                        <p className="fst-italic">Calificación: </p>
                        <p className="rounded-circle bg-info text-white d-flex justify-content-center align-items-center fs-3" style={{width: "70px", height: "70px"}}>{movie.rating}</p>
                        <h5>Descripción</h5>
                        <p>{movie.overview}</p>
                    </div>
                    <div className="">
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#paseo" aria-expanded="false" aria-controls="collapseExample">
                                Cinépolis Paseo de las Flores Heredia
                            </button>
                        </div>
                        <div className="collapse" id="paseo">
                            <div className="card card-body d-grid gap-4 d-md-block col-12 mx-auto">
                                {paseo.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#oxigeno" aria-expanded="false" aria-controls="collapseExample">
                                Cinemark Oxígeno Heredia
                            </button>
                        </div>
                        <div className="collapse" id="oxigeno">
                            <div className="card card-body d-grid gap-4 d-md-block col-12 mx-auto">
                                {oxigeno.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#molinos" aria-expanded="false" aria-controls="collapseExample">
                                CineColombia Molinos Medellín
                            </button>
                        </div>
                        <div className="collapse" id="molinos">
                            <div className="card card-body d-grid gap-2 col-12 mx-auto">
                                {molinos.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#santaFe" aria-expanded="false" aria-controls="collapseExample">
                                CineColombia Santa Fe Medellín
                            </button>
                        </div>
                        <div className="collapse" id="santaFe">
                            <div className="card card-body d-grid gap-2 col-12 mx-auto">
                                {santaFe.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#florida" aria-expanded="false" aria-controls="collapseExample">
                                Procinal Florida Medellín
                            </button>
                        </div>
                        <div className="collapse" id="florida">
                            <div className="card card-body d-grid gap-2 col-12 mx-auto">
                                {florida.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                        <div>
                            <button className="btn btn-info p-3 mb-1 d-grid gap-2 col-12 mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#aventura" aria-expanded="false" aria-controls="collapseExample">
                                Procinal Aventura Medellín
                            </button>
                        </div>
                        <div className="collapse mb-5" id="aventura">
                            <div className="card card-body d-grid gap-2 col-12 mx-auto">
                                {aventura.map(showtime => (<button className="btn btn-light" key={showtime.id}>{showtime.showtime}</button>))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
			
										
        )}