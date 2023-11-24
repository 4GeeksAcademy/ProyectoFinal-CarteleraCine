const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {	
			movies: [],
			current_movie: null,
			showtimes: [],
			current_showtime: null,
			cadenas: [],
			cadena: {},
			City: [],
			auth: false

		},
		actions: {

	// FETCH MOVIES (FRANCESCA)		
			displayMovies: (id) => {
				let path = ""
				id ? path= "/" + id : path="/"

				fetch(`${process.env.BACKEND_URL}/api/movies${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id==false ? setStore({movies:data}) : setStore({current_movie:data})				
			})},
			
			createMovie: (movie) => {			
				let requestOptions = {
					method: 'POST',
					body: JSON.stringify(movie),
					headers: {
						"Content-Type": "application/json"
					}
					};						  
					fetch(`${process.env.BACKEND_URL}/api/movies`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
			},

			deleteMovie: (indexDelete) => {
				console.log(indexDelete)
				let requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
					};						  
					fetch(`${process.env.BACKEND_URL}/api/movies/${indexDelete}`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch(`${process.env.BACKEND_URL}/api/movies`)
						.then((response) => response.json())
						.then((data) => setStore({ movies: data}))
					});
			},


	// FETCH SHOWTIMES (FRANCESCA)
			
			displayShowtimes: (id) => {
				let path = ""
				id ? path= "/" +id : path="/"

				fetch(`${process.env.BACKEND_URL}/api/showtimes${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id==false ? setStore({showtimes:data}) : setStore({current_showtime:data})						
			})},
	
			createShowtime: (showtime) => {	
				let requestOptions = {
					method: 'POST',
					body: JSON.stringify(showtime),
					headers: {
						"Content-Type": "application/json"
					}
					};						  
					fetch(`${process.env.BACKEND_URL}/api/showtimes`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
			},
					
			deleteShowtime: (indexDelete) => {
				console.log(indexDelete)
				let requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
					};						  
					fetch(`${process.env.BACKEND_URL}/api/showtimes/${indexDelete}`, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch(`${process.env.BACKEND_URL}/api/showtimes`)
						.then((response) => response.json())
						.then((data) => setStore({ showtimes: data}))
					});
			},	


	// FETCH MULTIPLEX (ADJANI)
			mostrarMultiplex: () => {
				fetch(`${process.env.BACKEND_URL}/api/multiplex`)
					.then(response => response.json())
					.then((data) => {
						setStore({ cadenas: data })
						console.log(data);
					});
			},

			mostrarMultiplex_id: (id) => {
				
				fetch(`${process.env.BACKEND_URL}/api/multiplex/${id}`)
					.then(response => response.json())
					.then((data) => {
						setStore({ cadena: data })
						console.log(data);
					});
			},

			crearMultiplex: async (newMultiplex) => {
				const store = getStore();
				try {
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newMultiplex)
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex`, requestOptions)
					return response.status
				} catch (error) {
					console.log("Ya existe", error)
				}
			},

			editarMultiplex: async (id, cadena, cinema, ciudad, pais) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex/${id}`, {
						method: 'PUT',
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							cadena:cadena,
							cinema:cinema,
							ciudad:ciudad,
							pais:pais
						}),
					})
					return response.status;
				} catch (error) {
					console.log("Error al editar", error);					
				}					
			},
			
			eliminarMultiplex: async (index) => {
				try {
					const store = getStore();
					const id = store.cadenas[index].id
					const requestOptions = {
						method: "DELETE",
						headers: {"Content-Type": "application/json"},
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex/${id}`, requestOptions)
					if (response.status === 200) {
						const actualizarCadenas = store.cadenas.filter((item, i) => i !==index);
						setStore({ cadenas: actualizarCadenas})
					}
					return response.status
				} catch (error) {
					console.log("Error al eliminar", error);
				}	
			},	
		
	// FETCH CIUDADES (ERIK)
			displayCity: async () => {
			try {
				// Realiza una solicitud para obtener un mensaje del backend (ajusta la URL según tu configuración)
				const response = await fetch(`${process.env.BACKEND_URL}/api/city`);
				if (!response.ok) {
					throw new Error("Error en la solicitud");
				}
				const data = await response.json();

				// Actualiza el mensaje en el estado
				console.log(data)
				const store = getStore();
				setStore({ City: data });
			} catch (error) {
				console.error("Error al cargar el mensaje desde el backend", error);
			}
			},

			addCity: newCity => {
		  const requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newCity)
		  };
  
		  fetch(`${process.env.BACKEND_URL}/api/city`, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('Error al agregar ciudad', error));
			},

			editCity: (editedCity, index) => {
			const store = getStore();
			const updatedCity = [...store.City];
			updatedCity[index] = { ...editedCity }; // Realiza una copia de editedCity
		  
			setStore({ City: updatedCity });
		
  
		  const requestOptions = {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedCity[index])
		  };
  
		  fetch(`${process.env.BACKEND_URL}/api/city`, requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('Error al editar ciudad', error));
			},

			deleteCity: id => {
		  const store = getStore();
		  console.log("Eliminar ciudad con ID: " + id);
  
		  setStore({ City: store.City.filter(item => item.id !== id) });
  
		  const requestOptions = {
			method: 'DELETE',
			redirect: 'follow'
		  };
  
		  fetch(`${process.env.BACKEND_URL}/api/city/${id}`, requestOptions)
			.then(response => response.text())
			.then(result => {
			  console.log(result);
			})
			.catch(error => console.log('Error al eliminar ciudad', error));
			},
		
		},

		// login: (email, password) => {
		// 	console.log("login desde flux")
		// 	const requestOptions = {
		// 		method: "POST",
		// 		headers: { "Content-type": "application/json" },
		// 		body: JSON.stringify(
		// 			{
		// 				"email":email,
		// 				"password": password
		// 			}
		// 		)
		// 	};
		// 	fetch(`${process.env.BACKEND_URL}/api/login`, requestOptions)
		// 		.then(response => {
		// 			console.log(response.status)
		// 			if(response.status === 200){
		// 				setStore({auth: true});
		// 			}
		// 			return response.json()
		// 		})
		// 		.then(data => {
		// 			localStorage.setItem("token", data.access_token);
		// 			console.log(data)
		// 		});
		// },

		// signup: (email, password) => {
		// 	console.log("signup desde flux")
		// 	fetch(`${process.env.BACKEND_URL}/api/signup`, {
		// 		method: "POST",
		// 		headers: {"Content-Type": "application/json"},
		// 		body: JSON.stringify(
		// 			{
		// 				"email":email,
		// 				"password": password
		// 			}
		// 		)
		// 	})
		// 	.then((response) => response.json())
		// 	.then((data) => console.log(data))
		// },

		// logout: () => {
		// 	console.log("logout desde flux")
		// 	setStore({auth: false})
		// 	localStorage.removeItem("token");
		// }
	};
};

export default getState;
