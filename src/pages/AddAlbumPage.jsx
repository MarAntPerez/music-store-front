import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddAlbumPage() {
    const navigate = useNavigate();

    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const [formats, setFormats] = useState([]);
    const [years, setYears] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [submitHovered, setSubmitHovered] = useState(false);
    const [focused, setFocused] = useState(null);
    const [dragOver, setDragOver] = useState(false);

    const [album, setAlbum] = useState({
        albumName: "",
        yearRelease: "",
        artistId: "",
        genreId: "",
        formatId: "",
        cost: "",
        stock: "",
    });

    const [newArtist, setNewArtist] = useState("");
    const [newGenre, setNewGenre] = useState("");
    const [newFormat, setNewFormat] = useState("");
    const [newYear, setNewYear] = useState("");

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        try {
            const [a, g, f, y] = await Promise.all([
                axios.get("http://localhost:8080/artists"),
                axios.get("http://localhost:8080/genres"),
                axios.get("http://localhost:8080/formats"),
                axios.get("http://localhost:8080/albums/years"),
            ]);
            setArtists(a.data);
            setGenres(g.data);
            setFormats(f.data);
            setYears(y.data);
        } catch (error) { console.error(error); }
    };

    const handleChange = e => setAlbum({ ...album, [e.target.name]: e.target.value });

    const handleImageChange = (file) => {
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            let artistId = album.artistId;
            let genreId = album.genreId;
            let formatId = album.formatId;

            if (newArtist !== "") {
                const r = await axios.post("http://localhost:8080/artists", { artistName: newArtist });
                artistId = r.data.id;
            }
            if (newGenre !== "") {
                const r = await axios.post("http://localhost:8080/genres", { genresName: newGenre });
                genreId = r.data.id;
            }
            if (newFormat !== "") {
                const r = await axios.post("http://localhost:8080/formats", { formatType: newFormat });
                formatId = r.data.id;
            }

            let yearRelease = album.yearRelease;
            if (newYear !== "") {
                if (!/^\d{4}$/.test(newYear)) { alert("El año debe contener exactamente 4 números"); return; }
                const current = new Date().getFullYear();
                const num = parseInt(newYear);
                if (num < 1900 || num > current) { alert(`El año debe estar entre 1900 y ${current}`); return; }
                yearRelease = num;
            }

            const formData = new FormData();
            formData.append("albumName", album.albumName);
            formData.append("yearRelease", yearRelease);
            formData.append("artistId", artistId);
            formData.append("genreId", genreId);
            formData.append("formatId", formatId);
            formData.append("cost", album.cost);
            formData.append("stock", album.stock);
            if (imageFile) formData.append("image", imageFile);

            await axios.post("http://localhost:8080/albums", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            navigate("/albums");
        } catch (error) { console.error(error); }
    };

    const inputStyle = (name) => ({
        ...styles.input,
        ...(focused === name ? styles.inputFocused : {}),
    });

    const selectStyle = (name) => ({
        ...styles.select,
        ...(focused === name ? styles.inputFocused : {}),
    });

    return (
        <div style={styles.container}>
            <div style={styles.inner}>

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
                    <p style={styles.eyebrow}>GESTIÓN DE COLECCIÓN</p>
                    <h1 style={styles.title}>
                        Agregar <em style={styles.titleItalic}>Álbum</em>
                    </h1>
                </div>

                <div style={styles.divider} />

                {/* FORM */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.layout}>

                        {/* LEFT — Cover upload */}
                        <div style={styles.leftCol}>
                            <p style={styles.fieldLabel}>PORTADA</p>
                            <div
                                style={{
                                    ...styles.dropzone,
                                    ...(dragOver ? styles.dropzoneActive : {}),
                                    ...(imagePreview ? styles.dropzoneWithImage : {}),
                                }}
                                onClick={() => document.getElementById("coverInput").click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => {
                                    e.preventDefault();
                                    setDragOver(false);
                                    handleImageChange(e.dataTransfer.files[0]);
                                }}
                            >
                                {imagePreview ? (
                                    <>
                                        <img src={imagePreview} alt="preview" style={styles.preview} />
                                        <div style={styles.previewOverlay}>
                                            <span style={styles.previewOverlayText}>Cambiar imagen</span>
                                        </div>
                                    </>
                                ) : (
                                    <div style={styles.dropzoneInner}>
                                        <span style={styles.dropzoneIcon}>↑</span>
                                        <p style={styles.dropzoneText}>Arrastra o haz clic</p>
                                        <p style={styles.dropzoneHint}>JPG, PNG, WEBP</p>
                                    </div>
                                )}
                            </div>
                            <input
                                id="coverInput"
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={e => handleImageChange(e.target.files[0])}
                            />
                        </div>

                        {/* RIGHT — Fields */}
                        <div style={styles.rightCol}>

                            {/* Album name */}
                            <div style={styles.fieldGroup}>
                                <p style={styles.fieldLabel}>NOMBRE DEL ÁLBUM</p>
                                <input
                                    style={inputStyle("albumName")}
                                    type="text"
                                    name="albumName"
                                    placeholder="Título del álbum"
                                    value={album.albumName}
                                    onChange={handleChange}
                                    onFocus={() => setFocused("albumName")}
                                    onBlur={() => setFocused(null)}
                                    required
                                />
                            </div>

                            {/* Artist */}
                            <div style={styles.fieldGroup}>
                                <p style={styles.fieldLabel}>ARTISTA</p>
                                <div style={styles.dualInputRow}>
                                    <select
                                        style={selectStyle("artistId")}
                                        name="artistId"
                                        value={album.artistId}
                                        onChange={handleChange}
                                        disabled={newArtist !== ""}
                                        onFocus={() => setFocused("artistId")}
                                        onBlur={() => setFocused(null)}
                                    >
                                        <option value="">Seleccionar artista</option>
                                        {artists.map(a => <option key={a.id} value={a.id}>{a.artistName}</option>)}
                                    </select>
                                    <span style={styles.orDivider}>o</span>
                                    <input
                                        style={{
                                            ...inputStyle("newArtist"),
                                            ...(album.artistId !== "" ? styles.inputDisabled : {}),
                                        }}
                                        type="text"
                                        placeholder="Nuevo artista"
                                        value={newArtist}
                                        disabled={album.artistId !== ""}
                                        onChange={e => setNewArtist(e.target.value)}
                                        onFocus={() => setFocused("newArtist")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                            </div>

                            {/* Genre + Format */}
                            <div style={styles.twoCol}>
                                <div style={styles.fieldGroup}>
                                    <p style={styles.fieldLabel}>GÉNERO</p>
                                    <select
                                        style={selectStyle("genreId")}
                                        name="genreId"
                                        value={album.genreId}
                                        onChange={handleChange}
                                        disabled={newGenre !== ""}
                                        onFocus={() => setFocused("genreId")}
                                        onBlur={() => setFocused(null)}
                                    >
                                        <option value="">Seleccionar género</option>
                                        {genres.map(g => <option key={g.id} value={g.id}>{g.genresName}</option>)}
                                    </select>
                                    <input
                                        style={{
                                            ...inputStyle("newGenre"),
                                            marginTop: "8px",
                                            ...(album.genreId !== "" ? styles.inputDisabled : {}),
                                        }}
                                        type="text"
                                        placeholder="Nuevo género"
                                        value={newGenre}
                                        disabled={album.genreId !== ""}
                                        onChange={e => setNewGenre(e.target.value)}
                                        onFocus={() => setFocused("newGenre")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                <div style={styles.fieldGroup}>
                                    <p style={styles.fieldLabel}>FORMATO</p>
                                    <select
                                        style={selectStyle("formatId")}
                                        name="formatId"
                                        value={album.formatId}
                                        onChange={handleChange}
                                        disabled={newFormat !== ""}
                                        onFocus={() => setFocused("formatId")}
                                        onBlur={() => setFocused(null)}
                                    >
                                        <option value="">Seleccionar formato</option>
                                        {formats.map(f => <option key={f.id} value={f.id}>{f.formatType}</option>)}
                                    </select>
                                    <input
                                        style={{
                                            ...inputStyle("newFormat"),
                                            marginTop: "8px",
                                            ...(album.formatId !== "" ? styles.inputDisabled : {}),
                                        }}
                                        type="text"
                                        placeholder="Nuevo formato"
                                        value={newFormat}
                                        disabled={album.formatId !== ""}
                                        onChange={e => setNewFormat(e.target.value)}
                                        onFocus={() => setFocused("newFormat")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                            </div>

                            {/* Year + Cost + Stock */}
                            <div style={styles.threeCol}>
                                <div style={styles.fieldGroup}>
                                    <p style={styles.fieldLabel}>AÑO</p>
                                    <select
                                        style={selectStyle("yearRelease")}
                                        name="yearRelease"
                                        value={album.yearRelease}
                                        onChange={handleChange}
                                        disabled={newYear !== ""}
                                        onFocus={() => setFocused("yearRelease")}
                                        onBlur={() => setFocused(null)}
                                    >
                                        <option value="">Año</option>
                                        {years.map(y => <option key={y.yearRelease} value={y.yearRelease}>{y.yearRelease}</option>)}
                                    </select>
                                    <input
                                        style={{
                                            ...inputStyle("newYear"),
                                            marginTop: "8px",
                                            textAlign: "center",
                                            letterSpacing: "0.12em",
                                            ...(album.yearRelease !== "" ? styles.inputDisabled : {}),
                                        }}
                                        type="text"
                                        placeholder="YYYY"
                                        value={newYear}
                                        maxLength={4}
                                        disabled={album.yearRelease !== ""}
                                        onChange={e => {
                                            if (/^\d{0,4}$/.test(e.target.value)) setNewYear(e.target.value);
                                        }}
                                        onFocus={() => setFocused("newYear")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                <div style={styles.fieldGroup}>
                                    <p style={styles.fieldLabel}>PRECIO</p>
                                    <input
                                        style={inputStyle("cost")}
                                        type="number"
                                        name="cost"
                                        placeholder="0.00"
                                        value={album.cost}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("cost")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>

                                <div style={styles.fieldGroup}>
                                    <p style={styles.fieldLabel}>STOCK</p>
                                    <input
                                        style={inputStyle("stock")}
                                        type="number"
                                        name="stock"
                                        placeholder="0"
                                        value={album.stock}
                                        onChange={handleChange}
                                        onFocus={() => setFocused("stock")}
                                        onBlur={() => setFocused(null)}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* SUBMIT */}
                    <div style={styles.dividerThin} />
                    <div style={styles.submitRow}>
                        <button
                            type="submit"
                            style={{
                                ...styles.submitButton,
                                ...(submitHovered ? styles.submitButtonHovered : {}),
                            }}
                            onMouseEnter={() => setSubmitHovered(true)}
                            onMouseLeave={() => setSubmitHovered(false)}
                        >
                            <span style={styles.submitIcon}>✦</span>
                            Guardar Álbum
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default AddAlbumPage;

const styles = {
    container: {
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
        padding: "100px 48px 80px",
    },
    inner: {
        maxWidth: "960px",
        margin: "0 auto",
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
        margin: "0",
        lineHeight: "1.1",
    },
    titleItalic: {
        fontStyle: "italic",
        color: "#C9A84C",
    },

    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "40px",
    },
    dividerThin: {
        height: "1px",
        background: "rgba(255,255,255,0.05)",
        margin: "36px 0 28px",
    },

    /* LAYOUT */
    form: { display: "flex", flexDirection: "column" },
    layout: {
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: "48px",
        alignItems: "start",
    },

    /* LEFT */
    leftCol: {},
    dropzone: {
        width: "100%",
        aspectRatio: "1 / 1",
        border: "1px dashed rgba(255,255,255,0.12)",
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
        transition: "border-color 0.2s",
        backgroundColor: "#111",
    },
    dropzoneActive: {
        borderColor: "rgba(201,168,76,0.5)",
        backgroundColor: "rgba(201,168,76,0.04)",
    },
    dropzoneWithImage: {
        border: "1px solid rgba(255,255,255,0.08)",
    },
    dropzoneInner: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        padding: "20px",
        pointerEvents: "none",
    },
    dropzoneIcon: {
        fontSize: "24px",
        color: "rgba(201,168,76,0.5)",
        fontFamily: "Georgia, serif",
    },
    dropzoneText: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.3)",
        margin: 0,
        letterSpacing: "0.05em",
    },
    dropzoneHint: {
        fontSize: "10px",
        color: "rgba(240,237,230,0.15)",
        margin: 0,
        letterSpacing: "0.1em",
    },
    preview: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },
    previewOverlay: {
        position: "absolute",
        inset: 0,
        background: "rgba(13,13,13,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.25s",
    },
    previewOverlayText: {
        fontSize: "11px",
        letterSpacing: "0.12em",
        color: "#C9A84C",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
    },

    /* RIGHT */
    rightCol: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    fieldGroup: { display: "flex", flexDirection: "column" },
    fieldLabel: {
        fontSize: "10px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)",
        margin: "0 0 10px",
    },

    twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
    threeCol: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" },

    dualInputRow: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
    },
    orDivider: {
        fontSize: "11px",
        color: "rgba(240,237,230,0.2)",
        letterSpacing: "0.05em",
        flexShrink: 0,
    },

    /* INPUTS */
    input: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "13px",
        padding: "11px 14px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        outline: "none",
        transition: "border-color 0.2s",
        width: "100%",
        boxSizing: "border-box",
    },
    select: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "13px",
        padding: "11px 14px",
        fontFamily: "Arial, sans-serif",
        outline: "none",
        transition: "border-color 0.2s",
        width: "100%",
        boxSizing: "border-box",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(240,237,230,0.25)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
        paddingRight: "32px",
    },
    inputFocused: {
        borderColor: "rgba(201,168,76,0.5)",
    },
    inputDisabled: {
        opacity: 0.3,
        cursor: "not-allowed",
    },

    /* SUBMIT */
    submitRow: {
        display: "flex",
        justifyContent: "flex-end",
    },
    submitButton: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        backgroundColor: "#C9A84C",
        border: "none",
        borderRadius: "2px",
        color: "#0D0D0D",
        fontWeight: "700",
        fontSize: "12px",
        letterSpacing: "0.14em",
        cursor: "pointer",
        padding: "14px 36px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
    },
    submitButtonHovered: {
        background: "#D4B05A",
        transform: "translateY(-1px)",
    },
    submitIcon: {
        fontSize: "14px",
        color: "rgba(13,13,13,0.6)",
    },
};