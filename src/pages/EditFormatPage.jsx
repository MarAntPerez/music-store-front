import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import EditEntityPage from "../components/EditEntityPage";

function EditFormatPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [format, setFormat] = useState({ formatType: "" });

    useEffect(() => {
        axios.get(`http://localhost:8080/formats/${id}`)
            .then(r => setFormat(r.data))
            .catch(console.error);
    }, [id]);

    const handleChange = e => setFormat({ ...format, [e.target.name]: e.target.value });

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/formats/${id}`, format);
            navigate("/formats");
        } catch (error) { console.error(error); }
    };

    return (
        <EditEntityPage
            eyebrow="GESTIÓN DE FORMATOS"
            title="Editar"
            titleAccent="Formato"
            fields={[{ name: "formatType", label: "Tipo de formato" }]}
            values={format}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
}

export default EditFormatPage;