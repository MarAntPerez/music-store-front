import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function HomePage() {
    const navigate = useNavigate();
    const heroRef = useRef(null);

    return (
        <div style={styles.container}>

            {/* HERO */}
            <div style={styles.hero} ref={heroRef}>
                <div style={styles.heroNoise} />
                <div style={styles.heroContent}>
                    <p style={styles.eyebrow}>— Boutique Musical —</p>
                    <h1 style={styles.title}>
                        La música<br />
                        <em style={styles.titleItalic}>que te define.</em>
                    </h1>
                    <p style={styles.subtitle}>
                        Curación experta. Colecciones exclusivas.<br />
                    </p>
                    <div style={styles.heroCtas}>
                        <button style={styles.primaryBtn} onClick={() => navigate("/albums")}>
                            Explorar Colección
                        </button>
                        <button style={styles.ghostBtn} onClick={() => navigate("/artists")}>
                            Ver Artistas →
                        </button>
                    </div>
                </div>
                <div style={styles.heroDecor}>
                    <div style={styles.vinylOuter}>
                        <div style={styles.vinylInner}>
                            <div style={styles.vinylLabel}>
                                <span style={styles.vinylText}>VR</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={styles.scrollHint}>↓</div>
            </div>

            {/* STATS BAR */}
            <div style={styles.statsBar}>
                {[
                    { value: "12,000+", label: "Álbumes" },
                    { value: "4,800+", label: "Artistas" },
                    { value: "38", label: "Géneros" },
                    { value: "30 años", label: "de experiencia" },
                ].map((s, i) => (
                    <div key={i} style={styles.statItem}>
                        <span style={styles.statValue}>{s.value}</span>
                        <span style={styles.statLabel}>{s.label}</span>
                    </div>
                ))}
            </div>

            {/* SECTION: EXPLORE */}
            <section style={styles.section}>
                <div style={styles.sectionHeader}>
                    <p style={styles.sectionEyebrow}>NAVEGA POR</p>
                    <h2 style={styles.sectionTitle}>Tu música, tu mundo</h2>
                </div>

                <div style={styles.grid}>
                    {[
                        {
                            emoji: "💿",
                            title: "Álbumes",
                            desc: "Miles de títulos cuidadosamente seleccionados. Desde clásicos atemporales hasta lanzamientos de vanguardia.",
                            route: "/albums",
                            accent: "#C9A84C",
                        },
                        {
                            emoji: "🎤",
                            title: "Artistas",
                            desc: "Descubre la historia detrás de tus artistas favoritos. Discografías completas y notas editoriales.",
                            route: "/artists",
                            accent: "#E07B8B",
                        },
                        {
                            emoji: "🎼",
                            title: "Géneros",
                            desc: "Jazz, Soul, Clásica, Electrónica y más. Explora el universo completo de la música organizado para ti.",
                            route: "/genres",
                            accent: "#7B9FE0",
                        },
                        {
                            emoji: "📦",
                            title: "Inventario",
                            desc: "Gestión inteligente de stock, ventas y pedidos. Todo lo que necesitas para administrar tu tienda.",
                            route: "/inventory",
                            accent: "#7BE0A0",
                        },
                    ].map((card, i) => (
                        <div
                            key={i}
                            style={styles.card}
                            onClick={() => navigate(card.route)}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-6px)";
                                e.currentTarget.style.borderColor = card.accent;
                                e.currentTarget.querySelector(".card-arrow").style.opacity = "1";
                                e.currentTarget.querySelector(".card-arrow").style.transform = "translateX(4px)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                                e.currentTarget.querySelector(".card-arrow").style.opacity = "0";
                                e.currentTarget.querySelector(".card-arrow").style.transform = "translateX(0)";
                            }}
                        >
                            <span style={{ fontSize: "36px", marginBottom: "16px", display: "block" }}>{card.emoji}</span>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <h3 style={{ ...styles.cardTitle, color: card.accent }}>{card.title}</h3>
                                <span
                                    className="card-arrow"
                                    style={{
                                        color: card.accent,
                                        fontSize: "20px",
                                        opacity: 0,
                                        transition: "all 0.3s ease",
                                    }}
                                >→</span>
                            </div>
                            <p style={styles.cardDesc}>{card.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* EDITORIAL BANNER */}
            <div style={styles.banner}>
                <div style={styles.bannerInner}>
                    <p style={styles.bannerEyebrow}>COLECCIÓN DESTACADA</p>
                    <h2 style={styles.bannerTitle}>Jazz & Soul Clásicos</h2>
                    <p style={styles.bannerSub}>Una selección de los grandes maestros. Miles Davis, Coltrane, Aretha Franklin.</p>
                    <button style={styles.bannerBtn} onClick={() => navigate("/genres")}>
                        Explorar Géneros →
                    </button>
                </div>
                <div style={styles.bannerDecorLines}>
                    {[...Array(8)].map((_, i) => (
                        <div key={i} style={{ ...styles.bannerLine, opacity: 0.04 + i * 0.015 }} />
                    ))}
                </div>
            </div>

            {/* FOOTER */}
            <footer style={styles.footer}>
                <span style={styles.footerLogo}>
                    <span style={styles.logoAccent}>V</span>ELVET<span style={styles.logoThin}> RECORDS</span>
                </span>
                <p style={styles.footerSub}>© 2024 Velvet Records — Todos los derechos reservados</p>
            </footer>

        </div>
    );
}

export default HomePage;

const styles = {
    container: {
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflowX: "hidden",
    },

    /* NAV */
    /* HERO */
    hero: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "10px 48px 80px",
        position: "relative",
        background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 60%), #0D0D0D",
        overflow: "hidden",
    },
    heroNoise: {
        position: "absolute",
        inset: 0,
        backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
        backgroundSize: "200px 200px",
        opacity: 0.5,
        pointerEvents: "none",
    },
    heroContent: {
        maxWidth: "580px",
        position: "relative",
        zIndex: 2,
        animation: "fadeUp 0.9s ease both",
    },
    eyebrow: {
        fontSize: "12px",
        letterSpacing: "0.25em",
        color: "#C9A84C",
        marginBottom: "24px",
        fontFamily: "'Georgia', serif",
    },
    title: {
        fontSize: "clamp(48px, 6vw, 88px)",
        fontWeight: "400",
        lineHeight: "1.05",
        margin: "0 0 12px",
        color: "#F0EDE6",
        fontFamily: "'Georgia', serif",
    },
    titleItalic: {
        fontStyle: "italic",
        color: "#C9A84C",
        fontWeight: "300",
    },
    subtitle: {
        fontSize: "17px",
        lineHeight: "1.7",
        color: "rgba(240,237,230,0.55)",
        margin: "28px 0 40px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "300",
        letterSpacing: "0.02em",
    },
    heroCtas: {
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
    },
    primaryBtn: {
        backgroundColor: "#C9A84C",
        color: "#0D0D0D",
        border: "none",
        padding: "15px 36px",
        fontSize: "13px",
        fontWeight: "700",
        letterSpacing: "0.15em",
        cursor: "pointer",
        borderRadius: "2px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
    },
    ghostBtn: {
        backgroundColor: "transparent",
        color: "rgba(240,237,230,0.7)",
        border: "none",
        padding: "15px 0",
        fontSize: "14px",
        letterSpacing: "0.05em",
        cursor: "pointer",
        fontFamily: "'Georgia', serif",
        fontStyle: "italic",
        transition: "color 0.2s",
        background: "none",
    },

    /* VINYL DECORATION */
    heroDecor: {
        position: "absolute",
        right: "-60px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        animation: "spinSlow 25s linear infinite",
        opacity: 0.18,
    },
    vinylOuter: {
        width: "520px",
        height: "520px",
        borderRadius: "50%",
        background: "repeating-radial-gradient(circle at center, #1a1a1a 0px, #111 2px, #1a1a1a 4px, #141414 6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid rgba(255,255,255,0.05)",
    },
    vinylInner: {
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        background: "#1a1a1a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    vinylLabel: {
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        background: "#C9A84C",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    vinylText: {
        color: "#0D0D0D",
        fontWeight: "bold",
        fontSize: "16px",
        letterSpacing: "0.1em",
    },

    scrollHint: {
        position: "absolute",
        bottom: "36px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "rgba(240,237,230,0.25)",
        fontSize: "20px",
        animation: "bounce 2s ease infinite",
    },

    /* STATS BAR */
    statsBar: {
        borderTop: "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        justifyContent: "center",
        gap: "0",
    },
    statItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "32px 64px",
        borderRight: "1px solid rgba(255,255,255,0.07)",
        gap: "6px",
    },
    statValue: {
        fontSize: "28px",
        fontWeight: "300",
        color: "#C9A84C",
        fontFamily: "'Georgia', serif",
        letterSpacing: "0.05em",
    },
    statLabel: {
        fontSize: "11px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.4)",
        textTransform: "uppercase",
        fontFamily: "Arial, sans-serif",
    },

    /* SECTION */
    section: {
        padding: "100px 48px",
    },
    sectionHeader: {
        marginBottom: "60px",
    },
    sectionEyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "12px",
        fontFamily: "Arial, sans-serif",
    },
    sectionTitle: {
        fontSize: "clamp(28px, 4vw, 48px)",
        fontWeight: "300",
        color: "#F0EDE6",
        fontFamily: "'Georgia', serif",
        fontStyle: "italic",
        margin: 0,
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "2px",
    },
    card: {
        backgroundColor: "#141414",
        padding: "40px 36px",
        cursor: "pointer",
        transition: "all 0.35s ease",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "4px",
    },
    cardTitle: {
        fontSize: "22px",
        fontWeight: "400",
        fontFamily: "'Georgia', serif",
        margin: "0 0 12px",
    },
    cardDesc: {
        fontSize: "14px",
        lineHeight: "1.7",
        color: "rgba(240,237,230,0.45)",
        fontFamily: "Arial, sans-serif",
        margin: 0,
    },

    /* EDITORIAL BANNER */
    banner: {
        margin: "0 48px 100px",
        background: "#111",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "4px",
        padding: "80px 64px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
    },
    bannerInner: {
        position: "relative",
        zIndex: 2,
        maxWidth: "480px",
    },
    bannerEyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "16px",
        fontFamily: "Arial, sans-serif",
    },
    bannerTitle: {
        fontSize: "42px",
        fontWeight: "300",
        fontFamily: "'Georgia', serif",
        fontStyle: "italic",
        color: "#F0EDE6",
        margin: "0 0 16px",
    },
    bannerSub: {
        fontSize: "15px",
        color: "rgba(240,237,230,0.5)",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        margin: "0 0 32px",
    },
    bannerBtn: {
        background: "none",
        border: "1px solid rgba(201,168,76,0.4)",
        color: "#C9A84C",
        padding: "12px 28px",
        fontSize: "13px",
        letterSpacing: "0.1em",
        cursor: "pointer",
        borderRadius: "2px",
        fontFamily: "Arial, sans-serif",
        transition: "all 0.2s",
    },
    bannerDecorLines: {
        position: "absolute",
        right: "0",
        top: "0",
        bottom: "0",
        width: "40%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    bannerLine: {
        height: "1px",
        background: "linear-gradient(to left, transparent, #C9A84C)",
    },

    /* FOOTER */
    footer: {
        borderTop: "1px solid rgba(255,255,255,0.07)",
        padding: "40px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    footerLogo: {
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "0.2em",
        fontFamily: "'Georgia', serif",
    },
    footerSub: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.3)",
        letterSpacing: "0.05em",
        fontFamily: "Arial, sans-serif",
        margin: 0,
    },
};

/* Inject keyframes globally */
if (typeof document !== "undefined") {
    const style = document.createElement("style");
    style.textContent = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes spinSlow {
      from { transform: translateY(-50%) rotate(0deg); }
      to   { transform: translateY(-50%) rotate(360deg); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateX(-50%) translateY(0); }
      50%       { transform: translateX(-50%) translateY(8px); }
    }
  `;
    document.head.appendChild(style);
}