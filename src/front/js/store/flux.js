const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			movies: [],
			current_movie: null
		},
		actions: {
			// Use getActions to call a function within a fuction

			displayMovies: () => {
				
				let requestOptions = {
					method: 'GET',
					body: JSON.stringify(),
					headers: {
						"Content-Type": "application/json",
						"Accept": "application/json",
						"Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTcxOGQ2YTc0NzcwYmUwZjgwYzliOWY2YTc2OGE0YiIsInN1YiI6IjY1M2ZmODFjNTA3MzNjMDBlMjRhZGYwMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Bz1YACVZh6J9vBDp8p0bPsGlVpe5BZ-sowdWX5wBwdM"
					}
					};

				fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", requestOptions)
					.then(res => res.json())
					.then((data) => {
						console.log(data)
						setStore({movies: data.results})
					});
					},
			
			createMovie: (movie) => {
				
				let requestOptions = {
					method: 'POST',
					body: JSON.stringify(movie),
					headers: {
						"Content-Type": "application/json"
					}
					};
						  
					fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api", requestOptions)
					.then(response => response.json())
					.then(result => console.log(result))
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

			// displayMovies: (id) => {
			// 	let path = ""
			// 	id ? path= "/" +id : path="/"

			// 	fetch("https://bug-free-tribble-g449jj9jvv9h946x-3001.app.github.dev/api" + path)
			// 		.then(response => response.json())
			// 		.then((data) => {
			// 			console.log(data)
			// 			id==false ? setStore({movies:data}) : setStore({current_movie:data})
						
			// })}
			
			
		}
	};
};

export default getState;
