import { useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    return (

        <div style={styles.container}>

            {/* HERO */}

            <div style={styles.hero}>

                <div style={styles.overlay}>

                    <h1 style={styles.title}>
                        🎵 Music Store
                    </h1>

                    <p style={styles.subtitle}>
                        Descubre, administra y disfruta tu colección musical favorita
                    </p>

                    <div style={styles.buttons}>

                        <button
                            style={styles.primaryButton}
                            onClick={() => navigate("/albums")}
                        >
                            🎧 Explorar Álbumes
                        </button>

                        <button
                            style={styles.secondaryButton}
                            onClick={() => navigate("/artists")}
                        >
                            🎤 Ver Artistas
                        </button>

                    </div>

                </div>

            </div>

            {/* FEATURES */}

            <div style={styles.section}>

                <h2 style={styles.sectionTitle}>
                    Explora tu música
                </h2>

                <div style={styles.cards}>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/albums")}
                    >
                        <h3>💿 Álbumes</h3>

                        <p>
                            Explora todos los álbumes disponibles.
                        </p>
                    </div>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/artists")}
                    >
                        <h3>🎤 Artistas</h3>

                        <p>
                            Descubre artistas y bandas.
                        </p>
                    </div>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/genres")}
                    >
                        <h3>🎼 Géneros</h3>

                        <p>
                            Navega por géneros musicales.
                        </p>
                    </div>

                    <div
                        style={styles.card}
                        onClick={() => navigate("/inventory")}
                    >
                        <h3>📦 Inventario</h3>

                        <p>
                            Administra existencias y ventas.
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default HomePage;

const styles = {

    container: {
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
        paddingTop: "80px"
    },

    hero: {
        height: "75vh",
        backgroundImage:
            "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px"
    },

    overlay: {
        maxWidth: "700px"
    },

    title: {
        fontSize: "70px",
        marginBottom: "20px",
        color: "#1DB954",
        textShadow: "0 4px 10px rgba(0,0,0,0.5)"
    },

    subtitle: {
        fontSize: "22px",
        color: "#d1d1d1",
        marginBottom: "35px",
        lineHeight: "1.5"
    },

    buttons: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap"
    },

    primaryButton: {
        padding: "14px 28px",
        backgroundColor: "#1DB954",
        border: "none",
        borderRadius: "30px",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
    },

    secondaryButton: {
        padding: "14px 28px",
        backgroundColor: "transparent",
        border: "2px solid white",
        borderRadius: "30px",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "0.3s"
    },

    section: {
        padding: "60px 40px"
    },

    sectionTitle: {
        fontSize: "34px",
        marginBottom: "30px"
    },

    cards: {
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "25px"
    },

    card: {
        backgroundColor: "#181818",
        padding: "30px",
        borderRadius: "18px",
        cursor: "pointer",
        transition: "0.3s",
        boxShadow: "0 4px 12px rgba(0,0,0,0.4)"
    }

};