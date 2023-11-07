import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [newCity, setNewCity] = useState({ name: "", imagen: "", });
	const [editIndex, setEditIndex] = useState(null);
  	const [editedCity, setEditedCity] = useState({});

	const addCity = () => {
		actions.addCity(newCity);
		setNewCity({ name: "", image: ""});
	  };

	  const editar = (index) => {
		setEditIndex(index);
		setEditedContact(store.city[index]);
	  };
	
	  const guardarCambios = () => {
		if (editIndex !== null) {
		  actions.editCity(editedCity, editIndex);
		  setEditIndex(null);
		  setEditedCity({});
		}
	  };
	
	return (
		<div className="container">
      <ul className="list-group">
        {store.City.map((item, index) => {
          return (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={editedCity.name || ""}
                    onChange={(e) => setEditedCity({ ...editedCity, name: e.target.value })}
                  />
                  <input
                    type="text"
                    placeholder="Image"
                    value={editedCity.image || ""}
                    onChange={(e) => setEditedCity({ ...editedCity, image: e.target.value })}
                  />

                
                  <button onClick={guardarCambios}>Guardar</button>
                </div>
              ) : (
                <div >
                  {item.name}
                  <br />
                  {item.image}
                  <br />
                </div>
              )}
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button className="btn btn-warning" type="button" onClick={() => editar(index)}>Editar</button>
              <button className="btn btn-warning" type="button" onClick={() => actions.deleteCity(item.id)}>Eliminar</button>
              </div>
            </li>
          );
        })}
      </ul>
</div>
     
  );
};
