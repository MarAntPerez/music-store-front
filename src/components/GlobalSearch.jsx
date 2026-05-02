import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GlobalSearch() {

    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        if (query.trim() === "") {
            setAlbums([]);
            return;
        }

        const delay = setTimeout(() => {
            fetchResults();
        }, 400);

        return () => clearTimeout(delay);

    }, [query]);

    const fetchResults = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/albums/search",
                {
                    params: { query }
                }
            );

            setAlbums(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div style={styles.container}>

            <h2 style={styles.subtitle}>
                Buscar Música
            </h2>

            <input
                type="text"
                placeholder="Buscar álbum, artista, género, formato o año..."
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                style={styles.input}
            />

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

                        <h3 style={styles.album}>
                            {album.albumName}
                        </h3>

                        <p style={styles.artist}>
                            {album.artistName}
                        </p>

                        <p style={styles.info}>
                            🎼 {album.genreName}
                        </p>

                        <p style={styles.info}>
                            💿 {album.formatType}
                        </p>

                        <p style={styles.year}>
                            {album.yearRelease}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default GlobalSearch;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
    },

    title: {
        fontSize: "42px",
        marginBottom: "10px",
        color: "#1DB954"
    },

    subtitle: {
        marginBottom: "15px"
    },

    input: {
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        borderRadius: "10px",
        border: "none",
        marginBottom: "30px",
        outline: "none",
        backgroundColor: "#282828",
        color: "white"
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
        transition: "0.3s",
        cursor: "pointer",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        marginBottom: "10px"
    },

    album: {
        margin: "5px 0",
        fontSize: "18px"
    },

    artist: {
        margin: "0",
        color: "#1DB954",
        fontWeight: "bold"
    },

    info: {
        margin: "2px 0",
        fontSize: "14px",
        color: "#b3b3b3"
    },

    year: {
        marginTop: "5px",
        fontSize: "13px",
        color: "#888"
    }

};