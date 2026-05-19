import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function EditSongPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState({ songName: "", duration: "", albumId: "" });

    useEffect(() => {
        axios.get(`http://localhost:8080/songs/${id}`)
            .then(r => setSong(r.data))
            .catch(console.error);
    }, [id]);

    const handleChange = e => setSong({ ...song, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/songs/${id}`, song);
            navigate(`/albums/${song.albumId}/songs`);
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE CANCIONES"
            title="Editar"
            titleAccent="Canción"
            fields={[
                { name: "songName", label: "Nombre de la canción" },
                { name: "duration", label: "Duración", placeholder: "00:00" },
            ]}
            values={song}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default EditSongPage;