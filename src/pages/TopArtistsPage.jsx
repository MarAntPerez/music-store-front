import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TopArtistsPage() {

    const [artists, setArtists] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/inventory/artist/top"
            );

            setArtists(res.data);

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

            <h2 style={styles.title}>Artistas destacados</h2>

            <div style={styles.grid}>

                {artists.map((a, i) => (

                    <div key={i} style={styles.card}>

                        <h3>{a.artistName}</h3>
                        <p>💿 Álbums: {a.totalAlbums}</p>
                        <p>📦 Unidades: {a.totalUnits}</p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default TopArtistsPage;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
    },

    title: {
        textAlign: "center",
        marginBottom: "20px"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
    },
    card: {
        backgroundColor: "#181818",
        padding: "15px",
        borderRadius: "12px",
        textAlign: "center"
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
};