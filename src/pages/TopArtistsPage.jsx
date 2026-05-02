import { useEffect, useState } from "react";
import axios from "axios";

function TopArtistsPage() {

    const [artists, setArtists] = useState([]);

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

            <h2 style={styles.title}>🎤 Artistas destacados</h2>

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
    }
};