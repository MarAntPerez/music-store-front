import { useEffect, useState } from "react";
import axios from "axios";

function YearsPage() {

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

        <div style={{ padding: "20px" }}>

            <h2>📅 Years</h2>

            <div style={styles.grid}>

                {years.map(year => (

                    <div
                        key={year.yearRelease}
                        style={styles.card}
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
        color: "white"
    }

};