import { useEffect, useState } from "react";
import axios from "axios";

function ArtistsPage() {

    const [artists, setArtists] = useState([]);

    useEffect(() => {

        fetchArtists();

    }, []);

    const fetchArtists = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/artists"
            );

            setArtists(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={{ padding: "20px" }}>

            <h2>🎤 Artists</h2>

            <div style={styles.grid}>

                {artists.map(artist => (

                    <div
                        key={artist.id}
                        style={styles.card}
                    >

                        <h3>
                            🎤 {artist.artistName}
                        </h3>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default ArtistsPage;

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