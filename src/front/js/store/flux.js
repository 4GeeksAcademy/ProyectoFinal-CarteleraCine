const getState = ({ getStore, setStore }) => {
	return {
	  store: {
		City: []
	  },

	  actions: {
		displayCity: async () => {
			try {
				// Realiza una solicitud para obtener un mensaje del backend (ajusta la URL según tu configuración)
				const response = await fetch("https://friendly-eureka-qr65wvrvq75fxj5g-3001.app.github.dev/api/city/");
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

		displayCity1: () => {
		  fetch("https://friendly-eureka-qr65wvrvq75fxj5g-3001.app.github.dev/api/city/")
			.then(res => res.json())
			.then(data => {
			  setStore({ City: data });
			})
			.catch(error => console.log('Error al cargar ciudades', error));
		},

		addCity: newCity => {
		  const requestOptions = {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newCity)
		  };
  
		  fetch("https://friendly-eureka-qr65wvrvq75fxj5g-3001.app.github.dev/api/city/", requestOptions)
			.then(response => response.text())
			.then(result => console.log(result))
			.catch(error => console.log('Error al agregar ciudad', error));
		},

		
		
		editCity: (editedCity, index) => {
		  const store = getStore();
		  const updatedCity = [...store.City];
		  updatedCity[index] = editedCity;
  
		  setStore({ City: updatedCity });
  
		  const requestOptions = {
			method: 'PUT',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(editedCity)
		  };
  
		  fetch("https://friendly-eureka-qr65wvrvq75fxj5g-3001.app.github.dev/api/city/", requestOptions)
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
  
		  fetch("https://friendly-eureka-qr65wvrvq75fxj5g-3001.app.github.dev/api/city/" + id, requestOptions)
			.then(response => response.text())
			.then(result => {
			  console.log(result);
			})
			.catch(error => console.log('Error al eliminar ciudad', error));
		},
		getMessage: async () => {
			try {
				// Realiza una solicitud para obtener un mensaje del backend (ajusta la URL según tu configuración)
				const response = await fetch("URL_DEL_BACKEND");
				if (!response.ok) {
					throw new Error("Error en la solicitud");
				}
				const data = await response.json();

				// Actualiza el mensaje en el estado
				const store = getStore();
				setStore({ message: data.message });
			} catch (error) {
				console.error("Error al cargar el mensaje desde el backend", error);
			}
		}
	  }
	};
  };
  
  export default getState;
  