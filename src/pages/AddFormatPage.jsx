import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddFormatPage() {

    const navigate = useNavigate();

    const [format, setFormat] = useState({
        formatType: ""
    });

    const handleChange = e => {

        setFormat({
            ...format,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            await axios.post(
                "http://localhost:8080/formats",
                format
            );

            alert("Formato agregado correctamente");

            navigate("/formats");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={styles.container}>

            <div style={styles.formCard}>

                <h2 style={styles.title}>
                    ➕ Agregar Formato
                </h2>

                <form onSubmit={handleSubmit}>

                    <div style={styles.inputGroup}>

                        <label style={styles.label}>
                            Nombre del Formato
                        </label>

                        <input
                            style={styles.input}
                            type="text"
                            name="formatType"
                            value={format.formatType}
                            onChange={handleChange}
                            placeholder="Ingrese el nombre"
                            required
                        />

                    </div>

                    <div style={styles.buttonContainer}>

                        <button
                            type="submit"
                            style={styles.saveButton}

                            onMouseEnter={e =>
                                e.currentTarget.style.backgroundColor = "#17a74a"
                            }

                            onMouseLeave={e =>
                                e.currentTarget.style.backgroundColor = "#1db954"
                            }
                        >
                            💾 Guardar
                        </button>

                        <button
                            type="button"
                            style={styles.cancelButton}

                            onClick={() =>
                                navigate(-1)
                            }

                            onMouseEnter={e =>
                                e.currentTarget.style.backgroundColor = "#777"
                            }

                            onMouseLeave={e =>
                                e.currentTarget.style.backgroundColor = "#535353"
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

export default AddFormatPage;

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