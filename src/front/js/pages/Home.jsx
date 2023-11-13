import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import style from "../../styles/Home.module.css";
import HeaderCarrusel from "../component/HeaderCarrusel.jsx";


const Home = () => {
    const { store, actions } = useContext(Context);
    const [newCity, setNewCity] = useState({ name: "", image: "" });
    const [editIndex, setEditIndex] = useState(null);
    const [editedCity, setEditedCity] = useState({});

    const addCity = () => {
        actions.addCity(newCity);
        setNewCity({ name: "", image: "" });
    };

    const editar = (index) => {
        setEditIndex(index);
        setEditedCity({ ...store.City[index] });
    };

    const guardarCambios = () => {
        if (editIndex !== null) {
            // Verificar si se proporciona una nueva URL de imagen
            const updatedCity = {
                ...editedCity,
                image: editedCity.newImage || editedCity.image
            };
            actions.editCity(updatedCity, editIndex);
            setEditIndex(null);
            setEditedCity({});
        }
    };

    return (

        <>
            <HeaderCarrusel />

            <div className={`container ${style.general}`}>

                <ul className="list-group">
                    {store.City.map((item, index) => {
                        return (
                            <li key={index} className="list-group-item d-flex justify-content-between">
                                <img src={item.image} style={{ width: '20%', height: '15%' }} alt="Imagen" />

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
                                            onChange={(e) => setEditedCity({ ...editedCity, newImage: e.target.value })}
                                        />

                                        <button onClick={guardarCambios}>Guardar</button>
                                    </div>
                                ) : (
                                    <div>
                                        {item.name}
                                        <br />
                                    </div>
                                )}
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-warning" type="button" onClick={() => editar(index)}>
                                        Editar
                                    </button>
                                    <button className="btn btn-warning" type="button" onClick={() => actions.deleteCity(item.id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>

            </div>
        </>
    )
}

export default Home