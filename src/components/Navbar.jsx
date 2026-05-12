import { Link } from "react-router-dom";

function Navbar() {

    return (

        <nav style={styles.navbar}>

            <Link to="/" style={{ textDecoration: "none" }}>
                <h2 style={styles.logo}>
                    🎵 Music Store
                </h2>
            </Link>

            <div style={styles.links}>

                <Link to="/albums" style={styles.link}>Albumnes</Link>

                <Link to="/artists" style={styles.link}>Artistas</Link>

                <Link to="/genres" style={styles.link}>Generos</Link>

                <Link to="/formats" style={styles.link}>Formatos</Link>

                <Link to="/years" style={styles.link}>Años</Link>

                <Link to="/availability" style={styles.link}>Disponibilidad</Link>

                <Link to="/inventory" style={styles.link}>Inventario</Link>

                <Link to="/cart" style={styles.link}>Carrito</Link>

            </div>

        </nav>

    );

}

export default Navbar;

const styles = {

    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1DB954"
    },

    logo: {
        margin: 0,
        color: "white"
    },

    links: {
        display: "flex",
        gap: "20px"
    },

    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold"
    }

};