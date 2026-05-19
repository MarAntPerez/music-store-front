import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = e => {
        const value = e.target.value;
        setSearch(value);
        navigate(`/albums?search=${value}`);
    };

    const isActive = path => location.pathname === path;

    return (
        <nav style={{ ...styles.navbar, ...(scrolled ? styles.navbarScrolled : {}) }}>

            {/* LOGO */}
            <Link to="/" style={styles.logoLink}>
                <span style={styles.logoAccent}>V</span>
                <span style={styles.logoMain}>ELVET</span>
                <span style={styles.logoThin}> RECORDS</span>
            </Link>

            {/* LINKS */}
            <div style={styles.links}>
                {[
                    { to: "/albums", label: "Álbumes" },
                    { to: "/artists", label: "Artistas" },
                    { to: "/genres", label: "Géneros" },
                    { to: "/formats", label: "Formatos" },
                    { to: "/years", label: "Años" },
                    { to: "/availability", label: "Disponibilidad" },
                    { to: "/inventory", label: "Inventario" },
                ].map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        style={{
                            ...styles.link,
                            ...(isActive(to) ? styles.linkActive : {}),
                        }}
                    >
                        {label}
                        {isActive(to) && <span style={styles.activeDot} />}
                    </Link>
                ))}
            </div>

            {/* RIGHT: SEARCH + CART */}
            <div style={styles.right}>
                <div style={{
                    ...styles.searchWrap,
                    ...(searchFocused ? styles.searchWrapFocused : {}),
                }}>
                    <svg style={styles.searchIcon} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="8.5" cy="8.5" r="5.5" />
                        <line x1="13" y1="13" x2="18" y2="18" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Buscar álbum, artista, género..."
                        value={search}
                        onChange={handleSearch}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        style={styles.searchInput}
                    />
                </div>

                <Link to="/cart" style={styles.cartBtn}>
                    <svg style={styles.cartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <span style={styles.cartLabel}>Carrito</span>
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: "64px",
        boxSizing: "border-box",
        background: "rgba(13,13,13,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        transition: "background 0.4s ease, border-color 0.4s ease",
        gap: "24px",
    },

    navbarScrolled: {
        background: "rgba(13,13,13,0.97)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
    },

    /* LOGO */
    logoLink: {
        textDecoration: "none",
        display: "flex",
        alignItems: "baseline",
        gap: "0",
        flexShrink: 0,
    },
    logoAccent: {
        color: "#C9A84C",
        fontSize: "18px",
        fontWeight: "700",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.05em",
    },
    logoMain: {
        color: "#F0EDE6",
        fontSize: "18px",
        fontWeight: "700",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.2em",
    },
    logoThin: {
        color: "rgba(240,237,230,0.55)",
        fontSize: "13px",
        fontWeight: "300",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.25em",
    },

    /* LINKS */
    links: {
        display: "flex",
        alignItems: "center",
        gap: "2px",
        flex: 1,
        justifyContent: "center",
    },
    link: {
        color: "rgba(240,237,230,0.5)",
        textDecoration: "none",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "6px 10px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
        whiteSpace: "nowrap",
        transition: "color 0.2s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
    },
    linkActive: {
        color: "#F0EDE6",
    },
    activeDot: {
        width: "3px",
        height: "3px",
        borderRadius: "50%",
        background: "#C9A84C",
        display: "block",
    },

    /* RIGHT */
    right: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexShrink: 0,
    },

    /* SEARCH */
    searchWrap: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        padding: "0 14px",
        height: "34px",
        width: "220px",
        transition: "border-color 0.2s, background 0.2s, width 0.3s ease",
    },
    searchWrapFocused: {
        borderColor: "rgba(201,168,76,0.45)",
        background: "rgba(201,168,76,0.04)",
        width: "280px",
    },
    searchIcon: {
        width: "14px",
        height: "14px",
        color: "rgba(240,237,230,0.3)",
        flexShrink: 0,
    },
    searchInput: {
        background: "none",
        border: "none",
        outline: "none",
        color: "#F0EDE6",
        fontSize: "12px",
        letterSpacing: "0.04em",
        width: "100%",
        fontFamily: "Arial, sans-serif",
    },

    /* CART */
    cartBtn: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        background: "none",
        border: "1px solid rgba(201,168,76,0.35)",
        color: "#C9A84C",
        padding: "0 14px",
        height: "34px",
        borderRadius: "2px",
        textDecoration: "none",
        fontSize: "11px",
        letterSpacing: "0.1em",
        fontFamily: "Arial, sans-serif",
        whiteSpace: "nowrap",
        transition: "background 0.2s, border-color 0.2s",
        cursor: "pointer",
    },
    cartIcon: {
        width: "15px",
        height: "15px",
        flexShrink: 0,
    },
    cartLabel: {
        fontSize: "11px",
        letterSpacing: "0.1em",
    },
};