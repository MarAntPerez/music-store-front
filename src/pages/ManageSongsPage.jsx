import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ManageSongsPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newSong, setNewSong] = useState({ songName: "", duration: "" });
    const [hoveredId, setHoveredId] = useState(null);
    const [addHovered, setAddHovered] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        fetchSongs();
    }, [id]);

    const fetchSongs = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/songs/album/${id}`);
            setSongs(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addSong = async () => {
        if (!newSong.songName.trim()) return;
        try {
            await axios.post("http://localhost:8080/songs", {
                albumId: id,
                songName: newSong.songName,
                duration: newSong.duration,
            });
            setNewSong({ songName: "", duration: "" });
            fetchSongs();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSong = async (songId) => {
        try {
            await axios.delete(`http://localhost:8080/songs/${songId}`);
            fetchSongs();
        } catch (error) {
            console.error(error);
        }
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
                <div>
                    <p style={styles.eyebrow}>GESTIÓN DE CONTENIDO</p>
                    <h1 style={styles.title}>
                        Administrar <em style={styles.titleItalic}>Canciones</em>
                    </h1>
                    {!loading && (
                        <p style={styles.count}>{songs.length} pista{songs.length !== 1 ? "s" : ""} en este álbum</p>
                    )}
                </div>
            </div>

            {/* DIVIDER */}
            <div style={styles.divider} />

            {/* ADD SONG FORM */}
            <div style={styles.formSection}>
                <p style={styles.formLabel}>NUEVA PISTA</p>
                <div style={styles.formRow}>
                    <input
                        style={{
                            ...styles.input,
                            ...(focusedField === "name" ? styles.inputFocused : {}),
                        }}
                        type="text"
                        placeholder="Nombre de la canción"
                        value={newSong.songName}
                        onChange={e => setNewSong({ ...newSong, songName: e.target.value })}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={e => e.key === "Enter" && addSong()}
                    />
                    <input
                        style={{
                            ...styles.inputDuration,
                            ...(focusedField === "dur" ? styles.inputFocused : {}),
                        }}
                        type="text"
                        placeholder="00:00"
                        value={newSong.duration}
                        onChange={e => setNewSong({ ...newSong, duration: e.target.value })}
                        onFocus={() => setFocusedField("dur")}
                        onBlur={() => setFocusedField(null)}
                        onKeyDown={e => e.key === "Enter" && addSong()}
                    />
                    <button
                        style={{
                            ...styles.addButton,
                            ...(addHovered ? styles.addButtonHovered : {}),
                        }}
                        onMouseEnter={() => setAddHovered(true)}
                        onMouseLeave={() => setAddHovered(false)}
                        onClick={addSong}
                    >
                        <span style={styles.addIcon}>+</span>
                        Agregar Canción
                    </button>
                </div>
            </div>

            {/* DIVIDER */}
            <div style={{ ...styles.divider, marginBottom: "0" }} />

            {/* LOADING */}
            {loading && (
                <div style={styles.loadingWrap}>
                    <div style={styles.loadingSpinner} />
                    <p style={styles.loadingText}>Cargando pistas...</p>
                </div>
            )}

            {/* EMPTY */}
            {!loading && songs.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>♩</p>
                    <p style={styles.emptyTitle}>Sin canciones aún</p>
                    <p style={styles.emptyDesc}>Agrega la primera pista a este álbum.</p>
                </div>
            )}

            {/* SONG LIST */}
            {!loading && songs.length > 0 && (
                <ul style={styles.list}>
                    {songs.map((song, index) => (
                        <li
                            key={song.id}
                            style={{
                                ...styles.songItem,
                                ...(hoveredId === song.id ? styles.songItemHovered : {}),
                            }}
                            onMouseEnter={() => setHoveredId(song.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* TRACK NUMBER */}
                            <span style={styles.trackNum}>
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* SONG INFO */}
                            <div style={styles.songInfo}>
                                <span style={styles.songName}>{song.songName}</span>
                                {song.duration && (
                                    <span style={styles.duration}>{song.duration}</span>
                                )}
                            </div>

                            {/* ACTIONS */}
                            <div style={{
                                ...styles.actions,
                                opacity: hoveredId === song.id ? 1 : 0,
                            }}>
                                <button
                                    style={styles.editBtn}
                                    onMouseEnter={e => e.currentTarget.style.borderColor = "#C9A84C"}
                                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"}
                                    onClick={() => navigate(`/songs/edit/${song.id}`)}
                                >
                                    Editar
                                </button>
                                <button
                                    style={styles.deleteBtn}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(180,50,50,0.25)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                    onClick={() => deleteSong(song.id)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

export default ManageSongsPage;

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
        marginBottom: "28px",
    },
    eyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "10px",
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
        marginBottom: "36px",
    },

    /* FORM */
    formSection: {
        marginBottom: "36px",
    },
    formLabel: {
        fontSize: "10px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)",
        marginBottom: "14px",
    },
    formRow: {
        display: "flex",
        gap: "10px",
        alignItems: "stretch",
    },
    input: {
        flex: 1,
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "13px",
        padding: "12px 16px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        outline: "none",
        transition: "border-color 0.2s",
    },
    inputDuration: {
        width: "110px",
        flexShrink: 0,
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "13px",
        padding: "12px 16px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        outline: "none",
        transition: "border-color 0.2s",
        textAlign: "center",
        letterSpacing: "0.1em",
    },
    inputFocused: {
        borderColor: "rgba(201,168,76,0.5)",
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
    addButtonHovered: {
        background: "#D4B05A",
        transform: "translateY(-1px)",
    },
    addIcon: {
        fontSize: "16px",
        lineHeight: 1,
        fontWeight: "400",
    },

    /* LOADING */
    loadingWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 0",
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

    /* LIST */
    list: {
        listStyle: "none",
        padding: 0,
        margin: 0,
    },
    songItem: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "16px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        transition: "background 0.2s",
        cursor: "default",
    },
    songItemHovered: {
        background: "rgba(255,255,255,0.03)",
    },
    trackNum: {
        fontSize: "11px",
        color: "rgba(240,237,230,0.2)",
        letterSpacing: "0.1em",
        fontFamily: "Georgia, serif",
        width: "24px",
        textAlign: "right",
        flexShrink: 0,
    },
    songInfo: {
        flex: 1,
        display: "flex",
        alignItems: "baseline",
        gap: "16px",
        minWidth: 0,
    },
    songName: {
        fontSize: "15px",
        fontFamily: "Georgia, serif",
        fontWeight: "400",
        color: "#F0EDE6",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    duration: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.3)",
        letterSpacing: "0.08em",
        flexShrink: 0,
    },
    actions: {
        display: "flex",
        gap: "8px",
        flexShrink: 0,
        transition: "opacity 0.2s",
    },
    editBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.6)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "6px 14px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s",
    },
    deleteBtn: {
        background: "transparent",
        border: "1px solid rgba(180,50,50,0.3)",
        borderRadius: "2px",
        color: "rgba(220,100,100,0.7)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "6px 14px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s",
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