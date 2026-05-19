import { useEffect, useState } from "react";
import axios from "axios";

const getFormatStyle = (name = "") => {
    const n = name.toLowerCase();
    if (n.includes("vinyl") || n.includes("vinilo") || n.includes("lp"))
        return { color: "#C9A84C", symbol: "◎", label: "VINYL" };
    if (n.includes("cd") || n.includes("compact"))
        return { color: "#7B9FE0", symbol: "◉", label: "COMPACT DISC" };
    if (n.includes("cassette") || n.includes("casete"))
        return { color: "#E07B8B", symbol: "▣", label: "CASSETTE" };
    if (n.includes("digital") || n.includes("mp3") || n.includes("flac"))
        return { color: "#7BE0A0", symbol: "◈", label: "DIGITAL" };
    if (n.includes("blu") || n.includes("ray"))
        return { color: "#7B9FE0", symbol: "◆", label: "BLU-RAY" };
    if (n.includes("dvd"))
        return { color: "#B48CDC", symbol: "◇", label: "DVD" };
    if (n.includes("streaming"))
        return { color: "#7BE0A0", symbol: "▷", label: "STREAMING" };
    if (n.includes("reel") || n.includes("tape"))
        return { color: "#A8C97B", symbol: "⊛", label: "REEL" };

    const palette = [
        { color: "#C9A84C", symbol: "◎", label: null },
        { color: "#E07B8B", symbol: "◉", label: null },
        { color: "#7B9FE0", symbol: "◈", label: null },
        { color: "#7BE0A0", symbol: "◆", label: null },
        { color: "#B48CDC", symbol: "▣", label: null },
    ];
    return palette[name.charCodeAt(0) % palette.length];
};

function InventoryPage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:8080/inventory/value");
            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const totalUnits = data.reduce((s, d) => s + d.totalUnits, 0);
    const totalValue = data.reduce((s, d) => s + Number(d.totalValue), 0);
    const maxUnits = Math.max(...data.map(d => d.totalUnits), 1);

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>RESUMEN DE</p>
                    <h1 style={styles.title}>
                        Inventario <em style={styles.titleItalic}>por Formato</em>
                    </h1>
                    {!loading && (
                        <p style={styles.count}>{data.length} formatos en stock</p>
                    )}
                </div>

                {/* TOTALS SUMMARY */}
                {!loading && data.length > 0 && (
                    <div style={styles.summaryBox}>
                        <div style={styles.summaryItem}>
                            <span style={styles.summaryLabel}>UNIDADES TOTALES</span>
                            <span style={styles.summaryValue}>{totalUnits.toLocaleString()}</span>
                        </div>
                        <div style={styles.summaryDivider} />
                        <div style={styles.summaryItem}>
                            <span style={styles.summaryLabel}>VALOR TOTAL</span>
                            <span style={{ ...styles.summaryValue, color: "#C9A84C" }}>
                                ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando inventario...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && data.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>📦</p>
                    <p style={styles.emptyTitle}>Inventario vacío</p>
                    <p style={styles.emptyDesc}>No hay datos de inventario disponibles.</p>
                </div>
            )}

            {/* GRID */}
            {!loading && data.length > 0 && (
                <div style={styles.grid}>
                    {data.map((d, i) => {
                        const fs = getFormatStyle(d.formatType);
                        const isHovered = hoveredId === i;
                        const barWidth = Math.round((d.totalUnits / maxUnits) * 100);

                        return (
                            <div
                                key={i}
                                style={{
                                    ...styles.card,
                                    ...(isHovered ? {
                                        ...styles.cardHovered,
                                        borderColor: `${fs.color}40`,
                                        boxShadow: `inset 0 0 0 1px ${fs.color}15`,
                                    } : {}),
                                }}
                                onMouseEnter={() => setHoveredId(i)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* BIG DECORATIVE SYMBOL */}
                                <span style={{
                                    ...styles.symbol,
                                    color: fs.color,
                                    opacity: isHovered ? 0.18 : 0.07,
                                }}>
                                    {fs.symbol}
                                </span>

                                <div style={styles.cardContent}>
                                    <div style={{ ...styles.colorBar, background: fs.color }} />

                                    <div style={styles.cardBody}>
                                        {/* TOP: label + format name */}
                                        <div>
                                            <p style={{ ...styles.formatLabel, color: fs.color }}>
                                                {fs.label || d.formatType.toUpperCase()}
                                            </p>
                                            <h3 style={styles.formatName}>{d.formatType}</h3>
                                        </div>

                                        {/* STOCK BAR */}
                                        <div style={styles.barWrap}>
                                            <div style={styles.barTrack}>
                                                <div style={{
                                                    ...styles.barFill,
                                                    width: `${barWidth}%`,
                                                    background: fs.color,
                                                }} />
                                            </div>
                                        </div>

                                        {/* STATS ROW */}
                                        <div style={styles.statsRow}>
                                            <div style={styles.statItem}>
                                                <span style={styles.statLabel}>UNIDADES</span>
                                                <span style={styles.statValue}>
                                                    {d.totalUnits.toLocaleString()}
                                                </span>
                                            </div>
                                            <div style={styles.statDivider} />
                                            <div style={{ ...styles.statItem, alignItems: "flex-end" }}>
                                                <span style={styles.statLabel}>VALOR</span>
                                                <span style={{ ...styles.statValue, color: "#C9A84C" }}>
                                                    ${Number(d.totalValue).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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

export default InventoryPage;

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
        flexWrap: "wrap",
        gap: "24px",
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

    /* SUMMARY BOX */
    summaryBox: {
        display: "flex",
        alignItems: "center",
        gap: "24px",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        padding: "16px 28px",
        background: "#111",
    },
    summaryItem: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    summaryLabel: {
        fontSize: "8px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)",
    },
    summaryValue: {
        fontSize: "22px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#F0EDE6",
        letterSpacing: "0.02em",
    },
    summaryDivider: {
        width: "1px",
        height: "36px",
        background: "rgba(255,255,255,0.07)",
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
    emptyState: { textAlign: "center", padding: "100px 0" },
    emptyIcon: { fontSize: "48px", marginBottom: "16px", opacity: 0.3 },
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
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
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
    symbol: {
        position: "absolute",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        fontSize: "90px",
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
        padding: "22px 22px 20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    formatLabel: {
        fontSize: "9px",
        letterSpacing: "0.25em",
        marginBottom: "5px",
        fontFamily: "Arial, sans-serif",
    },
    formatName: {
        fontSize: "18px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: 0,
        lineHeight: "1.2",
    },

    /* STOCK BAR */
    barWrap: { paddingRight: "8px" },
    barTrack: {
        height: "2px",
        background: "rgba(255,255,255,0.07)",
        borderRadius: "1px",
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        borderRadius: "1px",
        opacity: 0.6,
        transition: "width 0.5s ease",
    },

    /* STATS */
    statsRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "16px",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    statLabel: {
        fontSize: "8px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.25)",
    },
    statValue: {
        fontSize: "18px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#F0EDE6",
        letterSpacing: "0.02em",
    },
    statDivider: {
        width: "1px",
        height: "28px",
        background: "rgba(255,255,255,0.06)",
        alignSelf: "flex-end",
        marginBottom: "2px",
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