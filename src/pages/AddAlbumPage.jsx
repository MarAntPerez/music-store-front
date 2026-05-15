import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAlbumPage() {

    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [years, setYears] = useState([]);
    const [imageFile, setImageFile] = useState(null);

    const [album, setAlbum] = useState({
        albumName: "",
        yearRelease: "",
        artistId: "",
        genreId: "",
        formatId: "",
        imageUrl: "",
        cost: "",
        stock: ""
    });

    const [newArtist, setNewArtist] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newFormat, setNewFormat] = useState("");
    const [newYear, setNewYear] = useState("");

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const [
                artistsResponse,
                genresResponse,
                formatsResponse,
                yearsResponse
            ] = await Promise.all([
                axios.get("http://localhost:8080/artists"),
                axios.get("http://localhost:8080/genres"),
                axios.get("http://localhost:8080/formats"),
                axios.get("http://localhost:8080/albums/years")
            ]);

            setArtists(artistsResponse.data);
            setGenres(genresResponse.data);
            setFormats(formatsResponse.data);
            setYears(yearsResponse.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = e => {

        setAlbum({
            ...album,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            let artistId = album.artistId;
            let genreId = album.genreId;
            let formatId = album.formatId;

            if (newArtist !== "") {

                const response = await axios.post(
                    "http://localhost:8080/artists",
                    {
                        artistName: newArtist
                    }
                );

                artistId = response.data.id;

            }

            if (newGenre !== "") {

                const response = await axios.post(
                    "http://localhost:8080/genres",
                    {
                        genresName: newGenre
                    }
                );

                genreId = response.data.id;

            }

            if (newFormat !== "") {

                const response = await axios.post(
                    "http://localhost:8080/formats",
                    {
                        formatType: newFormat
                    }
                );

                formatId = response.data.id;

            }

            let yearRelease = album.yearRelease;

            if (newYear !== "") {

                if (!/^\d{4}$/.test(newYear)) {

                    alert("El año debe contener exactamente 4 números");

                    return;

                }

                const currentYear = new Date().getFullYear();

                const numericYear = parseInt(newYear);

                if (
                    numericYear < 1900 ||
                    numericYear > currentYear
                ) {

                    alert(
                        `El año debe estar entre 1900 y ${currentYear}`
                    );

                    return;

                }

                yearRelease = numericYear;

            }

            const formData = new FormData();

            formData.append("albumName", album.albumName);
            formData.append("yearRelease", yearRelease);

            formData.append("artistId", artistId);
            formData.append("genreId", genreId);
            formData.append("formatId", formatId);

            formData.append("cost", album.cost);
            formData.append("stock", album.stock);

            if (imageFile) {

                formData.append("image", imageFile);

            }

            await axios.post(
                "http://localhost:8080/albums",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("Album creado con éxito");

            navigate("/albums");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.card}>

                <h2>Agregar Álbum</h2>

                <form onSubmit={handleSubmit}>

                    <div style={styles.grid}>

                        <div style={styles.fullWidth}>

                            <input
                                style={styles.input}
                                type="text"
                                name="albumName"
                                placeholder="Nombre del Álbum"
                                value={album.albumName}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <select
                                style={styles.input}
                                name="artistId"
                                value={album.artistId}
                                onChange={handleChange}
                                disabled={newArtist !== ""}
                            >
                                <option value="">
                                    Seleccionar Artista
                                </option>

                                {artists.map(artist => (

                                    <option
                                        key={artist.id}
                                        value={artist.id}
                                    >
                                        {artist.artistName}
                                    </option>

                                ))}

                            </select>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Agregar Artista"
                                value={newArtist}
                                disabled={album.artistId !== ""}
                                onChange={e =>
                                    setNewArtist(e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <select
                                style={styles.input}
                                name="genreId"
                                value={album.genreId}
                                onChange={handleChange}
                                disabled={newGenre !== ""}
                            >
                                <option value="">
                                    Seleccionar Género
                                </option>

                                {genres.map(genre => (

                                    <option
                                        key={genre.id}
                                        value={genre.id}
                                    >
                                        {genre.genresName}
                                    </option>

                                ))}

                            </select>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Agregar Género"
                                value={newGenre}
                                disabled={album.genreId !== ""}
                                onChange={e =>
                                    setNewGenre(e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <select
                                style={styles.input}
                                name="formatId"
                                value={album.formatId}
                                onChange={handleChange}
                                disabled={newFormat !== ""}
                            >
                                <option value="">
                                    Seleccionar Formato
                                </option>

                                {formats.map(format => (

                                    <option
                                        key={format.id}
                                        value={format.id}
                                    >
                                        {format.formatType}
                                    </option>

                                ))}

                            </select>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Crear Formato"
                                value={newFormat}
                                disabled={album.formatId !== ""}
                                onChange={e =>
                                    setNewFormat(e.target.value)
                                }
                            />

                        </div>

                        <div>

                            <select
                                style={styles.input}
                                name="yearRelease"
                                value={album.yearRelease}
                                onChange={handleChange}
                                disabled={newYear !== ""}
                            >
                                <option value="">
                                    Seleccionar Año
                                </option>

                                {years.map(year => (

                                    <option
                                        key={year.yearRelease}
                                        value={year.yearRelease}
                                    >
                                        {year.yearRelease}
                                    </option>

                                ))}

                            </select>

                            <input
                                style={styles.input}
                                type="text"
                                placeholder="Ingresar Año"
                                value={newYear}
                                maxLength={4}
                                disabled={album.yearRelease !== ""}
                                onChange={e => {

                                    const value = e.target.value;

                                    if (/^\d{0,4}$/.test(value)) {

                                        setNewYear(value);

                                    }

                                }}
                            />

                        </div>

                        <div style={styles.fullWidth}>

                            <label style={styles.label}>
                                Portada
                            </label>

                            <input
                                style={styles.input}
                                type="file"
                                accept="image/*"
                                onChange={e =>
                                    setImageFile(e.target.files[0])
                                }
                            />

                        </div>

                        <div>

                            <label style={styles.label}>
                                Precio
                            </label>

                            <input
                                style={styles.input}
                                type="number"
                                name="cost"
                                value={album.cost}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <label style={styles.label}>
                                Stock
                            </label>

                            <input
                                style={styles.input}
                                type="number"
                                name="stock"
                                value={album.stock}
                                onChange={handleChange}
                            />

                        </div>

                        <div style={styles.fullWidth}>

                            <button
                                style={styles.button}
                                type="submit"
                            >
                                💾 Guardar Álbum
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AddAlbumPage;

const styles = {

    container: {
        minHeight: "100vh",
        backgroundColor: "#121212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        paddingTop: "110px"
    },

    card: {
        backgroundColor: "#181818",
        padding: "30px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "850px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        color: "white"
    },

    input: {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#282828",
        color: "white",
        marginBottom: "10px",
        transition: "0.2s"
    },

    button: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#1db954",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px"
    },

    fullWidth: {
        gridColumn: "1 / 3"
    },

};