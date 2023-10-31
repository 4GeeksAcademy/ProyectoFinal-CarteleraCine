import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Movies = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="moviePage container-fluid">
					<h3 className="text-black ms-3 mb-4 mt-3">Now Playing Movies</h3>
					<div className="row g-4 d-flex flex-row flex-nowrap" style={{overflowX: "auto"}} >
							{/* {store.movies.map((item, index) => {
								return ( */}
										<div className="col">
											<div className="card ms-1 mb-4" style={{width: "200px", height: "380px"}}>
												<img src="https://www.themoviedb.org/t/p/w220_and_h330_face/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg"  className="card-img-top" alt="..."/>
												<div className="card-footer">
													<Link to={"/movies"}>
													<p className="me-3">Killers of the Flower Moon</p>
													</Link>
													{/* <button onClick={() => actions.displayFavorites(item.name)} className="btn btn-outline-warning"><FontAwesomeIcon icon={faHeart}/></button> */}
												</div>
											</div>
										</div>
										{/* ); */}
									{/* })}	 */}
					</div>
				</div>
		);
		};