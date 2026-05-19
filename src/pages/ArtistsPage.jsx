import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ArtistsPage() {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => {
        fetchArtists();
    }, []);

    const fetchArtists = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/artists");
            setArtists(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Generate initials avatar background color from name
    const getAvatarColor = (name = "") => {
        const colors = [
            { bg: "rgba(201,168,76,0.12)", border: "rgba(201,168,76,0.3)", text: "#C9A84C" },
            { bg: "rgba(224,123,139,0.12)", border: "rgba(224,123,139,0.3)", text: "#E07B8B" },
            { bg: "rgba(123,159,224,0.12)", border: "rgba(123,159,224,0.3)", text: "#7B9FE0" },
            { bg: "rgba(123,224,160,0.12)", border: "rgba(123,224,160,0.3)", text: "#7BE0A0" },
            { bg: "rgba(180,140,220,0.12)", border: "rgba(180,140,220,0.3)", text: "#B48CDC" },
        ];
        const idx = name.charCodeAt(0) % colors.length;
        return colors[idx];
    };

    const getInitials = (name = "") => {
        return name
            .split(" ")
            .slice(0, 2)
            .map(w => w[0])
            .join("")
            .toUpperCase();
    };

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>DIRECTORIO MUSICAL</p>
                    <h1 style={styles.title}>
                        Nuestros <em style={styles.titleItalic}>Artistas</em>
                    </h1>
                    {!loading && (
                        <p style={styles.count}>{artists.length} artistas en catálogo</p>
                    )}
                </div>

                <div style={styles.buttonGroup}>
                    <button
                        style={styles.featuredButton}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(201,168,76,0.12)";
                            e.currentTarget.style.borderColor = "rgba(201,168,76,0.6)";
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)";
                        }}
                        onClick={() => navigate("/top-artists")}
                    >
                        ★ Destacados
                    </button>
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
                        onClick={() => navigate("/artists/new")}
                    >
                        <span style={styles.addIcon}>+</span>
                        Agregar Artista
                    </button>
                </div>
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando artistas...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && artists.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>🎤</p>
                    <p style={styles.emptyTitle}>Sin artistas registrados</p>
                    <p style={styles.emptyDesc}>Agrega el primer artista a tu directorio.</p>
                </div>
            )}

            {/* GRID */}
            {!loading && artists.length > 0 && (
                <div style={styles.grid}>
                    {artists.map((artist, index) => {
                        const color = getAvatarColor(artist.artistName);
                        const initials = getInitials(artist.artistName);
                        const isHovered = hoveredId === artist.id;

                        return (
                            <div
                                key={artist.id}
                                style={{
                                    ...styles.card,
                                    ...(isHovered ? styles.cardHovered : {}),
                                    animationDelay: `${index * 30}ms`,
                                }}
                                onClick={() => navigate(`/artist/${artist.id}`)}
                                onMouseEnter={() => setHoveredId(artist.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* AVATAR */}
                                <div style={{
                                    ...styles.avatar,
                                    background: color.bg,
                                    border: `1px solid ${color.border}`,
                                }}>
                                    <span style={{ ...styles.avatarText, color: color.text }}>
                                        {initials}
                                    </span>
                                </div>

                                {/* NAME */}
                                <div style={styles.cardBody}>
                                    <h3 style={styles.artistName}>{artist.artistName}</h3>
                                    <span style={{
                                        ...styles.arrow,
                                        opacity: isHovered ? 1 : 0,
                                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                                    }}>→</span>
                                </div>

                                {/* INDEX NUMBER */}
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

export default ArtistsPage;

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
    buttonGroup: {
        display: "flex",
        gap: "12px",
        alignItems: "center",
    },
    featuredButton: {
        background: "transparent",
        border: "1px solid rgba(201,168,76,0.35)",
        borderRadius: "2px",
        color: "#C9A84C",
        fontWeight: "400",
        fontSize: "12px",
        letterSpacing: "0.12em",
        cursor: "pointer",
        padding: "11px 20px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, border-color 0.2s",
        whiteSpace: "nowrap",
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
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "2px",
    },

    /* CARD */
    card: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "3px",
        padding: "24px 22px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        position: "relative",
        overflow: "hidden",
    },
    cardHovered: {
        background: "#161616",
        border: "1px solid rgba(201,168,76,0.2)",
        transform: "translateY(-2px)",
    },

    avatar: {
        width: "46px",
        height: "46px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    avatarText: {
        fontSize: "14px",
        fontWeight: "600",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.05em",
    },

    cardBody: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 0,
    },
    artistName: {
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: 0,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    arrow: {
        color: "#C9A84C",
        fontSize: "16px",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        flexShrink: 0,
        marginLeft: "8px",
    },

    indexNum: {
        position: "absolute",
        top: "10px",
        right: "14px",
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "rgba(240,237,230,0.12)",
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