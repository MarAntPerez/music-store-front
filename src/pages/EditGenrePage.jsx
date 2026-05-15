import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditGenrePage() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [genre, setGenre] = useState({
        genresName: ""
    });

    useEffect(() => {

        fetchGenres();

    }, [id]);

    const fetchGenres = async () => {

        try {

            const response = await axios.get(
                `http://localhost:8080/genres/${id}`
            );

            setGenre(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = e => {

        setGenre({
            ...genre,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await axios.put(
                `http://localhost:8080/genres/${id}`,
                genre
            );

            alert("Genero actualizado");

            navigate("/genres");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.formCard}>

                <h2 style={styles.title}>
                    ✏️ Editar Genero
                </h2>

                <form onSubmit={handleSubmit}>

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Genero
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="genresName"
                            value={genre.genresName}
                            onChange={handleChange}
                        />

                    </div>

                    <div style={styles.buttonContainer}>

                        <button
                            type="submit"
                            style={styles.saveButton}
                        >
                            💾 Guardar
                        </button>

                        <button
                            type="button"
                            style={styles.cancelButton}
                            onClick={() => navigate(-1)}
                        >
                            ❌ Cancelar
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EditGenrePage;

const styles = {

    container: {
        padding: "30px",
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
        maxWidth: "500px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
    },

    title: {
        textAlign: "center",
        marginBottom: "25px",
        fontSize: "28px"
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "18px"
    },

    label: {
        marginBottom: "6px",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#b3b3b3"
    },

    input: {
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        backgroundColor: "#282828",
        color: "white",
        fontSize: "14px"
    },

    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "25px"
    },

    saveButton: {
        padding: "10px 18px",
        backgroundColor: "#1db954",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    },

    cancelButton: {
        padding: "10px 18px",
        backgroundColor: "#535353",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.2s"
    }

};