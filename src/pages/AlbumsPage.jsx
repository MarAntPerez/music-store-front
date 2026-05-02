import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AlbumsPage() {

    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);

    useEffect(() => {

        fetchAlbums();

    }, []);

    const fetchAlbums = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/albums"
            );

            setAlbums(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <h2>🎵 Albums</h2>

            <div style={styles.grid}>

                {albums.map(album => (

                    <div
                        key={album.id}
                        style={styles.card}
                        onClick={() => navigate(`/albums/${album.id}`)}
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

                        <h3>{album.albumName}</h3>

                        <p>🎤 {album.artistName}</p>

                        <p>🎼 {album.genreName}</p>

                        <p>💿 {album.formatType}</p>

                        <p>📅 {album.yearRelease}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default AlbumsPage;

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
            "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "25px"
    },

    card: {
        backgroundColor: "#181818",
        borderRadius: "14px",
        padding: "15px",
        color: "white",
        cursor: "pointer"
    },

    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px"
    }

};