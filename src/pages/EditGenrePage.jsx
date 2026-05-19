import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function EditGenrePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genre, setGenre] = useState({ genresName: "" });

    useEffect(() => {
        axios.get(`http://localhost:8080/genres/${id}`)
            .then(r => setGenre(r.data))
            .catch(console.error);
    }, [id]);

    const handleChange = e => setGenre({ ...genre, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/genres/${id}`, genre);
            navigate("/genres");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE GÉNEROS"
            title="Editar"
            titleAccent="Género"
            fields={[{ name: "genresName", label: "Nombre del género" }]}
            values={genre}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default EditGenrePage;