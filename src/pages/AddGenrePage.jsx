import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function AddGenrePage() {
    const navigate = useNavigate();
    const [genre, setGenre] = useState({ genresName: "" });

    const handleChange = e => setGenre({ ...genre, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/genres", genre);
            navigate("/genres");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE GÉNEROS"
            title="Agregar"
            titleAccent="Género"
            fields={[{ name: "genresName", label: "Nombre del género", placeholder: "Ingrese el nombre" }]}
            values={genre}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default AddGenrePage;