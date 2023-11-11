import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";

export const Movies = () => {
	const { store, actions } = useContext(Context);
	
	return (
		<div className="moviePage container">
					<h3 className="text-black ms-2 mb-4 mt-3">Now Playing Movies</h3>
					<Link to="/Add">
					<button className="mb-3 ms-2 btn btn-light">Create new movie</button>
					</Link>
					<div className="row g-4 d-flex flex-row">
							{store.movies.map((item, index) => {
								return (
										<div className="col" key={item.id}>
											<div className="card ms-1 mb-4" style={{width: "200px", height: "450px"}}>
												<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}  className="card-img-top" alt="..."/>
												<div className="card-body">
													<Link to={"/" + item.id}>
													<p className="lh-1">{item.title}</p>
													</Link>
													<p className="lh-1" style={{fontSize: "12px"}}>{item.release_date}</p>
												</div>
												<div className="card-footer">
													<Link to={"/Edit/"+ item.id}>
														<button style={{border: "none"}}><FontAwesomeIcon icon={faPencil} style={{fontSize: "12px"}} className="lh-1 pencil text-secondary"/></button>
													</Link>
													<button style={{border: "none"}} onClick={() => actions.deleteMovie(item.id)}><FontAwesomeIcon icon={faTrashCan} style={{fontSize: "12px"}} className="lh-1 trash text-secondary"/></button>
													
													{/* <button onClick={() => actions.displayFavorites(item.name)} className="btn btn-outline-warning"><FontAwesomeIcon icon={faHeart}/></button> */}
												</div>
											</div>
										</div>
										);
									})}
					</div>
				</div>
		);
		};