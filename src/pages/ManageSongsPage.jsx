import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ManageSongsPage() {

    const navigate = useNavigate();

    const { id } = useParams();

    const [songs, setSongs] = useState([]);

    const [newSong, setNewSong] = useState({
        songName: "",
        duration: ""
    });

    useEffect(() => {

        fetchSongs();

    }, [id]);

    const fetchSongs = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/songs/album/${id}`
                );

            setSongs(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const addSong = async () => {

        try {

            await axios.post(
                "http://localhost:8080/songs",
                {
                    albumId: id,
                    songName: newSong.songName,
                    duration: newSong.duration
                }
            );

            setNewSong({
                songName: "",
                duration: ""
            });

            fetchSongs();

        } catch (error) {

            console.error(error);

        }

    };

    const deleteSong = async songId => {

        try {

            await axios.delete(
                `http://localhost:8080/songs/${songId}`
            );

            fetchSongs();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <button
                style={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ⬅ Volver
            </button>

            <h2>Administrar Canciones</h2>

            <div style={styles.inputContainer}>

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Nombre de la canción"
                    value={newSong.songName}
                    onChange={e =>
                        setNewSong({
                            ...newSong,
                            songName: e.target.value
                        })
                    }
                />

                <input
                    style={styles.input}
                    type="text"
                    placeholder="Duración (00:00)"
                    value={newSong.duration}
                    onChange={e =>
                        setNewSong({
                            ...newSong,
                            duration: e.target.value
                        })
                    }
                />

                <button
                    style={styles.addButton}
                    onClick={addSong}
                >
                    ➕ Agregar Canción
                </button>

            </div>

            <ul style={styles.songList}>

                {songs.map(song => (

                    <li
                        key={song.id}
                        style={styles.songItem}
                    >

                        <span>
                            {song.songName}
                        </span>

                        <div style={styles.actions}>

                            <button
                                style={styles.editButton}
                                onClick={() =>
                                    navigate(`/songs/edit/${song.id}`)
                                }
                            >
                                ✏️ Editar
                            </button>

                            <button
                                style={styles.deleteButton}
                                onClick={() =>
                                    deleteSong(song.id)
                                }
                            >
                                ❌ Eliminar
                            </button>

                        </div>

                    </li>

                ))}

            </ul>

        </div>

    );

}

export default ManageSongsPage;

const styles = {

    container: {
        padding: "30px",
        paddingTop: "110px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
    },

    inputContainer: {
        display: "flex",
        gap: "10px",
        marginBottom: "20px"
    },

    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "8px",
        border: "none"
    },

    addButton: {
        padding: "10px 15px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
    },

    songList: {
        listStyle: "none",
        padding: 0
    },

    songItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#181818",
        padding: "10px 15px",
        borderRadius: "8px",
        marginBottom: "10px"
    },

    deleteButton: {
        backgroundColor: "#e53935",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        color: "white",
        cursor: "pointer"
    },

    backButton: {
        marginBottom: "20px",
        padding: "10px 15px",
        cursor: "pointer",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white"
    },

    actions: {
        display: "flex",
        gap: "10px"
    },

    editButton: {
        backgroundColor: "#1db954",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
    },

};