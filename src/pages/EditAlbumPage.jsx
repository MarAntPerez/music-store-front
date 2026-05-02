import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditAlbumPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [album, setAlbum] = useState({
        albumName: "",
        yearRelease: ""
    });

    useEffect(() => {

        fetchAlbum();

    }, [id]);

    const fetchAlbum = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/albums/${id}`
                );

            setAlbum(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = e => {

        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/albums/${id}`,
                album
            );

            alert("Album updated successfully");

            navigate(`/albums/${id}`);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.formCard}>

                <h2 style={styles.title}>
                    ✏️ Edit Album
                </h2>

                <form onSubmit={handleSubmit}>

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Album Name
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="albumName"
                            value={album.albumName}
                            onChange={handleChange}
                        />

                    </div>

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Year Release
                        </label>

                        <input
                            style={styles.input}
                            type="number"
                            name="yearRelease"
                            value={album.yearRelease}
                            onChange={handleChange}
                        />

                    </div>

                    <div style={styles.buttonContainer}>

                        <button
                            type="submit"
                            style={styles.saveButton}

                            onMouseEnter={e =>
                                e.currentTarget.style.backgroundColor = "#17a74a"
                            }

                            onMouseLeave={e =>
                                e.currentTarget.style.backgroundColor = "#1db954"
                            }
                        >
                            💾 Save
                        </button>

                        <button
                            type="button"
                            style={styles.cancelButton}

                            onClick={() =>
                                navigate(-1)
                            }

                            onMouseEnter={e =>
                                e.currentTarget.style.backgroundColor = "#777"
                            }

                            onMouseLeave={e =>
                                e.currentTarget.style.backgroundColor = "#535353"
                            }
                        >
                            ❌ Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditAlbumPage;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    formCard: {
        backgroundColor: "#181818",
        padding: "30px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "500px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "28px"
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "18px"
    },

    label: {
        marginBottom: "6px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#b3b3b3"
    },

    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        backgroundColor: "#282828",
        color: "white",
        fontSize: "14px"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "25px"
    },

    saveButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

    cancelButton: {
        padding: "10px 18px",
        backgroundColor: "#535353",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    }

};