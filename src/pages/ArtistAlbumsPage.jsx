import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ArtistAlbumsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [albums, setAlbums] = useState([]);
    const [artistName, setArtistName] = useState("");
    const [loading, setLoading] = useState(true);
    const [hoveredId, setHoveredId] = useState(null);
    const [editHovered, setEditHovered] = useState(false);
    const [deleteHovered, setDeleteHovered] = useState(false);

    useEffect(() => { fetchAlbums(); }, []);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/albums/artist/${id}`);
            setAlbums(response.data);
            if (response.data.length > 0) setArtistName(response.data[0].artistName);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este artista?")) return;
        try {
            await axios.delete(`http://localhost:8080/artists/${id}`);
            navigate("/artists");
        } catch (error) {
            console.error(error);
        }
    };

    const isRealArtist = Number(id) !== 0;

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
                <div style={styles.headerLeft}>
                    <p style={styles.eyebrow}>DISCOGRAFÍA</p>
                    <h1 style={styles.title}>
                        {artistName
                            ? <><em style={styles.titleItalic}>{artistName}</em></>
                            : <em style={styles.titleItalic}>Artista</em>
                        }
                    </h1>
                    {!loading && (
                        <p style={styles.count}>
                            {albums.length} álbum{albums.length !== 1 ? "es" : ""} en catálogo
                        </p>
                    )}
                </div>

                {/* ACTIONS */}
                {isRealArtist && (
                    <div style={styles.actions}>
                        <button
                            style={{
                                ...styles.editButton,
                                ...(editHovered ? styles.editButtonHovered : {}),
                            }}
                            onMouseEnter={() => setEditHovered(true)}
                            onMouseLeave={() => setEditHovered(false)}
                            onClick={() => navigate(`/artists/edit/${id}`)}
                        >
                            Editar artista
                        </button>
                        <button
                            style={{
                                ...styles.deleteButton,
                                ...(deleteHovered ? styles.deleteButtonHovered : {}),
                            }}
                            onMouseEnter={() => setDeleteHovered(true)}
                            onMouseLeave={() => setDeleteHovered(false)}
                            onClick={handleDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                )}
            </div>

            {/* DIVIDER */}
            <div style={styles.divider} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando discografía...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && albums.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>♪</p>
                    <p style={styles.emptyTitle}>Sin álbumes registrados</p>
                    <p style={styles.emptyDesc}>Este artista aún no tiene álbumes en la colección.</p>
                </div>
            )}

            {/* GRID */}
            {!loading && albums.length > 0 && (
                <div style={styles.grid}>
                    {albums.map(album => (
                        <div
                            key={album.id}
                            style={{
                                ...styles.card,
                                ...(hoveredId === album.id ? styles.cardHovered : {}),
                            }}
                            onClick={() => navigate(`/albums/${album.id}`)}
                            onMouseEnter={() => setHoveredId(album.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* COVER */}
                            <div style={styles.imageWrap}>
                                <img
                                    src={
                                        album.imageUrl
                                            ? `http://localhost:8080/images/${album.imageUrl}`
                                            : "https://via.placeholder.com/400x400/1a1a1a/333333?text=♪"
                                    }
                                    alt={album.albumName}
                                    style={{
                                        ...styles.image,
                                        ...(hoveredId === album.id ? styles.imageHovered : {}),
                                    }}
                                />
                                <div style={{
                                    ...styles.imageOverlay,
                                    opacity: hoveredId === album.id ? 1 : 0,
                                }}>
                                    <span style={styles.viewLabel}>Ver detalles →</span>
                                </div>
                            </div>

                            {/* INFO */}
                            <div style={styles.info}>
                                <h3 style={styles.albumName}>{album.albumName}</h3>
                                <div style={styles.metaRow}>
                                    {album.genreName && (
                                        <span style={styles.tag}>{album.genreName}</span>
                                    )}
                                    {album.formatType && (
                                        <span style={{ ...styles.tag, ...styles.tagFormat }}>{album.formatType}</span>
                                    )}
                                </div>
                                <p style={styles.year}>{album.yearRelease}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default ArtistAlbumsPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
    },

    /* BACK */
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

    /* HEADER */
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "28px",
    },
    headerLeft: {},
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

    /* ACTIONS */
    actions: {
        display: "flex",
        gap: "10px",
        alignItems: "center",
    },
    editButton: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.6)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "10px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s, color 0.2s",
    },
    editButtonHovered: {
        borderColor: "#C9A84C",
        color: "#C9A84C",
    },
    deleteButton: {
        background: "transparent",
        border: "1px solid rgba(180,50,50,0.3)",
        borderRadius: "2px",
        color: "rgba(220,100,100,0.7)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "10px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s",
    },
    deleteButtonHovered: {
        background: "rgba(180,50,50,0.12)",
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

    /* GRID — idéntico a AlbumsPage */
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "2px",
    },

    /* CARD */
    card: {
        backgroundColor: "#111",
        cursor: "pointer",
        transition: "transform 0.3s ease, background 0.3s ease",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "3px",
        overflow: "hidden",
    },
    cardHovered: {
        transform: "translateY(-4px)",
        background: "#161616",
        border: "1px solid rgba(201,168,76,0.2)",
    },
    imageWrap: {
        position: "relative",
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "220px",
        objectFit: "cover",
        display: "block",
        transition: "transform 0.4s ease",
    },
    imageHovered: {
        transform: "scale(1.04)",
    },
    imageOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(13,13,13,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.3s ease",
    },
    viewLabel: {
        fontSize: "12px",
        letterSpacing: "0.15em",
        color: "#C9A84C",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
    },
    info: {
        padding: "18px 20px 20px",
    },
    albumName: {
        fontSize: "15px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 10px",
        lineHeight: "1.3",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    metaRow: {
        display: "flex",
        gap: "6px",
        flexWrap: "wrap",
        marginBottom: "12px",
    },
    tag: {
        fontSize: "10px",
        letterSpacing: "0.1em",
        color: "rgba(240,237,230,0.5)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        padding: "3px 8px",
        whiteSpace: "nowrap",
    },
    tagFormat: {
        color: "rgba(201,168,76,0.7)",
        border: "1px solid rgba(201,168,76,0.2)",
    },
    year: {
        fontSize: "11px",
        color: "rgba(240,237,230,0.25)",
        margin: 0,
        letterSpacing: "0.08em",
    },
};

/* Keyframes */
if (typeof document !== "undefined") {
    const s = document.createElement("style");
    s.textContent = `@keyframes spin { to { transform: rotate(360deg); } }`;
    if (!document.head.querySelector("[data-vr-spin]")) {
        s.setAttribute("data-vr-spin", "1");
        document.head.appendChild(s);
    }
}