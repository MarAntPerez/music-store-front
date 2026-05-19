import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CategoryAlbumsPage from "../components/CategoryAlbumsPage";

function YearAlbumsPage() {
    const { year } = useParams();
    const navigate = useNavigate();
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchAlbums(); }, [year]);

    const fetchAlbums = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/albums/year/${year}`);
            setAlbums(response.data);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!window.confirm("¿Seguro que deseas eliminar este año?")) return;
        try {
            await axios.put(`http://localhost:8080/albums/years/${year}`);
            navigate("/years");
        } catch (error) { console.error(error); }
    };

    const isReal = Number(year) !== 0;

    return (
        <CategoryAlbumsPage
            eyebrow="EXPLORAR POR AÑO"
            categoryLabel="Año"
            categoryName={year}
            albums={albums}
            loading={loading}
            editPath={null}
            onDelete={isReal ? handleDelete : null}
        />
    );
}

export default YearAlbumsPage;