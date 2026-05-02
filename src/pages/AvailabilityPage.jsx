import { useState } from "react";
import axios from "axios";

function AvailabilityPage() {

    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [results, setResults] = useState([]);

    const search = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/inventory/availability",
                { params: { genre, format } }
            );

            setResults(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div style={styles.container}>

            <h2 style={styles.title}>🎧 Buscar disponibilidad</h2>

            <div style={styles.filters}>

                <input
                    placeholder="Género (Rock...)"
                    value={genre}
                    onChange={e => setGenre(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="Formato (Vinil, CD...)"
                    value={format}
                    onChange={e => setFormat(e.target.value)}
                    style={styles.input}
                />

                <button onClick={search} style={styles.button}>
                    Buscar
                </button>

            </div>

            <div style={styles.grid}>

                {results.map((r, i) => (

                    <div key={i} style={styles.card}>

                        <h3>{r.albumName}</h3>
                        <p>🎤 {r.artistName}</p>
                        <p>📦 Stock: {r.amount}</p>
                        <p>💲 ${Number(r.cost).toFixed(2)}</p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default AvailabilityPage;

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
    filters: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "20px"
    },
    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "none"
    },
    button: {
        backgroundColor: "#1db954",
        border: "none",
        padding: "10px 20px",
        borderRadius: "8px",
        cursor: "pointer",
        color: "white"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
    },
    card: {
        backgroundColor: "#181818",
        padding: "15px",
        borderRadius: "12px"
    }
};