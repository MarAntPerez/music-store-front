import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function AddArtistPage() {
    const navigate = useNavigate();
    const [artist, setArtist] = useState({ artistName: "" });

    const handleChange = e => setArtist({ ...artist, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/artists", artist);
            navigate("/artists");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE ARTISTAS"
            title="Agregar"
            titleAccent="Artista"
            fields={[{ name: "artistName", label: "Nombre del artista", placeholder: "Ingrese el nombre" }]}
            values={artist}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default AddArtistPage;