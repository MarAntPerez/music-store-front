import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function AlbumDetailPage() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState([]);

    const { addToCart } = useCart();

    useEffect(() => {

        fetchAlbum();
        fetchSongs();

    }, []);

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

    const handleAddToCart = async () => {
        try {
            await axios.post(`http://localhost:8080/inventory/sell/${album.id}`);

            addToCart(album);

            alert("Album agregado al carrito");
        } catch (error) {
            alert("Álbum no disponible");
        }
    };

    const handleDeleteAlbum = async () => {

        const confirmDelete = window.confirm(
            "¿Seguro que deseas eliminar este álbum?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:8080/albums/${album.id}`
            );

            alert("Álbum eliminado correctamente");

            navigate("/albums");

        } catch (error) {

            console.error(error);

            alert("No se pudo eliminar el álbum");

        }

    };

    const totalDuration = songs.reduce((total, song) => {

        if (!song.duration) return total;

        const [min, sec] =
            song.duration.split(":").map(Number);

        return total + (min * 60 + sec);

    }, 0);

    const minutes =
        Math.floor(totalDuration / 60);

    const seconds =
        totalDuration % 60;

    if (!album) return <p>Conectando...</p>;

    return (

        <div style={styles.container}>

            <button
                style={styles.backButton}
                onClick={() => navigate(-1)}
            >
                ⬅ Volver
            </button>

            <div style={styles.header}>

                <img
                    src={
                        album.imageUrl
                            ? `http://localhost:8080/images/${album.imageUrl}`
                            : "https://via.placeholder.com/300"
                    }
                    alt={album.albumName}
                    style={styles.cover}
                />

                <div>

                    <h1>
                        {album.albumName}
                    </h1>

                    <h2>
                        🎤 {album.artistName}
                    </h2>

                    <p>
                        📅 {album.yearRelease}
                    </p>

                    <p>
                        ⏱ Total:
                        {" "}
                        {minutes}:{seconds
                            .toString()
                            .padStart(2, "0")}
                    </p>

                </div>

            </div>

            <div style={styles.songList}>

                {songs.map(song => (

                    <div
                        key={song.id}
                        style={styles.song}
                    >

                        <span>

                            {song.trackNumber}.
                            {" "}
                            {song.songName}

                        </span>

                        <span>
                            {song.duration}
                        </span>

                    </div>

                ))}

            </div>

            <div style={styles.buttonContainer}>

                <button
                    style={styles.editButton}
                    onClick={() =>
                        navigate(`/albums/edit/${album.id}`)
                    }
                >
                    ✏️ Editar Álbum
                </button>

                <button
                    style={styles.deleteButton}
                    onClick={handleDeleteAlbum}
                >
                    🗑 Eliminar Álbum
                </button>

                <button
                    style={styles.songsButton}
                    onClick={() =>
                        navigate(`/albums/${album.id}/songs`)
                    }
                >
                    🎵 Administrar Canciones
                </button>

                <button
                    style={styles.cartButton}
                    onClick={handleAddToCart}
                >
                    🛒 Añadir al carrito
                </button>

            </div>

        </div>

    );

}

export default AlbumDetailPage;

const styles = {

    container: {
        padding: "30px",
        color: "white",
        backgroundColor: "#121212",
        minHeight: "100vh"
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

    header: {
        display: "flex",
        gap: "25px",
        alignItems: "center"
    },

    cover: {
        width: "250px",
        height: "250px",
        objectFit: "cover",
        borderRadius: "12px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
    },

    songList: {
        marginTop: "30px"
    },

    song: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        borderBottom: "1px solid #333",
        cursor: "pointer",
        transition: "0.2s"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        marginTop: "20px"
    },

    editButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

    songsButton: {
        padding: "10px 18px",
        backgroundColor: "#535353",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

    cartButton: {
        padding: "10px 18px",
        backgroundColor: "#ff9800",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },

    deleteButton: {
        padding: "10px 18px",
        backgroundColor: "#e53935",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

};