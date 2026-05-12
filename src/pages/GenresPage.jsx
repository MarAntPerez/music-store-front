import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GenresPage() {

    const navigate = useNavigate();

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

        <div style={styles.container}>

            <h2>Generos</h2>

            <div style={styles.grid}>

                {genres.map(genre => (

                    <div
                        key={genre.id}
                        style={styles.card}
                        onClick={() =>
                            navigate(`/genre/${genre.id}`)
                        }

                        onMouseEnter={e =>
                            e.currentTarget.style.backgroundColor = "#282828"
                        }

                        onMouseLeave={e =>
                            e.currentTarget.style.backgroundColor = "#181818"
                        }
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
    }

};