import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function GenreAlbumsPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);
    const [genreName, setGenreName] = useState("");

    useEffect(() => {

        fetchAlbums();

    }, []);

    const fetchAlbums = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/albums/genre/${id}`
                );

            setAlbums(response.data);

            if (response.data.length > 0) {

                setGenreName(
                    response.data[0].genreName
                );

            }

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este genero?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:8080/genres/${id}`
            );

            alert("Genero eliminado");

            navigate("/genres");

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

            <h2 style={styles.title}>
                {genreName}
            </h2>

            <div style={styles.line}></div>

            <div style={styles.actionsContainer}>


                {Number(id) !== 0 && (
                    <button
                        style={styles.editButton}
                        onClick={() =>
                            navigate(`/genres/edit/${id}`)
                        }
                    >
                        ✏️ Editar Genero
                    </button>
                )}

                {Number(id) !== 0 && (
                    <button
                        style={styles.deleteButton}
                        onClick={handleDelete}
                    >
                        🗑 Eliminar Genero
                    </button>
                )}

            </div>

            <div style={styles.grid}>

                {albums.map(album => (

                    <div
                        key={album.id}
                        style={styles.card}

                        onClick={() =>
                            navigate(`/albums/${album.id}`)
                        }

                        onMouseEnter={e =>
                            e.currentTarget.style.backgroundColor = "#282828"
                        }

                        onMouseLeave={e =>
                            e.currentTarget.style.backgroundColor = "#181818"
                        }
                    >

                        <img
                            src={
                                album.imageUrl
                                    ? `http://localhost:8080/images/${album.imageUrl}`
                                    : "https://via.placeholder.com/200"
                            }

                            alt={album.albumName}

                            style={styles.image}
                        />

                        <h3>
                            {album.albumName}
                        </h3>

                        <p>
                            🎤 {album.artistName}
                        </p>

                        <p>
                            📅 {album.yearRelease}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default GenreAlbumsPage;

const styles = {

    container: {
        padding: "30px",
        paddingTop: "110px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
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

    title: {
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "10px"
    },

    line: {
        width: "120px",
        height: "4px",
        backgroundColor: "#1db954",
        margin: "0 auto 25px auto",
        borderRadius: "5px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "20px"
    },

    card: {
        backgroundColor: "#181818",
        borderRadius: "12px",
        padding: "15px",
        textAlign: "center",
        cursor: "pointer",
        transition: "0.2s"
    },

    image: {
        width: "100%",
        borderRadius: "10px",
        marginBottom: "10px"
    },

    actionsContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginBottom: "30px"
    },

    editButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px",
        transition: "0.2s"
    },

    deleteButton: {
        padding: "10px 18px",
        backgroundColor: "#e53935",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px",
        transition: "0.2s"
    }

};