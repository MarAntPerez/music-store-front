import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

function AlbumsPage() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const search =
        searchParams.get("search") || "";

    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        fetchAlbums();

    }, [search]);

    const fetchAlbums = async () => {

        try {

            let response;

            if (search.trim() !== "") {

                response = await axios.get(
                    "http://localhost:8080/albums/search",
                    {
                        params: {
                            query: search
                        }
                    }
                );

            } else {

                response = await axios.get(
                    "http://localhost:8080/albums"
                );

            }

            setAlbums(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h2>Álbumes</h2>

                <button
                    style={styles.addButton}
                    onClick={() => navigate("/albums/new")}
                >
                    ➕ Agregar Álbum
                </button>

            </div>

            <div style={styles.grid}>

                {albums.map(album => (

                    <div
                        key={album.id}
                        style={styles.card}
                        onClick={() => navigate(`/albums/${album.id}`)}
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

                        <h3>{album.albumName}</h3>

                        <p>🎤 {album.artistName || "Desconocido"}</p>

                        <p>🎼 {album.genreName}</p>

                        <p>💿 {album.formatType}</p>

                        <p>📅 {album.yearRelease}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AlbumsPage;

const styles = {

    container: {
        padding: "30px",
        paddingTop: "110px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
    },

    grid: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "25px"
    },

    card: {
        backgroundColor: "#181818",
        borderRadius: "14px",
        padding: "15px",
        color: "white",
        cursor: "pointer"
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    addButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

};