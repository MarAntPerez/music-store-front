import { useEffect, useState } from "react";
import axios from "axios";

function InventoryPage() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const res = await axios.get(
                "http://localhost:8080/inventory/value"
            );

            setData(res.data);

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <div style={styles.container}>

            <h2 style={styles.title}>Inventario por formato</h2>

            <div style={styles.grid}>

                {data.map((d, i) => (

                    <div key={i} style={styles.card}>

                        <h3>{d.formatType}</h3>
                        <p>📦 Unidades: {d.totalUnits}</p>
                        <p>💲 Total: ${Number(d.totalValue).toFixed(2)}</p>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default InventoryPage;

const styles = {
    container: {
        padding: "30px",
        paddingTop: "110px",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "white"
    },
    title: {
        textAlign: "center",
        marginBottom: "20px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "20px"
    },
    card: {
        backgroundColor: "#181818",
        padding: "15px",
        borderRadius: "12px",
        textAlign: "center"
    }
};