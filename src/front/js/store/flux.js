const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			cadenas: [],
			cadena: {},
			movies: [],
			current_movie: null,
			showtimes: [],
			current_showtime: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			// ACTIONS MOVIES (FRANCESCA)

			displayMovies: (id) => {
				let path = ""
				id ? path= "/" +id : path="/"

				fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/movies/" + path)
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
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/movies", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
			},

			deleteMovie: (indexDelete) => {
				console.log(indexDelete)
				let requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
					};
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/movies/" + indexDelete, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/movies/")
						.then((response) => response.json())
						.then((data) => setStore({ movies: data}))
					});
			},

			// ACTIONS SHOWTIMES (FRANCESCA)

			displayShowtimes: (id) => {
				let path = ""
				id ? path= "/" +id : path="/"

				fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/showtimes/" + path)
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
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/showtimes", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
			},

			deleteShowtime: (indexDelete) => {
				console.log(indexDelete)
				let requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
					};
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/showtimes/" + indexDelete, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/showtimes/")
						.then((response) => response.json())
						.then((data) => setStore({ showtimes: data}))
					});
			},

			
			// ACTIONS MULTIPLEX (ADJANI)

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
					console.log("error", error)
				}
			},

			editarMultiplex: async (id, cadena, cinema, ciudad, pais) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex/${id}`, {
						method: 'PUT',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							cadena: cadena,
							cinema: cinema,
							ciudad: ciudad,
							pais: pais
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
						headers: { "Content-Type": "application/json" },
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex/${id}`, requestOptions)
					if (response.status === 200) {
						const actualizarCadenas = store.cadenas.filter((item, i) => i !== index);
						setStore({ cadenas: actualizarCadenas })
					}
					return response.status
				} catch (error) {
					console.log("Error al eliminar", error);
				}
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;
