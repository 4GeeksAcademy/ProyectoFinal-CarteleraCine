import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const SearchMovies = () => {
	
    const [searchInput, setSearchInput] = useState("");
	const [movieData, setMovieData] = useState([]);

	function searchButton () {
			
		let requestOptions = {
			method: 'GET',
			body: JSON.stringify(),
			headers: {
				"Accept": "application/json",
				"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxOGQ2YTc0NzcwYmUwZjgwYzliOWY2YTc2OGE0YiIsInN1YiI6IjY1M2ZmODFjNTA3MzNjMDBlMjRhZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bz1YACVZh6J9vBDp8p0bPsGlVpe5BZ-sowdWX5wBwdM"
			}
			};

		fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${searchInput}`, requestOptions)
			.then(res => res.json())
			.then((data) => {
				console.log(data)
				setMovieData(data.results)
			});
		
	};
	function handleSubmit(e) {
		e.preventDefault();
		console.log('You clicked submit.');
	  }

	return (
		<div className="moviePage container">
					<h3 className="text-black ms-2 mb-4 mt-3">Movie Search</h3>
					<div className="row g-4 d-flex flex-row">
					<form onSubmit={handleSubmit} className="d-flex" role="search">
						<input value={searchInput} onChange={(e) => {setSearchInput(e.target.value)}} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
						<button onClick={() => searchButton()} className="btn btn-outline-success" type="submit">Search</button>
					</form>
							{movieData.map((item, index) => {
								return (
										<div className="col" key={item.id}>
											<div className="card ms-1 mb-4" style={{width: "200px", height: "450px"}}>
												<img src={item.poster_path ? `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}` : `https://firebasestorage.googleapis.com/v0/b/movie-theaters-92b7e.appspot.com/o/images%2FPhoto%20not%20available.webp?alt=media&token=b712ab2a-5488-4d49-b0a7-e71c3a233c5c`}  className="card-img-top" alt="..."/>
												<div className="card-body">
													<Link to={"/" + item.id}>
													<p className="lh-1">{item.title}</p>
													</Link>
													<p className="lh-1" style={{fontSize: "12px"}}>{item.release_date}</p>
												</div>
											</div>
										</div>
										);
									})}
					</div>
				</div>
		);
		};

