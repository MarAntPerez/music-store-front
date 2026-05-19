import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

function AlbumDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState([]);
    const [hoveredSong, setHoveredSong] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        fetchAlbum();
        fetchSongs();
    }, []);

    const fetchAlbum = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/albums/${id}`);
            setAlbum(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchSongs = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/songs/album/${id}`);
            setSongs(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddToCart = async () => {
        try {
            await axios.post(`http://localhost:8080/inventory/sell/${album.id}`);
            addToCart(album);
            setAddedToCart(true);
            setTimeout(() => setAddedToCart(false), 2000);
        } catch (error) {
            alert("Álbum no disponible");
        }
    };

    const handleDeleteAlbum = async () => {
        try {
            await axios.delete(`http://localhost:8080/albums/${album.id}`);
            navigate("/albums");
        } catch (error) {
            console.error(error);
            setShowDeleteConfirm(false);
        }
    };

    const totalDuration = songs.reduce((total, song) => {
        if (!song.duration) return total;
        const [min, sec] = song.duration.split(":").map(Number);
        return total + (min * 60 + sec);
    }, 0);
    const minutes = Math.floor(totalDuration / 60);
    const seconds = totalDuration % 60;

    if (!album) return (
        <div style={styles.loadingWrap}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Cargando álbum...</p>
        </div>
    );

    return (
        <div style={styles.container}>

            {/* DELETE CONFIRM MODAL */}
            {showDeleteConfirm && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <p style={styles.modalEyebrow}>CONFIRMAR ACCIÓN</p>
                        <h3 style={styles.modalTitle}>¿Eliminar este álbum?</h3>
                        <p style={styles.modalDesc}>
                            Esta acción no se puede deshacer. Se eliminará «{album.albumName}» del catálogo.
                        </p>
                        <div style={styles.modalActions}>
                            <button
                                style={styles.modalCancel}
                                onClick={() => setShowDeleteConfirm(false)}
                                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
                                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
                            >
                                Cancelar
                            </button>
                            <button
                                style={styles.modalDelete}
                                onClick={handleDeleteAlbum}
                                onMouseEnter={e => e.currentTarget.style.background = "#c0394a"}
                                onMouseLeave={e => e.currentTarget.style.background = "#E07B8B"}
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* BACK */}
            <button
                style={styles.backBtn}
                onClick={() => navigate(-1)}
                onMouseEnter={e => e.currentTarget.style.color = "#F0EDE6"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,230,0.35)"}
            >
                ← Volver
            </button>

            {/* HERO */}
            <div style={styles.hero}>
                <div style={styles.coverWrap}>
                    <img
                        src={
                            album.imageUrl
                                ? `http://localhost:8080/images/${album.imageUrl}`
                                : "https://via.placeholder.com/300"
                        }
                        alt={album.albumName}
                        style={styles.cover}
                    />
                    {/* subtle gold overlay on hover handled via state is unnecessary here */}
                </div>

                <div style={styles.heroInfo}>
                    <p style={styles.eyebrow}>ÁLBUM</p>
                    <h1 style={styles.albumTitle}>{album.albumName}</h1>
                    <p style={styles.artistName}>{album.artistName || "Artista desconocido"}</p>

                    <div style={styles.metaRow}>
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>AÑO</span>
                            <span style={styles.metaValue}>{album.yearRelease}</span>
                        </div>
                        <div style={styles.metaDivider} />
                        <div style={styles.metaItem}>
                            <span style={styles.metaLabel}>CANCIONES</span>
                            <span style={styles.metaValue}>{songs.length}</span>
                        </div>
                        {totalDuration > 0 && (
                            <>
                                <div style={styles.metaDivider} />
                                <div style={styles.metaItem}>
                                    <span style={styles.metaLabel}>DURACIÓN</span>
                                    <span style={styles.metaValue}>
                                        {minutes}:{String(seconds).padStart(2, "0")}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div style={styles.actions}>
                        <button
                            style={{
                                ...styles.cartBtn,
                                ...(addedToCart ? styles.cartBtnSuccess : {}),
                            }}
                            onClick={handleAddToCart}
                            onMouseEnter={e => {
                                if (!addedToCart) {
                                    e.currentTarget.style.background = "#D4B05A";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }
                            }}
                            onMouseLeave={e => {
                                if (!addedToCart) {
                                    e.currentTarget.style.background = "#C9A84C";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }
                            }}
                        >
                            {addedToCart ? "✓ Agregado" : "+ Añadir al carrito"}
                        </button>

                        <button
                            style={styles.editBtn}
                            onClick={() => navigate(`/albums/edit/${album.id}`)}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        >
                            Editar
                        </button>

                        <button
                            style={styles.songsBtn}
                            onClick={() => navigate(`/albums/${album.id}/songs`)}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        >
                            Canciones
                        </button>

                        <button
                            style={styles.deleteBtn}
                            onClick={() => setShowDeleteConfirm(true)}
                            onMouseEnter={e => {
                                e.currentTarget.style.color = "#E07B8B";
                                e.currentTarget.style.borderColor = "rgba(224,123,139,0.3)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.color = "rgba(240,237,230,0.25)";
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                            }}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.divider} />

            {/* SONG LIST */}
            {songs.length > 0 && (
                <div style={styles.songSection}>
                    <p style={styles.songSectionLabel}>TRACKLIST</p>
                    <div style={styles.songList}>
                        {songs.map((song, index) => {
                            const isHovered = hoveredSong === song.id;
                            return (
                                <div
                                    key={song.id}
                                    style={{
                                        ...styles.songRow,
                                        ...(isHovered ? styles.songRowHovered : {}),
                                    }}
                                    onMouseEnter={() => setHoveredSong(song.id)}
                                    onMouseLeave={() => setHoveredSong(null)}
                                >
                                    <span style={{
                                        ...styles.trackNum,
                                        color: isHovered ? "#C9A84C" : "rgba(240,237,230,0.2)",
                                    }}>
                                        {String(song.trackNumber || index + 1).padStart(2, "0")}
                                    </span>
                                    <span style={styles.songName}>{song.songName}</span>
                                    <span style={styles.songDuration}>{song.duration || "—"}</span>
                                </div>
                            );
                        })}
                    </div>

                    {/* TOTAL DURATION ROW */}
                    {totalDuration > 0 && (
                        <div style={styles.totalRow}>
                            <span style={styles.totalLabel}>DURACIÓN TOTAL</span>
                            <span style={styles.totalValue}>
                                {minutes}:{String(seconds).padStart(2, "0")}
                            </span>
                        </div>
                    )}
                </div>
            )}

            {songs.length === 0 && (
                <div style={styles.noSongs}>
                    <p style={styles.noSongsText}>Este álbum no tiene canciones registradas.</p>
                    <button
                        style={styles.addSongsBtn}
                        onClick={() => navigate(`/albums/${album.id}/songs`)}
                        onMouseEnter={e => e.currentTarget.style.color = "#F0EDE6"}
                        onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,230,0.35)"}
                    >
                        Administrar canciones →
                    </button>
                </div>
            )}

        </div>
    );
}

export default AlbumDetailPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
    },

    /* LOADING */
    loadingWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#0D0D0D",
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
        fontFamily: "Arial, sans-serif",
    },

    /* MODAL */
    modalOverlay: {
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#141414",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "3px",
        padding: "40px 48px",
        maxWidth: "420px",
        width: "90%",
    },
    modalEyebrow: {
        fontSize: "9px",
        letterSpacing: "0.3em",
        color: "#E07B8B",
        marginBottom: "12px",
    },
    modalTitle: {
        fontSize: "22px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        fontStyle: "italic",
        color: "#F0EDE6",
        margin: "0 0 12px",
    },
    modalDesc: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.4)",
        lineHeight: "1.6",
        margin: "0 0 28px",
    },
    modalActions: {
        display: "flex",
        gap: "12px",
        justifyContent: "flex-end",
    },
    modalCancel: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.5)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        padding: "10px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s",
    },
    modalDelete: {
        background: "#E07B8B",
        border: "none",
        borderRadius: "2px",
        color: "#0D0D0D",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.1em",
        padding: "10px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s",
    },

    /* BACK */
    backBtn: {
        background: "transparent",
        border: "none",
        color: "rgba(240,237,230,0.35)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        cursor: "pointer",
        padding: "0 0 32px",
        fontFamily: "Arial, sans-serif",
        transition: "color 0.2s",
        display: "block",
    },

    /* HERO */
    hero: {
        display: "flex",
        gap: "48px",
        alignItems: "flex-start",
        marginBottom: "48px",
        flexWrap: "wrap",
    },
    coverWrap: {
        flexShrink: 0,
    },
    cover: {
        width: "240px",
        height: "240px",
        objectFit: "cover",
        display: "block",
        borderRadius: "2px",
    },
    heroInfo: {
        flex: 1,
        minWidth: "260px",
        display: "flex",
        flexDirection: "column",
        gap: "0",
        paddingTop: "8px",
    },
    eyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "12px",
    },
    albumTitle: {
        fontSize: "38px",
        fontWeight: "300",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 10px",
        lineHeight: "1.1",
    },
    artistName: {
        fontSize: "16px",
        color: "rgba(240,237,230,0.5)",
        margin: "0 0 28px",
        letterSpacing: "0.04em",
    },

    /* META */
    metaRow: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "32px",
        flexWrap: "wrap",
    },
    metaItem: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
    },
    metaLabel: {
        fontSize: "8px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.25)",
    },
    metaValue: {
        fontSize: "20px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#F0EDE6",
    },
    metaDivider: {
        width: "1px",
        height: "28px",
        background: "rgba(255,255,255,0.08)",
    },

    /* ACTIONS */
    actions: {
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
    },
    cartBtn: {
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
    cartBtnSuccess: {
        background: "#7BE0A0",
        transform: "translateY(0)",
    },
    editBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.6)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        padding: "12px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s",
        fontWeight: "700",
    },
    songsBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.6)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        padding: "12px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s",
        fontWeight: "700",
    },
    deleteBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.25)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        padding: "12px 20px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "color 0.2s, border-color 0.2s",
        fontWeight: "700",
    },

    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "36px",
    },

    /* SONG LIST */
    songSection: {
        maxWidth: "680px",
    },
    songSectionLabel: {
        fontSize: "9px",
        letterSpacing: "0.3em",
        color: "rgba(240,237,230,0.25)",
        marginBottom: "16px",
    },
    songList: {
        display: "flex",
        flexDirection: "column",
    },
    songRow: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "13px 12px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        transition: "background 0.2s",
        borderRadius: "2px",
    },
    songRowHovered: {
        background: "#141414",
    },
    trackNum: {
        fontSize: "11px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        minWidth: "24px",
        transition: "color 0.2s",
    },
    songName: {
        flex: 1,
        fontSize: "14px",
        color: "#F0EDE6",
        letterSpacing: "0.02em",
    },
    songDuration: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.3)",
        fontFamily: "Georgia, serif",
        letterSpacing: "0.05em",
    },
    totalRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "16px 12px 0",
        marginTop: "4px",
    },
    totalLabel: {
        fontSize: "8px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.2)",
    },
    totalValue: {
        fontSize: "14px",
        fontFamily: "Georgia, serif",
        color: "rgba(240,237,230,0.35)",
    },

    /* NO SONGS */
    noSongs: {
        padding: "40px 0",
    },
    noSongsText: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.25)",
        marginBottom: "12px",
        letterSpacing: "0.04em",
    },
    addSongsBtn: {
        background: "transparent",
        border: "none",
        color: "rgba(240,237,230,0.35)",
        fontSize: "13px",
        cursor: "pointer",
        padding: 0,
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        transition: "color 0.2s",
        letterSpacing: "0.02em",
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