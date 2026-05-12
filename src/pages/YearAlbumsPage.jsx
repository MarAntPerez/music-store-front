import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function YearAlbumsPage() {

    const { year } = useParams();
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        fetchAlbums();

    }, [year]);

    const fetchAlbums = async () => {

        try {

            const response =
                await axios.get(
                    `http://localhost:8080/albums/year/${year}`
                );

            setAlbums(response.data);

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
                ⬅ Back
            </button>

            <h2 style={styles.title}>
                Albunes de {year}
            </h2>

            <div style={styles.line}></div>

            <div style={styles.grid}>

                {albums.map(album => (

                    <div
                        key={album.id}
                        style={styles.card}

                        onClick={() =>
                            navigate(`/albums/${album.id}`)
                        }

                        onMouseEnter={e =>
                            e.currentTarget.style.backgroundColor = "#282828"
                        }

                        onMouseLeave={e =>
                            e.currentTarget.style.backgroundColor = "#181818"
                        }
                    >

                        <img
                            src={
                                album.imageUrl
                                    ? `http://localhost:8080/images/${album.imageUrl}`
                                    : "https://via.placeholder.com/200"
                            }

                            alt={album.albumName}

                            style={styles.image}
                        />

                        <h3>
                            {album.albumName}
                        </h3>

                        <p>
                            🎤 {album.artistName}
                        </p>

                        <p>
                            📅 {album.yearRelease}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default YearAlbumsPage;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
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

    title: {
        textAlign: "center",
        fontSize: "32px",
        fontWeight: "bold",
        marginBottom: "10px"
    },

    line: {
        width: "120px",
        height: "4px",
        backgroundColor: "#1db954",
        margin: "0 auto 25px auto",
        borderRadius: "5px"
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
        textAlign: "center",
        cursor: "pointer",
        transition: "0.2s"
    },

    image: {
        width: "100%",
        borderRadius: "10px",
        marginBottom: "10px"
    }

};