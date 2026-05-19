import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryAlbumsPage from "../components/CategoryAlbumsPage";

function GenreAlbumsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [genreName, setGenreName] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAlbums(); }, [id]);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/albums/genre/${id}`);
            setAlbums(response.data);
            if (response.data.length > 0) setGenreName(response.data[0].genreName);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este género?")) return;
        try {
            await axios.delete(`http://localhost:8080/genres/${id}`);
            navigate("/genres");
        } catch (error) { console.error(error); }
    };

    const isReal = Number(id) !== 0;

    return (
        <CategoryAlbumsPage
            eyebrow="EXPLORAR POR GÉNERO"
            categoryLabel="Género"
            categoryName={genreName}
            albums={albums}
            loading={loading}
            editPath={isReal ? `/genres/edit/${id}` : null}
            onDelete={isReal ? handleDelete : null}
        />
    );
}

export default GenreAlbumsPage;