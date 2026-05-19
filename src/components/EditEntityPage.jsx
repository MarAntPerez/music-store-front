import { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Componente base reutilizable para páginas de edición simples.
 *
 * Props:
 *  - eyebrow:   string   — texto pequeño superior, ej. "GESTIÓN DE CATÁLOGO"
 *  - title:     string   — primera parte del título, ej. "Editar"
 *  - titleAccent: string — parte en cursiva dorada, ej. "Artista"
 *  - fields:    Array<{ name, label, placeholder?, type? }>
 *  - values:    object   — estado actual del formulario
 *  - onChange:  fn(e)    — handler de cambio
 *  - onSubmit:  fn(e)    — handler de submit
 */
function EditEntityPage({
    eyebrow = "GESTIÓN DE CATÁLOGO",
    title = "Editar",
    titleAccent = "",
    fields = [],
    values = {},
    onChange,
    onSubmit,
}) {
    const navigate = useNavigate();
    const [focused, setFocused] = useState(null);
    const [saveHovered, setSaveHovered] = useState(false);
    const [cancelHovered, setCancelHovered] = useState(false);

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
                    <p style={styles.eyebrow}>{eyebrow}</p>
                    <h1 style={styles.title}>
                        {title}{" "}
                        {titleAccent && <em style={styles.titleItalic}>{titleAccent}</em>}
                    </h1>
                </div>

                <div style={styles.divider} />

                {/* FORM */}
                <form onSubmit={onSubmit} style={styles.form}>
                    {fields.map(field => (
                        <div key={field.name} style={styles.fieldGroup}>
                            <p style={styles.fieldLabel}>{field.label.toUpperCase()}</p>
                            <input
                                style={{
                                    ...styles.input,
                                    ...(focused === field.name ? styles.inputFocused : {}),
                                    ...(field.name === "duration"
                                        ? { letterSpacing: "0.12em", textAlign: "center", maxWidth: "160px" }
                                        : {}),
                                }}
                                type={field.type || "text"}
                                name={field.name}
                                placeholder={field.placeholder || ""}
                                value={values[field.name] || ""}
                                onChange={onChange}
                                onFocus={() => setFocused(field.name)}
                                onBlur={() => setFocused(null)}
                                required
                            />
                        </div>
                    ))}

                    <div style={styles.dividerThin} />

                    <div style={styles.buttonRow}>
                        <button
                            type="button"
                            style={{
                                ...styles.cancelButton,
                                ...(cancelHovered ? styles.cancelButtonHovered : {}),
                            }}
                            onMouseEnter={() => setCancelHovered(true)}
                            onMouseLeave={() => setCancelHovered(false)}
                            onClick={() => navigate(-1)}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            style={{
                                ...styles.saveButton,
                                ...(saveHovered ? styles.saveButtonHovered : {}),
                            }}
                            onMouseEnter={() => setSaveHovered(true)}
                            onMouseLeave={() => setSaveHovered(false)}
                        >
                            <span style={styles.saveIcon}>✦</span>
                            Guardar cambios
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default EditEntityPage;

export const styles = {
    container: {
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "100px 48px 80px",
    },
    inner: {
        width: "100%",
        maxWidth: "520px",
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
        marginBottom: "36px",
    },
    dividerThin: {
        height: "1px",
        background: "rgba(255,255,255,0.05)",
        margin: "32px 0 28px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "22px",
    },

    fieldGroup: { display: "flex", flexDirection: "column" },
    fieldLabel: {
        fontSize: "10px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)",
        margin: "0 0 10px",
    },
    input: {
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "2px",
        color: "#F0EDE6",
        fontSize: "14px",
        padding: "12px 16px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        outline: "none",
        transition: "border-color 0.2s",
        width: "100%",
        boxSizing: "border-box",
    },
    inputFocused: {
        borderColor: "rgba(201,168,76,0.5)",
    },

    buttonRow: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
    },
    cancelButton: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.45)",
        fontSize: "11px",
        letterSpacing: "0.1em",
        padding: "11px 22px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "border-color 0.2s, color 0.2s",
    },
    cancelButtonHovered: {
        borderColor: "rgba(255,255,255,0.22)",
        color: "rgba(240,237,230,0.7)",
    },
    saveButton: {
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
        padding: "11px 28px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
    },
    saveButtonHovered: {
        background: "#D4B05A",
        transform: "translateY(-1px)",
    },
    saveIcon: {
        fontSize: "12px",
        color: "rgba(13,13,13,0.55)",
    },
};