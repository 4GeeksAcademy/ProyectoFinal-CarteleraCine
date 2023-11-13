const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			cadenas: [
				// {
				// 	cadena: "Cinepolis",
				// 	cinema: "Paseo de las Flores",
				// 	ciudad: "Heredia"
				// },
				// {
				// 	cadena: "CineColombia",
				// 	cinema: "Santa Fe",
				// 	ciudad: "Medellin"
				// }
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			mostrarMultiplex: () => {
				fetch(`${process.env.BACKEND_URL}/api/multiplex`)
					.then(response => response.json())
					.then((data) => {
						setStore({ cadenas: data })
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

			editarMultiplex: async (multiplexEditado, index) => {
				try {
					const store = getStore();
					const multiplexActualizado = [...store.cadenas,];
					multiplexActualizado[index] = multiplexEditado;
					setStore({cadenas: multiplexActualizado});

					const requestOptions = {
						method: 'PUT',
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(multiplexEditado),
					};
					const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex/`, requestOptions)
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
