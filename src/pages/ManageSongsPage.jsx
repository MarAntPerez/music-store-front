import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ManageSongsPage() {

    const { id } = useParams();

    const [songs, setSongs] = useState([]);
    const [newSong, setNewSong] = useState("");

    useEffect(() => {

        fetchSongs();

    }, [id]);

    const fetchSongs = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/albums/${id}/songs`
                );

            setSongs(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const addSong = async () => {

        try {

            await axios.post(
                `http://localhost:8080/albums/${id}/songs`,
                { songName: newSong }
            );

            setNewSong("");

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

            <h2>🎵 Manage Songs</h2>

            <div style={styles.inputContainer}>

                <input
                    style={styles.input}
                    type="text"
                    value={newSong}
                    onChange={e =>
                        setNewSong(e.target.value)
                    }
                    placeholder="Song Name"
                />

                <button
                    style={styles.addButton}
                    onClick={addSong}
                >
                    ➕ Add Song
                </button>

            </div>

            <ul style={styles.songList}>

                {songs.map(song => (

                    <li
                        key={song.id}
                        style={styles.songItem}
                    >

                        {song.songName}

                        <button
                            style={styles.deleteButton}
                            onClick={() =>
                                deleteSong(song.id)
                            }
                        >
                            ❌ Delete
                        </button>

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
    }

};