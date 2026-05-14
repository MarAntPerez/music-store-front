import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArtistsPage() {

    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);

    useEffect(() => {

        fetchArtists();

    }, []);

    const fetchArtists = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/artists"
            );

            setArtists(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>


            <div style={styles.header}>

                <h1 style={styles.title}>
                    Artistas
                </h1>

                <div style={styles.buttonGroup}>

                    <button style={styles.featuredButton}>
                        Destacados
                    </button>

                    <button style={styles.addButton}>
                        ➕ Agregar Artista
                    </button>

                </div>

            </div>

            <div style={styles.grid}>

                {artists.map(artist => (

                    <div
                        key={artist.id}
                        style={styles.card}
                        onClick={() =>
                            navigate(`/artist/${artist.id}`)
                        }
                    >

                        <h3>
                            🎤 {artist.artistName}
                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ArtistsPage;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial"
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
        padding: "20px",
        color: "white",
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

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },

    buttonGroup: {
        display: "flex",
        gap: "15px"
    },

    featuredButton: {
        padding: "10px 18px",
        backgroundColor: "#ff9800",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px"
    },

    addButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "10px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "15px"
    },

};