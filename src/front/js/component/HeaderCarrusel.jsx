import React, { useState, useEffect } from "react";
import style from "../../styles/Home.module.css";

const HeaderCarrusel = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        const apiKey = 'ea088d978fc6da3b4fda0c9a6fb0532e';
        const baseApiUrl = 'https://api.themoviedb.org/3';
        const discoverMoviesUrl = `${baseApiUrl}/discover/movie?api_key=${apiKey}&page=1`;

        fetch(discoverMoviesUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching movies');
                }
                return response.json();
            })
            .then(data => {
                setMovies(data.results);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseDetails = () => {
        setSelectedMovie(null);
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
                        {movies.slice(0, 4).map((_, index) => (
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
                        {movies.slice(0, 4).map((movie, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <div className="d-flex justify-content-around align-items-center">
                                    {movies.slice(index * 4, index * 4 + 4).map((movieSlice, i) => (
                                        <img
                                            key={i}
                                            src={`https://image.tmdb.org/t/p/w200${movieSlice.poster_path}`}
                                            className="d-block w-25 me-3" // Agrega un margen derecho (me-3)
                                            alt={`Slide ${index + 1}`}
                                            onClick={() => handleMovieClick(movieSlice)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))}
                                    {/* {movies.slice(index * 4, index * 4 + 4).map((movieSlice, i) => (
                                        <img
                                            key={i}
                                            src={`https://image.tmdb.org/t/p/w200${movieSlice.poster_path}`}
                                            className={`d-block w-25 me-3 ${style.blackAndWhiteImg}`} // Agrega la nueva clase aquí
                                            alt={`Slide ${index + 1}`}
                                            onClick={() => handleMovieClick(movieSlice)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ))} */}
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

            {/* Mostrar detalles de la película seleccionada */}
            {selectedMovie && (
                <div className={`${style.movieDetails} carousel-item active`}>
                    <div className="d-flex justify-content-center align-items-center">
                        <img
                            src={`https://image.tmdb.org/t/p/w200${selectedMovie.poster_path}`}
                            className="d-block w-25"
                            alt={`Slide ${movies.length + 1}`}
                            onClick={handleCloseDetails}
                            style={{ cursor: 'pointer' }}
                        />
                        <div className="container text-white text-center">
                            <h1 className="display-4 font-weight-bold">{selectedMovie.title}</h1>
                            <p className="lead">{selectedMovie.overview}</p>
                            <button className={`${style.button} ms-5`} onClick={handleCloseDetails}>
                                Cerrar detalles
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeaderCarrusel;
