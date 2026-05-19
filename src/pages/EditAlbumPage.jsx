import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditAlbumPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [album, setAlbum] = useState({
        albumName: "", artistId: "", genreId: "",
        formatId: "", yearRelease: "", stock: "", cost: ""
    });
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [years, setYears] = useState([]);
    const [newArtist, setNewArtist] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newFormat, setNewFormat] = useState("");
    const [newYear, setNewYear] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [yearError, setYearError] = useState("");

    useEffect(() => { fetchData(); }, [id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [albumRes, artistsRes, genresRes, formatsRes, yearsRes] = await Promise.all([
                axios.get(`http://localhost:8080/albums/${id}`),
                axios.get("http://localhost:8080/artists"),
                axios.get("http://localhost:8080/genres"),
                axios.get("http://localhost:8080/formats"),
                axios.get("http://localhost:8080/albums/years"),
            ]);
            setAlbum({
                albumName: albumRes.data.albumName,
                artistId: albumRes.data.artistId,
                genreId: albumRes.data.genreId,
                formatId: albumRes.data.formatId,
                yearRelease: albumRes.data.yearRelease,
                stock: albumRes.data.stock,
                cost: albumRes.data.cost,
            });
            setArtists(artistsRes.data);
            setGenres(genresRes.data);
            setFormats(formatsRes.data);
            setYears(yearsRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = e => setAlbum({ ...album, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        if (newYear && !/^\d{4}$/.test(newYear)) {
            setYearError("El año debe tener exactamente 4 dígitos");
            return;
        }
        setYearError("");
        setSaving(true);
        try {
            let artistId = album.artistId;
            let genreId = album.genreId;
            let formatId = album.formatId;
            let yearRelease = album.yearRelease;

            if (newArtist) {
                const r = await axios.post("http://localhost:8080/artists", { artistName: newArtist });
                artistId = r.data.id;
            }
            if (newGenre) {
                const r = await axios.post("http://localhost:8080/genres", { genresName: newGenre });
                genreId = r.data.id;
            }
            if (newFormat) {
                const r = await axios.post("http://localhost:8080/formats", { formatType: newFormat });
                formatId = r.data.id;
            }
            if (newYear) yearRelease = parseInt(newYear);

            await axios.put(`http://localhost:8080/albums/${id}`, {
                albumName: album.albumName, artistId, genreId,
                formatId, yearRelease, stock: album.stock, cost: album.cost
            });

            setSaved(true);
            setTimeout(() => { navigate(`/albums/${id}`); }, 1200);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div style={styles.loadingWrap}>
            <div style={styles.loadingSpinner} />
            <p style={styles.loadingText}>Cargando álbum...</p>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.inner}>

                {/* HEADER */}
                <button
                    style={styles.backBtn}
                    onClick={() => navigate(-1)}
                    onMouseEnter={e => e.currentTarget.style.color = "#F0EDE6"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(240,237,230,0.35)"}
                >
                    ← Volver
                </button>

                <div style={styles.pageHeader}>
                    <div>
                        <h1 style={styles.title}>
                            Editar <em style={styles.titleItalic}>Álbum</em>
                        </h1>
                        <p style={styles.subtitle}>{album.albumName}</p>
                    </div>
                </div>

                <div style={styles.divider} />

                {/* SUCCESS BANNER */}
                {saved && (
                    <div style={styles.successBanner}>
                        <span style={styles.successIcon}>✓</span>
                        <span style={styles.successText}>Álbum actualizado correctamente</span>
                    </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    {/* ALBUM NAME — full width */}
                    <div style={styles.fieldFull}>
                        <label style={styles.label}>NOMBRE DEL ÁLBUM</label>
                        <input
                            style={styles.input}
                            type="text"
                            name="albumName"
                            value={album.albumName}
                            onChange={handleChange}
                            required
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </div>

                    {/* ARTISTA */}
                    <FieldGroup label="ARTISTA">
                        <select
                            style={{ ...styles.input, ...(newArtist ? styles.inputDisabled : {}) }}
                            name="artistId"
                            value={album.artistId}
                            onChange={handleChange}
                            disabled={!!newArtist}
                            onFocus={e => { if (!newArtist) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        >
                            <option value="">Seleccionar artista</option>
                            {artists.map(a => <option key={a.id} value={a.id}>{a.artistName}</option>)}
                        </select>
                        <div style={styles.orRow}>
                            <span style={styles.orLine} />
                            <span style={styles.orText}>o nuevo</span>
                            <span style={styles.orLine} />
                        </div>
                        <input
                            style={{ ...styles.input, ...(album.artistId ? styles.inputDisabled : {}) }}
                            type="text"
                            placeholder="Nombre del nuevo artista"
                            value={newArtist}
                            disabled={!!album.artistId}
                            onChange={e => setNewArtist(e.target.value)}
                            onFocus={e => { if (!album.artistId) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </FieldGroup>

                    {/* GÉNERO */}
                    <FieldGroup label="GÉNERO">
                        <select
                            style={{ ...styles.input, ...(newGenre ? styles.inputDisabled : {}) }}
                            name="genreId"
                            value={album.genreId}
                            onChange={handleChange}
                            disabled={!!newGenre}
                            onFocus={e => { if (!newGenre) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        >
                            <option value="">Seleccionar género</option>
                            {genres.map(g => <option key={g.id} value={g.id}>{g.genresName}</option>)}
                        </select>
                        <div style={styles.orRow}>
                            <span style={styles.orLine} />
                            <span style={styles.orText}>o nuevo</span>
                            <span style={styles.orLine} />
                        </div>
                        <input
                            style={{ ...styles.input, ...(album.genreId ? styles.inputDisabled : {}) }}
                            type="text"
                            placeholder="Nombre del nuevo género"
                            value={newGenre}
                            disabled={!!album.genreId}
                            onChange={e => setNewGenre(e.target.value)}
                            onFocus={e => { if (!album.genreId) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </FieldGroup>

                    {/* FORMATO */}
                    <FieldGroup label="FORMATO">
                        <select
                            style={{ ...styles.input, ...(newFormat ? styles.inputDisabled : {}) }}
                            name="formatId"
                            value={album.formatId}
                            onChange={handleChange}
                            disabled={!!newFormat}
                            onFocus={e => { if (!newFormat) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        >
                            <option value="">Seleccionar formato</option>
                            {formats.map(f => <option key={f.id} value={f.id}>{f.formatType}</option>)}
                        </select>
                        <div style={styles.orRow}>
                            <span style={styles.orLine} />
                            <span style={styles.orText}>o nuevo</span>
                            <span style={styles.orLine} />
                        </div>
                        <input
                            style={{ ...styles.input, ...(album.formatId ? styles.inputDisabled : {}) }}
                            type="text"
                            placeholder="Nombre del nuevo formato"
                            value={newFormat}
                            disabled={!!album.formatId}
                            onChange={e => setNewFormat(e.target.value)}
                            onFocus={e => { if (!album.formatId) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </FieldGroup>

                    {/* AÑO */}
                    <FieldGroup label="AÑO DE LANZAMIENTO">
                        <select
                            style={{ ...styles.input, ...(newYear ? styles.inputDisabled : {}) }}
                            name="yearRelease"
                            value={album.yearRelease}
                            onChange={handleChange}
                            disabled={!!newYear}
                            onFocus={e => { if (!newYear) { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        >
                            <option value="">Seleccionar año</option>
                            {years.map(y => <option key={y.yearRelease} value={y.yearRelease}>{y.yearRelease}</option>)}
                        </select>
                        <div style={styles.orRow}>
                            <span style={styles.orLine} />
                            <span style={styles.orText}>o nuevo</span>
                            <span style={styles.orLine} />
                        </div>
                        <input
                            style={{ ...styles.input, ...(album.yearRelease ? styles.inputDisabled : {}), ...(yearError ? styles.inputError : {}) }}
                            type="text"
                            placeholder="Ej. 1975"
                            value={newYear}
                            maxLength={4}
                            disabled={!!album.yearRelease}
                            onChange={e => { if (/^\d{0,4}$/.test(e.target.value)) { setNewYear(e.target.value); setYearError(""); } }}
                            onFocus={e => { if (!album.yearRelease) { e.currentTarget.style.borderColor = yearError ? "rgba(224,123,139,0.6)" : "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; } }}
                            onBlur={e => { e.currentTarget.style.borderColor = yearError ? "rgba(224,123,139,0.4)" : "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                        {yearError && <p style={styles.errorText}>{yearError}</p>}
                    </FieldGroup>

                    {/* STOCK */}
                    <div style={styles.field}>
                        <label style={styles.label}>STOCK</label>
                        <input
                            style={styles.input}
                            type="number"
                            name="stock"
                            value={album.stock}
                            onChange={handleChange}
                            required
                            min="0"
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </div>

                    {/* PRECIO */}
                    <div style={styles.field}>
                        <label style={styles.label}>PRECIO</label>
                        <input
                            style={styles.input}
                            type="number"
                            step="0.01"
                            name="cost"
                            value={album.cost}
                            onChange={handleChange}
                            required
                            min="0"
                            onFocus={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "#161616"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "#111"; }}
                        />
                    </div>

                    {/* ACTIONS */}
                    <div style={styles.actions}>
                        <button
                            type="button"
                            style={styles.cancelBtn}
                            onClick={() => navigate(-1)}
                            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"}
                            onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                ...styles.saveBtn,
                                ...(saving || saved ? styles.saveBtnActive : {}),
                            }}
                            disabled={saving || saved}
                            onMouseEnter={e => { if (!saving && !saved) { e.currentTarget.style.background = "#D4B05A"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                            onMouseLeave={e => { if (!saving && !saved) { e.currentTarget.style.background = "#C9A84C"; e.currentTarget.style.transform = "translateY(0)"; } }}
                        >
                            {saving ? "Guardando..." : saved ? "✓ Guardado" : "Guardar cambios"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

// Helper sub-component for select + new input groups
function FieldGroup({ label, children }) {
    return (
        <div style={fieldGroupStyles.wrap}>
            <label style={fieldGroupStyles.label}>{label}</label>
            {children}
        </div>
    );
}

const fieldGroupStyles = {
    wrap: { display: "flex", flexDirection: "column", gap: "0" },
    label: { fontSize: "9px", letterSpacing: "0.25em", color: "rgba(240,237,230,0.3)", marginBottom: "8px", fontFamily: "Arial, sans-serif" },
};

export default EditAlbumPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
    },
    inner: {
        width: "100%",
        maxWidth: "860px",
    },

    /* LOADING */
    loadingWrap: {
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", height: "100vh", backgroundColor: "#0D0D0D", gap: "16px",
    },
    loadingSpinner: {
        width: "32px", height: "32px", borderRadius: "50%",
        border: "2px solid rgba(201,168,76,0.15)", borderTop: "2px solid #C9A84C",
        animation: "spin 0.9s linear infinite",
    },
    loadingText: { fontSize: "13px", color: "rgba(240,237,230,0.3)", letterSpacing: "0.1em", fontFamily: "Arial, sans-serif" },

    /* BACK */
    backBtn: {
        background: "transparent", border: "none", color: "rgba(240,237,230,0.35)",
        fontSize: "12px", letterSpacing: "0.1em", cursor: "pointer",
        padding: "0 0 28px", fontFamily: "Arial, sans-serif", transition: "color 0.2s", display: "block",
    },

    /* HEADER */
    pageHeader: { marginBottom: "28px" },
    eyebrow: { fontSize: "11px", letterSpacing: "0.3em", color: "#C9A84C", marginBottom: "10px" },
    title: {
        fontSize: "42px", fontWeight: "300", fontFamily: "Georgia, serif",
        color: "#F0EDE6", margin: "0 0 8px", lineHeight: "1.1",
    },
    titleItalic: { fontStyle: "italic", color: "#C9A84C" },
    subtitle: { fontSize: "13px", color: "rgba(240,237,230,0.35)", margin: 0, letterSpacing: "0.05em" },

    divider: { height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "36px" },

    /* SUCCESS */
    successBanner: {
        display: "flex", alignItems: "center", gap: "14px",
        border: "1px solid rgba(123,224,160,0.25)", background: "rgba(123,224,160,0.05)",
        borderRadius: "2px", padding: "16px 24px", marginBottom: "28px",
    },
    successIcon: { fontSize: "16px", color: "#7BE0A0" },
    successText: { fontSize: "13px", fontFamily: "Georgia, serif", fontStyle: "italic", color: "#7BE0A0", letterSpacing: "0.04em" },

    /* FORM */
    form: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "24px 32px",
    },
    fieldFull: { gridColumn: "1 / 3", display: "flex", flexDirection: "column", gap: "0" },
    field: { display: "flex", flexDirection: "column" },

    label: {
        fontSize: "9px", letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)", marginBottom: "8px",
    },
    input: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "14px",
        padding: "12px 14px",
        fontFamily: "Georgia, serif",
        outline: "none",
        transition: "border-color 0.2s, background 0.2s",
        width: "100%",
        boxSizing: "border-box",
        marginBottom: "0",
        appearance: "none",
        WebkitAppearance: "none",
    },
    inputDisabled: {
        opacity: 0.3,
        cursor: "not-allowed",
    },
    inputError: {
        borderColor: "rgba(224,123,139,0.4)",
    },
    errorText: {
        fontSize: "11px", color: "#E07B8B", margin: "6px 0 0",
        letterSpacing: "0.04em",
    },

    /* OR ROW */
    orRow: {
        display: "flex", alignItems: "center", gap: "10px",
        margin: "10px 0",
    },
    orLine: { flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" },
    orText: { fontSize: "9px", letterSpacing: "0.15em", color: "rgba(240,237,230,0.2)" },

    /* ACTIONS */
    actions: {
        gridColumn: "1 / 3",
        display: "flex",
        justifyContent: "flex-end",
        gap: "12px",
        paddingTop: "12px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        marginTop: "8px",
    },
    cancelBtn: {
        background: "transparent", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px", color: "rgba(240,237,230,0.45)",
        fontSize: "12px", letterSpacing: "0.1em", fontWeight: "700",
        padding: "12px 24px", cursor: "pointer",
        fontFamily: "Arial, sans-serif", transition: "border-color 0.2s",
    },
    saveBtn: {
        backgroundColor: "#C9A84C", border: "none", borderRadius: "2px",
        color: "#0D0D0D", fontWeight: "700", fontSize: "12px",
        letterSpacing: "0.12em", cursor: "pointer", padding: "12px 32px",
        fontFamily: "Arial, sans-serif", transition: "background 0.2s, transform 0.2s",
    },
    saveBtnActive: {
        background: "#7BE0A0", transform: "translateY(0)", cursor: "default",
    },
};

if (typeof document !== "undefined") {
    const s = document.createElement("style");
    s.textContent = `
        @keyframes spin { to { transform: rotate(360deg); } }
        select option { background: #1a1a1a; color: #F0EDE6; }
    `;
    if (!document.head.querySelector("[data-vr-spin]")) {
        s.setAttribute("data-vr-spin", "1");
        document.head.appendChild(s);
    }
}