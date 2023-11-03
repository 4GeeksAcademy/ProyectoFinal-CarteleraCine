import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Context } from "../store/appContext";

export const Movies = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="moviePage container">
					<h3 className="text-black ms-3 mb-4 mt-3">Now Playing Movies</h3>
					<Link to="/Add">
					<button className="mb-3 ms-2 btn btn-success">Create new movie</button>
					</Link>
					<div className="row g-4 d-flex flex-row">
							{store.movies.map((item, index) => {
								return (
										<div className="col" key={item.id}>
											<div className="card ms-1 mb-4" style={{width: "200px", height: "440px"}}>
												<img src={item.image_url}  className="card-img-top" alt="..."/>
												<div className="card-footer">
													<Link to={"/" + item.id}>
													<p className="me-3">{item.name}</p>
													</Link>
													<p style={{fontSize: "12px"}}>{item.release_date}</p>
													<Link to={"/Edit/"+ item.id}>
														<button style={{border: "none"}}><FontAwesomeIcon icon={faPencil} style={{fontSize: "12px"}} className="pencil text-secondary"/></button>
													</Link>
													<button style={{border: "none"}} onClick={() => actions.deleteMovie(item.id)}><FontAwesomeIcon icon={faTrashCan} style={{fontSize: "12px"}} className="trash text-secondary"/></button>
													
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