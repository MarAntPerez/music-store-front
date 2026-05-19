import { useState } from "react";
import axios from "axios";

function AvailabilityPage() {
    const [genre, setGenre] = useState("");
    const [format, setFormat] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [hoveredId, setHoveredId] = useState(null);

    const search = async () => {
        setLoading(true);
        setSearched(true);
        try {
            const res = await axios.get(
                "http://localhost:8080/inventory/availability",
                { params: { genre, format } }
            );
            setResults(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") search();
    };

    const getStockStyle = (amount) => {
        if (amount === 0) return { color: "#E07B8B", label: "AGOTADO" };
        if (amount <= 3) return { color: "#C9A84C", label: "ÚLTIMAS UNIDADES" };
        return { color: "#7BE0A0", label: "DISPONIBLE" };
    };

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <p style={styles.eyebrow}>CONSULTAR</p>
                <h1 style={styles.title}>
                    Disponibilidad <em style={styles.titleItalic}>en Inventario</em>
                </h1>
                {searched && !loading && (
                    <p style={styles.count}>
                        {results.length} {results.length === 1 ? "resultado" : "resultados"} encontrados
                    </p>
                )}
            </div>

            <div style={styles.divider} />

            {/* FILTERS */}
            <div style={styles.filtersWrap}>
                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>GÉNERO</label>
                    <input
                        placeholder="Rock, Jazz, Pop..."
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={styles.input}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                            e.currentTarget.style.background = "#161616";
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.background = "#111";
                        }}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.inputLabel}>FORMATO</label>
                    <input
                        placeholder="Vinyl, CD, Cassette..."
                        value={format}
                        onChange={e => setFormat(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={styles.input}
                        onFocus={e => {
                            e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)";
                            e.currentTarget.style.background = "#161616";
                        }}
                        onBlur={e => {
                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                            e.currentTarget.style.background = "#111";
                        }}
                    />
                </div>

                <button
                    style={styles.searchButton}
                    onClick={search}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = "#D4B05A";
                        e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = "#C9A84C";
                        e.currentTarget.style.transform = "translateY(0)";
                    }}
                >
                    <span style={styles.searchIcon}>⌕</span>
                    Buscar
                </button>
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Consultando inventario...</p>
                </div>
            )}

            {/* EMPTY STATE — before search */}
            {!loading && !searched && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>🔍</p>
                    <p style={styles.emptyTitle}>Ingresa un género o formato</p>
                    <p style={styles.emptyDesc}>Usa los filtros para consultar la disponibilidad en inventario.</p>
                </div>
            )}

            {/* EMPTY STATE — after search, no results */}
            {!loading && searched && results.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>📭</p>
                    <p style={styles.emptyTitle}>Sin resultados</p>
                    <p style={styles.emptyDesc}>No se encontraron álbumes con esos filtros.</p>
                </div>
            )}

            {/* RESULTS GRID */}
            {!loading && results.length > 0 && (
                <div style={styles.grid}>
                    {results.map((r, i) => {
                        const stock = getStockStyle(r.amount);
                        const isHovered = hoveredId === i;

                        return (
                            <div
                                key={i}
                                style={{
                                    ...styles.card,
                                    ...(isHovered ? {
                                        ...styles.cardHovered,
                                        borderColor: `${stock.color}30`,
                                        boxShadow: `inset 0 0 0 1px ${stock.color}15`,
                                    } : {}),
                                }}
                                onMouseEnter={() => setHoveredId(i)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* COLOR BAR */}
                                <div style={{ ...styles.colorBar, background: stock.color }} />

                                <div style={styles.cardBody}>
                                    {/* STOCK BADGE */}
                                    <div style={styles.cardTop}>
                                        <span style={{ ...styles.stockBadge, color: stock.color, borderColor: `${stock.color}30` }}>
                                            {stock.label}
                                        </span>
                                        <span style={styles.stockCount}>
                                            {r.amount} uds.
                                        </span>
                                    </div>

                                    {/* ALBUM INFO */}
                                    <h3 style={styles.albumName}>{r.albumName}</h3>
                                    <p style={styles.artistName}>{r.artistName}</p>

                                    {/* DIVIDER */}
                                    <div style={styles.cardDivider} />

                                    {/* PRICE */}
                                    <div style={styles.cardFooter}>
                                        <span style={styles.priceLabel}>PRECIO</span>
                                        <span style={styles.price}>${Number(r.cost).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* INDEX */}
                                <span style={styles.indexNum}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}

        </div>
    );
}

export default AvailabilityPage;

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
        marginBottom: "32px",
    },

    /* FILTERS */
    filtersWrap: {
        display: "flex",
        gap: "16px",
        alignItems: "flex-end",
        marginBottom: "32px",
        flexWrap: "wrap",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        flex: "1 1 200px",
    },
    inputLabel: {
        fontSize: "9px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.35)",
    },
    input: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "14px",
        padding: "12px 16px",
        fontFamily: "Georgia, serif",
        outline: "none",
        transition: "border-color 0.2s, background 0.2s",
        width: "100%",
        boxSizing: "border-box",
    },
    searchButton: {
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
        padding: "12px 28px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
        alignSelf: "flex-end",
        height: "46px",
    },
    searchIcon: {
        fontSize: "16px",
        fontWeight: "400",
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
        padding: "80px 0",
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
        cursor: "default",
        transition: "all 0.28s ease",
        position: "relative",
        overflow: "hidden",
        display: "flex",
    },
    cardHovered: {
        background: "#151515",
        transform: "translateY(-3px)",
    },
    colorBar: {
        width: "3px",
        flexShrink: 0,
        borderRadius: "3px 0 0 3px",
        opacity: 0.7,
    },
    cardBody: {
        padding: "20px 22px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    cardTop: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "8px",
    },
    stockBadge: {
        fontSize: "8px",
        letterSpacing: "0.2em",
        border: "1px solid",
        padding: "3px 8px",
        borderRadius: "1px",
    },
    stockCount: {
        fontSize: "11px",
        color: "rgba(240,237,230,0.3)",
        letterSpacing: "0.05em",
    },
    albumName: {
        fontSize: "17px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 4px",
        lineHeight: "1.2",
    },
    artistName: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.4)",
        margin: 0,
        letterSpacing: "0.05em",
    },
    cardDivider: {
        height: "1px",
        background: "rgba(255,255,255,0.06)",
        margin: "12px 0 8px",
    },
    cardFooter: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    priceLabel: {
        fontSize: "8px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.25)",
    },
    price: {
        fontSize: "20px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#C9A84C",
        letterSpacing: "0.02em",
    },
    indexNum: {
        position: "absolute",
        bottom: "10px",
        right: "14px",
        fontSize: "9px",
        letterSpacing: "0.1em",
        color: "rgba(240,237,230,0.08)",
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