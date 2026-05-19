import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TopArtistsPage() {
    const navigate = useNavigate();
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => { fetchArtists(); }, []);

    const fetchArtists = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/inventory/artist/top");
            setArtists(res.data);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    return (
        <div style={styles.container}>

            {/* BACK */}
            <button
                style={styles.backButton}
                onMouseEnter={e => e.currentTarget.style.color = "#C9A84C"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,230,0.4)"}
                onClick={() => navigate(-1)}
            >
                ← Volver
            </button>

            {/* HEADER */}
            <div style={styles.header}>
                <p style={styles.eyebrow}>ESTADÍSTICAS DE INVENTARIO</p>
                <h1 style={styles.title}>
                    Artistas <em style={styles.titleItalic}>Destacados</em>
                </h1>
                {!loading && (
                    <p style={styles.count}>{artists.length} artistas en el ranking</p>
                )}
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando ranking...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && artists.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>♪</p>
                    <p style={styles.emptyTitle}>Sin datos disponibles</p>
                    <p style={styles.emptyDesc}>No hay artistas con inventario registrado.</p>
                </div>
            )}

            {/* GRID */}
            {!loading && artists.length > 0 && (
                <div style={styles.grid}>
                    {artists.map((a, i) => (
                        <div
                            key={i}
                            style={{
                                ...styles.card,
                                ...(hoveredId === i ? styles.cardHovered : {}),
                            }}
                            onMouseEnter={() => setHoveredId(i)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* RANK */}
                            <div style={styles.rankRow}>
                                <span style={{
                                    ...styles.rank,
                                    ...(i === 0 ? styles.rankGold : i === 1 ? styles.rankSilver : i === 2 ? styles.rankBronze : {}),
                                }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {i < 3 && <span style={styles.rankDot} />}
                            </div>

                            {/* NAME */}
                            <h3 style={styles.artistName}>{a.artistName}</h3>

                            {/* STATS */}
                            <div style={styles.statsRow}>
                                <div style={styles.stat}>
                                    <span style={styles.statValue}>{a.totalAlbums}</span>
                                    <span style={styles.statLabel}>ÁLBUMES</span>
                                </div>
                                <div style={styles.statDivider} />
                                <div style={styles.stat}>
                                    <span style={styles.statValue}>{a.totalUnits}</span>
                                    <span style={styles.statLabel}>UNIDADES</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default TopArtistsPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
    },

    backButton: {
        background: "none",
        border: "none",
        color: "rgba(240,237,230,0.4)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        cursor: "pointer",
        padding: "0",
        marginBottom: "36px",
        fontFamily: "Arial, sans-serif",
        transition: "color 0.2s",
    },

    header: { marginBottom: "28px" },
    eyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        margin: "0 0 10px",
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

    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "40px",
    },

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

    emptyState: {
        textAlign: "center",
        padding: "100px 0",
    },
    emptyIcon: {
        fontSize: "48px",
        marginBottom: "16px",
        opacity: 0.2,
        fontFamily: "Georgia, serif",
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
        padding: "28px 24px 24px",
        cursor: "default",
        transition: "transform 0.3s ease, background 0.3s ease, border-color 0.3s ease",
    },
    cardHovered: {
        transform: "translateY(-4px)",
        background: "#161616",
        border: "1px solid rgba(201,168,76,0.2)",
    },

    /* RANK */
    rankRow: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "16px",
    },
    rank: {
        fontSize: "11px",
        letterSpacing: "0.15em",
        color: "rgba(240,237,230,0.2)",
        fontFamily: "Georgia, serif",
    },
    rankGold: { color: "#C9A84C" },
    rankSilver: { color: "rgba(200,200,210,0.6)" },
    rankBronze: { color: "rgba(180,120,80,0.6)" },
    rankDot: {
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        backgroundColor: "rgba(201,168,76,0.3)",
    },

    /* ARTIST NAME */
    artistName: {
        fontSize: "17px",
        fontFamily: "Georgia, serif",
        fontWeight: "400",
        color: "#F0EDE6",
        margin: "0 0 20px",
        lineHeight: "1.3",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    /* STATS */
    statsRow: {
        display: "flex",
        alignItems: "center",
        gap: "0",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "16px",
    },
    stat: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
    },
    statValue: {
        fontSize: "22px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#F0EDE6",
        lineHeight: 1,
    },
    statLabel: {
        fontSize: "9px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.3)",
    },
    statDivider: {
        width: "1px",
        height: "32px",
        background: "rgba(255,255,255,0.07)",
        flexShrink: 0,
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