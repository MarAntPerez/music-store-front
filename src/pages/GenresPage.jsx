import { useEffect, useState } from "react";
import axios from "axios";

function GenresPage() {

    const [genres, setGenres] = useState([]);

    useEffect(() => {

        fetchGenres();

    }, []);

    const fetchGenres = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/genres"
            );

            setGenres(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>🎼 Genres</h2>

            <div style={styles.grid}>

                {genres.map(genre => (

                    <div
                        key={genre.id}
                        style={styles.card}
                    >

                        <h3>
                            🎼 {genre.genresName}
                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default GenresPage;

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