import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function YearsPage() {

    const navigate = useNavigate();

    const [years, setYears] = useState([]);

    useEffect(() => {

        fetchYears();

    }, []);

    const fetchYears = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/albums/years"
            );

            setYears(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.header}>

                <h2>Años</h2>

            </div>

            <div style={styles.grid}>

                {years.map(year => (

                    <div
                        key={year.yearRelease}
                        style={styles.card}

                        onClick={() =>
                            navigate(`/years/${year.yearRelease}`)
                        }

                        onMouseEnter={e =>
                            e.currentTarget.style.backgroundColor = "#282828"
                        }

                        onMouseLeave={e =>
                            e.currentTarget.style.backgroundColor = "#181818"
                        }
                    >

                        <h3>
                            📅 {year.yearRelease}
                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default YearsPage;

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