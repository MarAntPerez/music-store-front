import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function EditArtistPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [artist, setArtist] = useState({ artistName: "" });

    useEffect(() => {
        axios.get(`http://localhost:8080/artists/${id}`)
            .then(r => setArtist(r.data))
            .catch(console.error);
    }, [id]);

    const handleChange = e => setArtist({ ...artist, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/artists/${id}`, artist);
            navigate("/artists");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE ARTISTAS"
            title="Editar"
            titleAccent="Artista"
            fields={[{ name: "artistName", label: "Nombre del artista" }]}
            values={artist}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default EditArtistPage;