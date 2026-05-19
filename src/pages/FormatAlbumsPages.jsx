import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryAlbumsPage from "../components/CategoryAlbumsPage";

function FormatAlbumsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [formatName, setFormatName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAlbums(); }, [id]);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/albums/format/${id}`);
            setAlbums(response.data);
            if (response.data.length > 0) setFormatName(response.data[0].formatType);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este formato?")) return;
        try {
            await axios.delete(`http://localhost:8080/formats/${id}`);
            navigate("/formats");
        } catch (error) { console.error(error); }
    };

    const isReal = Number(id) !== 0;

    return (
        <CategoryAlbumsPage
            eyebrow="EXPLORAR POR FORMATO"
            categoryLabel="Formato"
            categoryName={formatName}
            albums={albums}
            loading={loading}
            editPath={isReal ? `/formats/edit/${id}` : null}
            onDelete={isReal ? handleDelete : null}
        />
    );
}

export default FormatAlbumsPage;