const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			movies: [],
			current_movie: null
		},
		actions: {
			// Use getActions to call a function within a fuction

			displayMovies: () => {
				
				fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api")
					.then(res => res.json())
					.then((data) => {
						console.log(data)
						setStore({movies: data})
					});
					},
			
			createMovie: (movie) => {
				
				fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api", {
					method: "POST",
					body: JSON.stringify(movie),
					headers: {
						"Content-Type": "application/json"
					}
				})
				.then((response) => response.json())
				.then((data) => console.log(data))
			},
		
					
			deleteMovie: (indexDelete) => {
				console.log(indexDelete)
				let requestOptions = {
					method: 'DELETE',
					redirect: 'follow'
					};
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/" + indexDelete, requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
					.then(() => {
						fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/")
						.then((response) => response.json())
						.then((data) => setStore({ movies: data}))
					});
			},

			loadSomeData: (id) => {
				let path = ""
				id ? path="/movies/"+id : path="/movies"

				fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api/" + path)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id==false ? setStore({movies:data}) : setStore({current_movie:data})
						
			})}
			
			
		}
	};
};

export default getState;
