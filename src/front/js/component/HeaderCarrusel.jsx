import React, { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";
import { Movies } from "../pages/movies";

const HeaderCarrusel = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [selectedPosterIndex, setSelectedPosterIndex] = useState(null);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        
        const discoverMoviesUrl = `${process.env.BACKEND_URL}/api/movies`;

        fetch(discoverMoviesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching movies');
                }
                return response.json();
            })
            .then(data => {
                setMovies(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleMovieHover = (index) => {
        if (!isClicking) {
            setSelectedPosterIndex(index);
        }
    };

    const handleMovieClick = (movie, index) => {
        setSelectedMovie(movie);
        setSelectedPosterIndex(index);
        setIsClicking(true);
    };

    const handleMouseLeave = () => {
        if (!isClicking) {
            setSelectedPosterIndex(null);
        }
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
        setIsClicking(false);
    };



    if (loading) {
        return <p>Cargando...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            <div className={style.carouselContainer}>
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {movies.slice(0, 2).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {movies.slice(0, 2).map((movie, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="d-flex justify-content-around align-items-center">
                                    {movies.slice(index * 4, index * 4 + 4).map((movieSlice, i) => (
                                        <img
                                            key={i}
                                            src={movieSlice.image_url}
                                            className={`d-block w-25 me-3 ${index * 4 + i === selectedPosterIndex
                                                ? `${style.selectedPoster}`
                                                : `${style.posterHover}`
                                                }`}
                                            alt={`Slide ${index + 1}`}
                                            onMouseEnter={() => handleMovieHover(index * 4 + i)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => handleMovieClick(movieSlice, index * 4 + i)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}

                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            {/* Mostrar detalles de la película seleccionada
            {selectedMovie && (
                <div className={`${style.movieDetails} carousel-item active d-flex justify-content-center align-items-center`}>
                    <img
                        src={movies.image_url}
                        className="d-block w-25"
                        alt={`Slide ${movies.length + 1}`}
                        onClick={handleCloseDetails}
                        style={{ cursor: 'pointer' }}
                    />
                    <div className="container text-white text-center ms-3">
                        <h1 className="display-4 font-weight-bold">{movies.name}</h1>
                        <p className="lead">{movies.overview}</p>
                        <button className={`${style.button} ms-5`} onClick={handleCloseDetails}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-door-closed" viewBox="0 0 16 16">
                                <path d="M3 2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2zm1 13h8V2H4v13z" />
                                <path d="M9 9a1 1 0 1 0 2 0 1 1 0 0 0-2 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )} */}

        </div>
    )
};

export default HeaderCarrusel