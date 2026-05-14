import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormatsPage() {

    const navigate = useNavigate();

    const [formats, setFormats] = useState([]);

    useEffect(() => {

        fetchFormats();

    }, []);

    const fetchFormats = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/formats"
            );

            setFormats(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h2>Formatos</h2>

                <button
                    style={styles.addButton}
                    onClick={() => navigate("/formats/new")}
                >
                    ➕ Agregar Formato
                </button>

            </div>

            <div style={styles.grid}>

                {formats.map(format => (

                    <div
                        key={format.id}
                        style={styles.card}

                        onClick={() =>
                            navigate(`/formats/${format.id}`)
                        }

                        onMouseEnter={e =>
                            e.currentTarget.style.backgroundColor = "#282828"
                        }

                        onMouseLeave={e =>
                            e.currentTarget.style.backgroundColor = "#181818"
                        }
                    >

                        <h3>
                            💿 {format.formatType}
                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default FormatsPage;

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
        padding: "15px",
        color: "white",
        cursor: "pointer"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "25px"
    },

    addButton: {
        backgroundColor: "#1db954",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

};