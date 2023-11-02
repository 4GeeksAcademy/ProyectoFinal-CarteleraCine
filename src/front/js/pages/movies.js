import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Movies = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="moviePage container-fluid">
					<h3 className="text-black ms-3 mb-4 mt-3">Now Playing Movies</h3>
					<div className="row g-4 d-flex flex-row">
							{store.movies.map((item, index) => {
								return (
										<div className="col" key={item.id}>
											<div className="card ms-1 mb-4" style={{width: "200px", height: "420px"}}>
												<img src={item.image_url}  className="card-img-top" alt="..."/>
												<div className="card-footer">
													<Link to={"/movies/" + item.id}>
													<p className="me-3">{item.name}</p>
													</Link>
													<p>{item.release_date}</p>
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