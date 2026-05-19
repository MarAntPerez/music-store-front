import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Map genre keywords to a color accent and a decorative symbol
const getGenreStyle = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("jazz")) return { color: "#C9A84C", symbol: "♩", label: "JAZZ" };
    if (n.includes("rock")) return { color: "#E07B8B", symbol: "♟", label: "ROCK" };
    if (n.includes("clás") || n.includes("clas")) return { color: "#7B9FE0", symbol: "𝄞", label: "CLÁSICA" };
    if (n.includes("electr")) return { color: "#7BE0A0", symbol: "◈", label: "ELECTRÓNICA" };
    if (n.includes("pop")) return { color: "#E07B8B", symbol: "✦", label: "POP" };
    if (n.includes("soul") || n.includes("r&b")) return { color: "#C9A84C", symbol: "♥", label: "SOUL" };
    if (n.includes("hip") || n.includes("rap")) return { color: "#B48CDC", symbol: "▲", label: "HIP-HOP" };
    if (n.includes("blues")) return { color: "#7B9FE0", symbol: "♭", label: "BLUES" };
    if (n.includes("reggae")) return { color: "#7BE0A0", symbol: "☀", label: "REGGAE" };
    if (n.includes("country")) return { color: "#C9A84C", symbol: "◎", label: "COUNTRY" };
    if (n.includes("metal")) return { color: "#888", symbol: "✕", label: "METAL" };
    if (n.includes("folk")) return { color: "#A8C97B", symbol: "♪", label: "FOLK" };
    if (n.includes("latin") || n.includes("latin")) return { color: "#E0A87B", symbol: "♫", label: "LATINA" };

    // Fallback — cycle by char code
    const palette = [
        { color: "#C9A84C", symbol: "♩" },
        { color: "#E07B8B", symbol: "♪" },
        { color: "#7B9FE0", symbol: "♫" },
        { color: "#7BE0A0", symbol: "♬" },
        { color: "#B48CDC", symbol: "𝄞" },
    ];
    return palette[name.charCodeAt(0) % palette.length];
};

function GenresPage() {
    const navigate = useNavigate();
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/genres");
            setGenres(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>EXPLORAR POR</p>
                    <h1 style={styles.title}>
                        Géneros <em style={styles.titleItalic}>Musicales</em>
                    </h1>
                    {!loading && (
                        <p style={styles.count}>{genres.length} géneros en catálogo</p>
                    )}
                </div>
                <button
                    style={styles.addButton}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "#D4B05A";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "#C9A84C";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                    onClick={() => navigate("/genres/new")}
                >
                    <span style={styles.addIcon}>+</span>
                    Agregar Género
                </button>
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando géneros...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && genres.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>🎼</p>
                    <p style={styles.emptyTitle}>Sin géneros registrados</p>
                    <p style={styles.emptyDesc}>Agrega el primer género a tu catálogo.</p>
                </div>
            )}

            {/* GRID */}
            {!loading && genres.length > 0 && (
                <div style={styles.grid}>
                    {genres.map((genre, index) => {
                        const gs = getGenreStyle(genre.genresName);
                        const isHovered = hoveredId === genre.id;

                        return (
                            <div
                                key={genre.id}
                                style={{
                                    ...styles.card,
                                    ...(isHovered ? {
                                        ...styles.cardHovered,
                                        borderColor: `${gs.color}40`,
                                        boxShadow: `inset 0 0 0 1px ${gs.color}20`,
                                    } : {}),
                                }}
                                onClick={() => navigate(`/genre/${genre.id}`)}
                                onMouseEnter={() => setHoveredId(genre.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* BIG DECORATIVE SYMBOL */}
                                <span style={{
                                    ...styles.symbol,
                                    color: gs.color,
                                    opacity: isHovered ? 0.18 : 0.08,
                                }}>
                                    {gs.symbol}
                                </span>

                                {/* CONTENT */}
                                <div style={styles.cardContent}>
                                    {/* COLOR BAR */}
                                    <div style={{
                                        ...styles.colorBar,
                                        background: gs.color,
                                    }} />

                                    <div style={styles.cardBody}>
                                        <div>
                                            <p style={{ ...styles.genreLabel, color: gs.color }}>
                                                {gs.label || genre.genresName.toUpperCase()}
                                            </p>
                                            <h3 style={styles.genreName}>{genre.genresName}</h3>
                                        </div>
                                        <span style={{
                                            ...styles.arrow,
                                            color: gs.color,
                                            opacity: isHovered ? 1 : 0,
                                            transform: isHovered ? "translateX(0)" : "translateX(-6px)",
                                        }}>
                                            →
                                        </span>
                                    </div>
                                </div>

                                {/* INDEX */}
                                <span style={styles.indexNum}>
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default GenresPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
    },

    /* HEADER */
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "28px",
    },
    eyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "10px",
    },
    title: {
        fontSize: "42px",
        fontWeight: "300",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 8px",
        lineHeight: "1.1",
    },
    titleItalic: {
        fontStyle: "italic",
        color: "#C9A84C",
    },
    count: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.35)",
        margin: 0,
        letterSpacing: "0.05em",
    },
    addButton: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#C9A84C",
        border: "none",
        borderRadius: "2px",
        color: "#0D0D0D",
        fontWeight: "700",
        fontSize: "12px",
        letterSpacing: "0.12em",
        cursor: "pointer",
        padding: "12px 24px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
    },
    addIcon: {
        fontSize: "16px",
        fontWeight: "400",
        lineHeight: 1,
    },

    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "40px",
    },

    /* LOADING */
    loadingWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px 0",
        gap: "16px",
    },
    loadingSpinner: {
        width: "32px",
        height: "32px",
        borderRadius: "50%",
        border: "2px solid rgba(201,168,76,0.15)",
        borderTop: "2px solid #C9A84C",
        animation: "spin 0.9s linear infinite",
    },
    loadingText: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.3)",
        letterSpacing: "0.1em",
    },

    /* EMPTY */
    emptyState: {
        textAlign: "center",
        padding: "100px 0",
    },
    emptyIcon: {
        fontSize: "48px",
        marginBottom: "16px",
        opacity: 0.3,
    },
    emptyTitle: {
        fontSize: "22px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        fontStyle: "italic",
        color: "rgba(240,237,230,0.5)",
        marginBottom: "10px",
    },
    emptyDesc: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.25)",
        letterSpacing: "0.05em",
    },

    /* GRID */
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "2px",
    },

    /* CARD */
    card: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "3px",
        cursor: "pointer",
        transition: "all 0.28s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    cardHovered: {
        background: "#151515",
        transform: "translateY(-3px)",
    },

    /* BIG DECORATIVE SYMBOL */
    symbol: {
        position: "absolute",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "96px",
        lineHeight: 1,
        pointerEvents: "none",
        transition: "opacity 0.3s ease",
        fontFamily: "Georgia, serif",
        userSelect: "none",
    },

    cardContent: {
        display: "flex",
        flex: 1,
    },
    colorBar: {
        width: "3px",
        flexShrink: 0,
        borderRadius: "3px 0 0 3px",
        opacity: 0.7,
    },
    cardBody: {
        padding: "24px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: "12px",
    },

    genreLabel: {
        fontSize: "9px",
        letterSpacing: "0.25em",
        marginBottom: "6px",
        fontFamily: "Arial, sans-serif",
    },
    genreName: {
        fontSize: "18px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: 0,
        lineHeight: "1.2",
    },

    arrow: {
        fontSize: "18px",
        transition: "all 0.28s ease",
        flexShrink: 0,
    },

    indexNum: {
        position: "absolute",
        bottom: "10px",
        right: "14px",
        fontSize: "9px",
        letterSpacing: "0.1em",
        color: "rgba(240,237,230,0.1)",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
    },
};

if (typeof document !== "undefined") {
    const s = document.createElement("style");
    s.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    if (!document.head.querySelector("[data-vr-spin]")) {
        s.setAttribute("data-vr-spin", "1");
        document.head.appendChild(s);
    }
}