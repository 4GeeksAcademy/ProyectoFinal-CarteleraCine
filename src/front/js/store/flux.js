const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			movies: [],
			current_movie: null,
			showtimes: [],
			current_showtime: null,
			cadenas: [],
			cadena: {},
			user: [],
			auth: localStorage.getItem("token")? true : false,
		},
		actions: {

			// FETCH MOVIES (FRANCESCA)		
			displayMovies: (id) => {
				let path = ""
				id ? path = "/" + id : path = "/"

				fetch(`${process.env.BACKEND_URL}/api/movies${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id == false ? setStore({ movies: data }) : setStore({ current_movie: data })
					})
			},

			displayShowtimes: (id) => {
				let path = ""
				id ? path = "/" + id : path = "/"

				fetch(`${process.env.BACKEND_URL}/api/showtimes${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id == false ? setStore({ showtimes: data }) : setStore({ current_showtime: data })
					})
			},

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


			// FETCH SHOWTIMES (FRANCESCA)
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
							.then((data) => setStore({ movies: data }))
					});
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
							.then((data) => setStore({ showtimes: data }))
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
						headers: { "Content-Type": "application/json", "authorization":`Bearer ${localStorage.getItem("token")}`  },
						body: JSON.stringify({
							cadena: cadena,
							cinema: cinema,
							ciudad: ciudad,
							pais: pais
						}),
					})
					if (response.ok) {
						getActions().mostrarMultiplex()
						return response.status;						
					}
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

			//FETCH PARA EL USER (ADJANI)
			mostrarUsuario: () => {
				fetch(`${process.env.BACKEND_URL}/api/user`)
					.then(response => response.json())
					.then((data) => {
						setStore({ user: data })
						console.log(data);
					});
			},

			mostrarUser_id: (id) => {
				fetch(`${process.env.BACKEND_URL}/api/user/${id}`)
					.then(response => response.json())
					.then((data) => {
						setStore({ user: data })
						console.log(data);
					});
			},

			crearUser: async (newUser) => {
				const store = getStore();
				try {
					const requestOptions = {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(newUser)
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/user`, requestOptions)
					return response.status
				} catch (error) {
					console.log("Ya existe", error)
				}
			},

			modificarUser: async (id, name, email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, {
						method: 'PUT',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: name,
							email: email,
							password: password,
						}),
					})
					return response.status;
				} catch (error) {
					console.log("Error al editar", error);
				}
			},

			eliminarUser: async (index) => {
				try {
					const store = getStore();
					const id = store.user[index].id
					const requestOptions = {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/user/${id}`, requestOptions)
					if (response.status === 200) {
						const actualizarUser = store.user.filter((item, i) => i !== index);
						setStore({ user: actualizarUser })
					}
					return response.status
				} catch (error) {
					console.log("Error al eliminar", error);
				}
			},


			// FETCH LOGIN/USER (ADJANI)
			login: async (name, email, password) => {
				console.log("login desde flux");
				// try {
					const requestOptions = {
						method: 'POST',
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(
							{
								"name": name,
								"email": email,
								"password": password
							}
						)
					} 
					fetch(`${process.env.BACKEND_URL}/api/login`, requestOptions)
					.then(response=>{
						console.log(response.status);
						if (response.status === 200) {
							setStore({auth: true});							
						}
						return response.json()
					})
					.then(data => {
						localStorage.setItem("token", data.access_token);
						console.log(data);
						setStore({user: {name: data.name}})
					})


					// const data = await response.json();
					// console.log(data);
					// localStorage.setItem("token", data.access_token)

					// await fetch(`${process.env.BACKEND_URL}/api/protected`,
					// 	{
					// 		method: 'GET',
					// 		headers: {
					// 			'Authorization': `Bearer ${data.access_token}`,
					// 			'Content-Type': 'application/json'
					// 		}
					// 	}).then((res) => res.json()).then((data) => setStore({user: data.user}))
					// window.location.href = "/cadenas"
				// } catch (error) {
				// 	console.log("error", error);
				// }
			},

			logout: () => {
				console.log("Logout desde flux");
				setStore({auth: false});
				localStorage.removeItem("token");
			},
		}
	};
};

export default getState;
