import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditSongPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [song, setSong] = useState({
        songName: "",
        duration: "",
        albumId: ""
    });

    useEffect(() => {

        fetchSong();

    }, [id]);

    const fetchSong = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/songs/${id}`
            );

            setSong(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = e => {

        setSong({
            ...song,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/songs/${id}`,
                song
            );

            alert("Canción actualizada correctamente");

            navigate(`/albums/${song.albumId}/songs`);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2 style={styles.title}>
                    ✏️ Editar Canción
                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Nombre de la canción
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="songName"
                            value={song.songName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Duración
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="duration"
                            placeholder="00:00"
                            value={song.duration}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div style={styles.buttonContainer}>

                        <button
                            type="submit"
                            style={styles.saveButton}
                        >
                            💾 Guardar
                        </button>

                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => navigate(-1)}
                        >
                            ❌ Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditSongPage;

const styles = {

    container: {
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        paddingTop: "110px"
    },

    card: {
        backgroundColor: "#181818",
        padding: "30px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "500px",
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "28px"
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column"
    },

    label: {
        marginBottom: "8px",
        color: "#b3b3b3",
        fontWeight: "bold"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#282828",
        color: "white",
        fontSize: "14px",
        outline: "none"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
    },

    saveButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },

    cancelButton: {
        padding: "10px 18px",
        backgroundColor: "#535353",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    }

};