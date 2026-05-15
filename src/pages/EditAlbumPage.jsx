import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditAlbumPage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [album, setAlbum] = useState({

        albumName: "",
        artistId: "",
        genreId: "",
        formatId: "",
        yearRelease: "",
        stock: "",
        cost: ""

    });

    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [years, setYears] = useState([]);

    const [newArtist, setNewArtist] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newFormat, setNewFormat] = useState("");
    const [newYear, setNewYear] = useState("");

    useEffect(() => {

        fetchData();

    }, [id]);

    const fetchData = async () => {

        try {

            const [
                albumResponse,
                artistsResponse,
                genresResponse,
                formatsResponse,
                yearsResponse
            ] = await Promise.all([

                axios.get(
                    `http://localhost:8080/albums/${id}`
                ),

                axios.get(
                    "http://localhost:8080/artists"
                ),

                axios.get(
                    "http://localhost:8080/genres"
                ),

                axios.get(
                    "http://localhost:8080/formats"
                ),

                axios.get(
                    "http://localhost:8080/albums/years"
                )

            ]);

            setAlbum({

                albumName:
                    albumResponse.data.albumName,

                artistId:
                    albumResponse.data.artistId,

                genreId:
                    albumResponse.data.genreId,

                formatId:
                    albumResponse.data.formatId,

                yearRelease:
                    albumResponse.data.yearRelease,

                stock:
                    albumResponse.data.stock,

                cost:
                    albumResponse.data.cost

            });

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

            [e.target.name]:
                e.target.value

        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            let artistId =
                album.artistId;

            let genreId =
                album.genreId;

            let formatId =
                album.formatId;

            let yearRelease =
                album.yearRelease;

            // NUEVO ARTISTA
            if (newArtist !== "") {

                const response =
                    await axios.post(
                        "http://localhost:8080/artists",
                        {
                            artistName: newArtist
                        }
                    );

                artistId =
                    response.data.id;

            }

            // NUEVO GENERO
            if (newGenre !== "") {

                const response =
                    await axios.post(
                        "http://localhost:8080/genres",
                        {
                            genresName: newGenre
                        }
                    );

                genreId =
                    response.data.id;

            }

            // NUEVO FORMATO
            if (newFormat !== "") {

                const response =
                    await axios.post(
                        "http://localhost:8080/formats",
                        {
                            formatType: newFormat
                        }
                    );

                formatId =
                    response.data.id;

            }

            // NUEVO AÑO
            if (newYear !== "") {

                if (!/^\d{4}$/.test(newYear)) {

                    alert(
                        "El año debe tener 4 dígitos"
                    );

                    return;

                }

                yearRelease =
                    parseInt(newYear);

            }

            const updatedAlbum = {

                albumName:
                    album.albumName,

                artistId,

                genreId,

                formatId,

                yearRelease,

                stock:
                    album.stock,

                cost:
                    album.cost

            };

            await axios.put(

                `http://localhost:8080/albums/${id}`,

                updatedAlbum

            );

            alert(
                "Álbum actualizado correctamente"
            );

            navigate(`/albums/${id}`);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.formCard}>

                <h2 style={styles.title}>
                    ✏️ Editar Álbum
                </h2>

                <form
                    onSubmit={handleSubmit}
                    style={styles.form}
                >

                    <div
                        style={styles.fullWidth}
                    >

                        <label style={styles.label}>
                            Nombre del Álbum
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="albumName"
                            value={album.albumName}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* ARTISTA */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Artista
                        </label>

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
                            disabled={
                                album.artistId !== ""
                            }
                            onChange={e =>
                                setNewArtist(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* GENERO */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Género
                        </label>

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
                            disabled={
                                album.genreId !== ""
                            }
                            onChange={e =>
                                setNewGenre(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* FORMATO */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Formato
                        </label>

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
                            placeholder="Agregar Formato"
                            value={newFormat}
                            disabled={
                                album.formatId !== ""
                            }
                            onChange={e =>
                                setNewFormat(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                    {/* AÑO */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Año
                        </label>

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
                                    value={
                                        year.yearRelease
                                    }
                                >
                                    {year.yearRelease}
                                </option>

                            ))}

                        </select>

                        <input
                            style={styles.input}
                            type="text"
                            placeholder="Agregar Año"
                            value={newYear}
                            maxLength={4}
                            disabled={
                                album.yearRelease !== ""
                            }
                            onChange={e => {

                                const value =
                                    e.target.value;

                                if (
                                    /^\d{0,4}$/.test(value)
                                ) {

                                    setNewYear(value);

                                }

                            }}
                        />

                    </div>

                    {/* STOCK */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Stock
                        </label>

                        <input
                            style={styles.input}
                            type="number"
                            name="stock"
                            value={album.stock}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* PRECIO */}

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Precio
                        </label>

                        <input
                            style={styles.input}
                            type="number"
                            step="0.01"
                            name="cost"
                            value={album.cost}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div
                        style={styles.buttonContainer}
                    >

                        <button
                            type="submit"
                            style={styles.saveButton}
                        >
                            💾 Guardar
                        </button>

                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() =>
                                navigate(-1)
                            }
                        >
                            ❌ Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditAlbumPage;

const styles = {

    container: {
        padding: "30px",
        paddingTop: "110px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    formCard: {
        backgroundColor: "#181818",
        padding: "30px",
        borderRadius: "14px",
        width: "100%",
        maxWidth: "900px",
        boxShadow:
            "0 4px 15px rgba(0,0,0,0.5)"
    },

    form: {
        display: "grid",
        gridTemplateColumns:
            "1fr 1fr",
        gap: "20px"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "28px",
        gridColumn: "1 / 3"
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column"
    },

    label: {
        marginBottom: "6px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#b3b3b3"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        backgroundColor: "#282828",
        color: "white",
        fontSize: "14px",
        marginBottom: "10px"
    },

    fullWidth: {
        gridColumn: "1 / 3"
    },

    buttonContainer: {
        gridColumn: "1 / 3",
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px"
    },

    saveButton: {
        padding: "12px 20px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    },

    cancelButton: {
        padding: "12px 20px",
        backgroundColor: "#535353",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer"
    }

};