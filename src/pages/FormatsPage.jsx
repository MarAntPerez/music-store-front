import { useEffect, useState } from "react";
import axios from "axios";

function FormatsPage() {

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

        <div style={{ padding: "20px" }}>

            <h2>💿 Formats</h2>

            <div style={styles.grid}>

                {formats.map(format => (

                    <div
                        key={format.id}
                        style={styles.card}
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