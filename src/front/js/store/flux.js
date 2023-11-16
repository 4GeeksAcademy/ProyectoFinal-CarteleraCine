const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			movies: [],
			current_movie: null,
			showtimes: [],
			current_showtime: null,
		},
		actions: {

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
						.then((data) => setStore({ movies: data}))
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
						.then((data) => setStore({ showtimes: data}))
					});
			},

			displayMovies: (id) => {
				let path = ""
				id ? path= "/" +id : path="/"

				fetch(`${process.env.BACKEND_URL}/api/movies${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id==false ? setStore({movies:data}) : setStore({current_movie:data})				
			})},

			displayShowtimes: (id) => {
				let path = ""
				id ? path= "/" +id : path="/"

				fetch(`${process.env.BACKEND_URL}/api/showtimes${path}`)
					.then(response => response.json())
					.then((data) => {
						console.log(data)
						id==false ? setStore({showtimes:data}) : setStore({current_showtime:data})						
			})}						
		}
	};
};

export default getState;
