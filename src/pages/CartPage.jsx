import { useCart } from "../context/CartContext";
import axios from "axios";

function CartPage() {

    const {
        cartItems,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    const total =
        cartItems.reduce(
            (sum, item) =>
                sum + (item.cost * item.quantity),
            0
        );

    const handleRemove = async (item) => {

        try {

            await axios.post(
                `http://localhost:8080/inventory/restore/${item.id}`
            );

            removeFromCart(item.id);

        } catch (error) {

            console.error(error);

        }

    };

    const increaseItem = async (item) => {

        try {

            await axios.post(
                `http://localhost:8080/inventory/sell/${item.id}`
            );

            increaseQuantity(item.id);

        } catch (error) {

            alert("Stock no disponible");

        }

    };

    const decreaseItem = async (item) => {

        try {

            await axios.post(
                `http://localhost:8080/inventory/restore/${item.id}`
            );

            decreaseQuantity(item.id);

        } catch (error) {

            console.error(error);

        }

    };

    const handleClearCart = async () => {

        try {

            for (const item of cartItems) {

                for (let i = 0; i < item.quantity; i++) {

                    await axios.post(
                        `http://localhost:8080/inventory/restore/${item.id}`
                    );

                }

            }

            clearCart();

        } catch (error) {

            console.error(error);

        }

    };

    const handleCheckout = () => {

        alert("Compra realizada con éxito 🎉");

        clearCart();

    };

    return (

        <div style={styles.container}>

            <h1>🛒 Carrito</h1>

            {cartItems.length === 0 ? (

                <p>El carrito esta vacío</p>

            ) : (

                cartItems.map(item => (

                    <div
                        key={item.id}
                        style={styles.card}
                    >

                        <img
                            src={
                                item.imageUrl
                                    ? `http://localhost:8080/images/${item.imageUrl}`
                                    : "https://via.placeholder.com/200"
                            }
                            alt={item.albumName}
                            style={styles.image}
                        />

                        <div>

                            <h3>{item.albumName}</h3>

                            <p>{item.artistName}</p>

                            <p>${item.cost}</p>

                        </div>

                        <div style={styles.quantityContainer}>

                            <button
                                style={styles.qtyButton}
                                onClick={() => decreaseItem(item)}
                            >
                                ➖
                            </button>

                            <span style={styles.quantity}>
                                {item.quantity}
                            </span>

                            <button
                                style={styles.qtyButton}
                                onClick={() => increaseItem(item)}
                            >
                                ➕
                            </button>

                        </div>

                        <button
                            style={styles.removeButton}
                            onClick={() => handleRemove(item)}
                        >
                            ❌ Quitar
                        </button>

                    </div>

                ))

            )}

            <h2>
                💰 Total: ${total.toFixed(2)}
            </h2>

            <button
                style={styles.clearButton}
                onClick={handleClearCart}
            >
                Cancelar Venta
            </button>

            <button
                style={styles.checkoutButton}
                onClick={handleCheckout}
            >
                Aceptar Venta
            </button>

        </div>

    );

}

export default CartPage;

const styles = {

    container: {
        padding: "30px",
        backgroundColor: "#121212",
        color: "white",
        minHeight: "100vh"
    },

    card: {
        backgroundColor: "#181818",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    removeButton: {
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        cursor: "pointer"
    },

    clearButton: {
        marginTop: "20px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#b91c1c",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
    },

    quantityContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "10px"
    },

    qtyButton: {
        border: "none",
        borderRadius: "50%",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        backgroundColor: "#1db954",
        color: "white",
        fontWeight: "bold"
    },

    quantity: {
        fontSize: "18px",
        fontWeight: "bold"
    },

    image: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "10px"
    },

    checkoutButton: {
        marginTop: "20px",
        marginLeft: "15px",
        padding: "12px 20px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#1db954",
        color: "white",
        cursor: "pointer",
        fontWeight: "bold"
    },

};