import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const handleSearch = e => {

        const value = e.target.value;

        setSearch(value);

        navigate(`/albums?search=${value}`);

    };

    return (

        <nav style={styles.navbar}>

            <Link
                to="/"
                style={{ textDecoration: "none" }}
            >

                <h2 style={styles.logo}>
                    🎵 Music Store
                </h2>

            </Link>

            <input
                type="text"
                placeholder="Buscar álbum, artista, género..."
                value={search}
                onChange={handleSearch}
                style={styles.searchInput}
            />

            <div style={styles.links}>

                <Link to="/albums" style={styles.link}>
                    Álbumes
                </Link>

                <Link to="/artists" style={styles.link}>
                    Artistas
                </Link>

                <Link to="/genres" style={styles.link}>
                    Géneros
                </Link>

                <Link to="/formats" style={styles.link}>
                    Formatos
                </Link>

                <Link to="/years" style={styles.link}>
                    Años
                </Link>

                <Link to="/availability" style={styles.link}>
                    Disponibilidad
                </Link>

                <Link to="/inventory" style={styles.link}>
                    Inventario
                </Link>

                <Link to="/cart" style={styles.link}>
                    Carrito
                </Link>

            </div>

        </nav>

    );

}

export default Navbar;

const styles = {

    navbar: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "#1DB954",
        boxSizing: "border-box",
        boxShadow: "0 2px 10px rgba(0,0,0,0.4)"
    },

    logo: {
        margin: 0,
        color: "white",
        whiteSpace: "nowrap"
    },

    searchInput: {
        width: "350px",
        padding: "10px 15px",
        borderRadius: "25px",
        border: "none",
        outline: "none",
        fontSize: "14px",
        backgroundColor: "white"
    },

    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center"
    },

    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "bold",
        whiteSpace: "nowrap"
    }

};