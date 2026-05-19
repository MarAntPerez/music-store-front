import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function AddFormatPage() {
    const navigate = useNavigate();
    const [format, setFormat] = useState({ formatType: "" });

    const handleChange = e => setFormat({ ...format, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/formats", format);
            navigate("/formats");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE FORMATOS"
            title="Agregar"
            titleAccent="Formato"
            fields={[{ name: "formatType", label: "Nombre del formato", placeholder: "Ingrese el nombre" }]}
            values={format}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default AddFormatPage;