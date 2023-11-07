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
						setStore({cadenas: data})
						console.log(data);
					});
			},
			
			crearMultiplex: async (newMultiplex) => {
				const store = getStore();
				try {
					const requestOptions = {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify(newMultiplex)
					};
				const response = await fetch(`${process.env.BACKEND_URL}/api/multiplex`, requestOptions)
				return response.status
				} catch (error) {
					console.log("error", error)
				}				
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
		}
	};
};

export default getState;
