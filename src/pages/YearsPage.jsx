import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Assign a color and decorative symbol based on the decade
const getYearStyle = (year) => {
    const y = parseInt(year);
    if (y < 1950) return { color: "#A8C97B", symbol: "𝄪", label: "CLÁSICO" };
    if (y < 1960) return { color: "#C9A84C", symbol: "♩", label: "LOS 50s" };
    if (y < 1970) return { color: "#E07B8B", symbol: "♪", label: "LOS 60s" };
    if (y < 1980) return { color: "#7B9FE0", symbol: "♫", label: "LOS 70s" };
    if (y < 1990) return { color: "#B48CDC", symbol: "♬", label: "LOS 80s" };
    if (y < 2000) return { color: "#7BE0A0", symbol: "𝄞", label: "LOS 90s" };
    if (y < 2010) return { color: "#E0A87B", symbol: "◈", label: "LOS 2000s" };
    if (y < 2020) return { color: "#E07B8B", symbol: "▲", label: "LOS 2010s" };
    return { color: "#C9A84C", symbol: "◎", label: "LOS 2020s" };
};

function YearsPage() {
    const navigate = useNavigate();
    const [years, setYears] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredYear, setHoveredYear] = useState(null);

    useEffect(() => {
        fetchYears();
    }, []);

    const fetchYears = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8080/albums/years");
            setYears(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Group years by decade for the section labels
    const decades = years.reduce((acc, year) => {
        const decade = Math.floor(parseInt(year.yearRelease) / 10) * 10;
        if (!acc[decade]) acc[decade] = [];
        acc[decade].push(year);
        return acc;
    }, {});

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>EXPLORAR POR</p>
                    <h1 style={styles.title}>
                        Años <em style={styles.titleItalic}>de Lanzamiento</em>
                    </h1>
                    {!loading && (
                        <p style={styles.count}>{years.length} años en catálogo</p>
                    )}
                </div>
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando años...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && years.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>📅</p>
                    <p style={styles.emptyTitle}>Sin años registrados</p>
                    <p style={styles.emptyDesc}>Aún no hay álbumes en el catálogo.</p>
                </div>
            )}

            {/* DECADES + GRID */}
            {!loading && years.length > 0 && (
                <div>
                    {Object.keys(decades)
                        .sort((a, b) => b - a)
                        .map(decade => {
                            const ys = getYearStyle(decade);
                            return (
                                <div key={decade} style={styles.decadeSection}>
                                    {/* DECADE LABEL */}
                                    <div style={styles.decadeHeader}>
                                        <span style={{ ...styles.decadeLine, background: ys.color }} />
                                        <span style={{ ...styles.decadeLabel, color: ys.color }}>
                                            {ys.label}
                                        </span>
                                        <span style={styles.decadeCount}>
                                            {decades[decade].length} {decades[decade].length === 1 ? "año" : "años"}
                                        </span>
                                    </div>

                                    <div style={styles.grid}>
                                        {decades[decade]
                                            .sort((a, b) => b.yearRelease - a.yearRelease)
                                            .map((year, index) => {
                                                const ys = getYearStyle(year.yearRelease);
                                                const isHovered = hoveredYear === year.yearRelease;

                                                return (
                                                    <div
                                                        key={year.yearRelease}
                                                        style={{
                                                            ...styles.card,
                                                            ...(isHovered ? {
                                                                ...styles.cardHovered,
                                                                borderColor: `${ys.color}40`,
                                                                boxShadow: `inset 0 0 0 1px ${ys.color}20`,
                                                            } : {}),
                                                        }}
                                                        onClick={() => navigate(`/years/${year.yearRelease}`)}
                                                        onMouseEnter={() => setHoveredYear(year.yearRelease)}
                                                        onMouseLeave={() => setHoveredYear(null)}
                                                    >
                                                        {/* BIG DECORATIVE SYMBOL */}
                                                        <span style={{
                                                            ...styles.symbol,
                                                            color: ys.color,
                                                            opacity: isHovered ? 0.18 : 0.08,
                                                        }}>
                                                            {ys.symbol}
                                                        </span>

                                                        {/* CONTENT */}
                                                        <div style={styles.cardContent}>
                                                            <div style={{
                                                                ...styles.colorBar,
                                                                background: ys.color,
                                                            }} />

                                                            <div style={styles.cardBody}>
                                                                <div>
                                                                    <p style={{ ...styles.decadePill, color: ys.color }}>
                                                                        {ys.label}
                                                                    </p>
                                                                    <h3 style={styles.yearNumber}>
                                                                        {year.yearRelease}
                                                                    </h3>
                                                                </div>
                                                                <span style={{
                                                                    ...styles.arrow,
                                                                    color: ys.color,
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
                                </div>
                            );
                        })}
                </div>
            )}

        </div>
    );
}

export default YearsPage;

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

    /* DECADE SECTIONS */
    decadeSection: {
        marginBottom: "48px",
    },
    decadeHeader: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        marginBottom: "16px",
    },
    decadeLine: {
        width: "24px",
        height: "1px",
        flexShrink: 0,
        opacity: 0.6,
    },
    decadeLabel: {
        fontSize: "10px",
        letterSpacing: "0.3em",
        fontFamily: "Arial, sans-serif",
    },
    decadeCount: {
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "rgba(240,237,230,0.2)",
        marginLeft: "auto",
    },

    /* GRID */
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
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
        fontSize: "80px",
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
        padding: "20px 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flex: 1,
        gap: "12px",
    },

    decadePill: {
        fontSize: "9px",
        letterSpacing: "0.25em",
        marginBottom: "6px",
        fontFamily: "Arial, sans-serif",
    },
    yearNumber: {
        fontSize: "26px",
        fontWeight: "300",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: 0,
        lineHeight: "1.1",
        letterSpacing: "0.05em",
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