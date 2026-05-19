import { useCart } from "../context/CartContext";
import axios from "axios";
import { useState } from "react";

function CartPage() {
    const {
        cartItems,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    const [hoveredId, setHoveredId] = useState(null);
    const [checkoutDone, setCheckoutDone] = useState(false);

    const total = cartItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleRemove = async (item) => {
        try {
            await axios.post(`http://localhost:8080/inventory/restore/${item.id}`);
            removeFromCart(item.id);
        } catch (error) {
            console.error(error);
        }
    };

    const increaseItem = async (item) => {
        try {
            await axios.post(`http://localhost:8080/inventory/sell/${item.id}`);
            increaseQuantity(item.id);
        } catch (error) {
            alert("Stock no disponible");
        }
    };

    const decreaseItem = async (item) => {
        try {
            await axios.post(`http://localhost:8080/inventory/restore/${item.id}`);
            decreaseQuantity(item.id);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClearCart = async () => {
        try {
            for (const item of cartItems) {
                for (let i = 0; i < item.quantity; i++) {
                    await axios.post(`http://localhost:8080/inventory/restore/${item.id}`);
                }
            }
            clearCart();
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckout = () => {
        setCheckoutDone(true);
        setTimeout(() => {
            clearCart();
            setCheckoutDone(false);
        }, 2200);
    };

    return (
        <div style={styles.container}>

            {/* HEADER */}
            <div style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>RESUMEN DE</p>
                    <h1 style={styles.title}>
                        Carrito <em style={styles.titleItalic}>de Compra</em>
                    </h1>
                    {cartItems.length > 0 && (
                        <p style={styles.count}>
                            {totalItems} {totalItems === 1 ? "artículo" : "artículos"} · {cartItems.length} {cartItems.length === 1 ? "álbum" : "álbumes"}
                        </p>
                    )}
                </div>

                {/* TOTAL SUMMARY */}
                {cartItems.length > 0 && (
                    <div style={styles.summaryBox}>
                        <div style={styles.summaryItem}>
                            <span style={styles.summaryLabel}>TOTAL A PAGAR</span>
                            <span style={styles.summaryValue}>${total.toFixed(2)}</span>
                        </div>
                    </div>
                )}
            </div>

            <div style={styles.divider} />

            {/* CHECKOUT SUCCESS */}
            {checkoutDone && (
                <div style={styles.successBanner}>
                    <span style={styles.successIcon}>✓</span>
                    <span style={styles.successText}>Venta realizada con éxito</span>
                </div>
            )}

            {/* EMPTY CART */}
            {!checkoutDone && cartItems.length === 0 && (
                <div style={styles.emptyState}>
                    <p style={styles.emptyIcon}>🛒</p>
                    <p style={styles.emptyTitle}>El carrito está vacío</p>
                    <p style={styles.emptyDesc}>Agrega álbumes desde el catálogo para comenzar una venta.</p>
                </div>
            )}

            {/* CART ITEMS */}
            {!checkoutDone && cartItems.length > 0 && (
                <>
                    <div style={styles.itemList}>
                        {cartItems.map((item, index) => {
                            const isHovered = hoveredId === item.id;
                            return (
                                <div
                                    key={item.id}
                                    style={{
                                        ...styles.card,
                                        ...(isHovered ? styles.cardHovered : {}),
                                    }}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    {/* LEFT COLOR BAR */}
                                    <div style={styles.colorBar} />

                                    {/* ALBUM IMAGE */}
                                    <img
                                        src={
                                            item.imageUrl
                                                ? `http://localhost:8080/images/${item.imageUrl}`
                                                : "https://via.placeholder.com/200"
                                        }
                                        alt={item.albumName}
                                        style={styles.image}
                                    />

                                    {/* ALBUM INFO */}
                                    <div style={styles.info}>
                                        <p style={styles.albumIndex}>
                                            {String(index + 1).padStart(2, "0")}
                                        </p>
                                        <h3 style={styles.albumName}>{item.albumName}</h3>
                                        <p style={styles.artistName}>{item.artistName}</p>
                                    </div>

                                    {/* QUANTITY CONTROLS */}
                                    <div style={styles.qtyWrap}>
                                        <span style={styles.qtyLabel}>CANTIDAD</span>
                                        <div style={styles.qtyControls}>
                                            <button
                                                style={styles.qtyBtn}
                                                onClick={() => decreaseItem(item)}
                                                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"}
                                                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                                            >
                                                −
                                            </button>
                                            <span style={styles.qtyNum}>{item.quantity}</span>
                                            <button
                                                style={styles.qtyBtn}
                                                onClick={() => increaseItem(item)}
                                                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"}
                                                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* PRICE */}
                                    <div style={styles.priceWrap}>
                                        <span style={styles.priceLabel}>SUBTOTAL</span>
                                        <span style={styles.price}>
                                            ${(item.cost * item.quantity).toFixed(2)}
                                        </span>
                                        <span style={styles.unitPrice}>
                                            ${Number(item.cost).toFixed(2)} c/u
                                        </span>
                                    </div>

                                    {/* REMOVE */}
                                    <button
                                        style={styles.removeBtn}
                                        onClick={() => handleRemove(item)}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.color = "#E07B8B";
                                            e.currentTarget.style.borderColor = "rgba(224,123,139,0.3)";
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.color = "rgba(240,237,230,0.2)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                                        }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div style={styles.footer}>
                        <button
                            style={styles.clearBtn}
                            onClick={handleClearCart}
                            onMouseEnter={e => {
                                e.currentTarget.style.borderColor = "rgba(224,123,139,0.5)";
                                e.currentTarget.style.color = "#E07B8B";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                                e.currentTarget.style.color = "rgba(240,237,230,0.45)";
                            }}
                        >
                            Cancelar Venta
                        </button>

                        <div style={styles.footerRight}>
                            <div style={styles.totalRow}>
                                <span style={styles.totalLabel}>TOTAL</span>
                                <span style={styles.totalValue}>${total.toFixed(2)}</span>
                            </div>
                            <button
                                style={styles.checkoutBtn}
                                onClick={handleCheckout}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = "#D4B05A";
                                    e.currentTarget.style.transform = "translateY(-1px)";
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "#C9A84C";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                Aceptar Venta
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;

const styles = {
    container: {
        padding: "100px 48px 80px",
        backgroundColor: "#0D0D0D",
        minHeight: "100vh",
        color: "#F0EDE6",
        fontFamily: "Arial, sans-serif",
    },

    /* HEADER */
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginBottom: "28px",
        flexWrap: "wrap",
        gap: "20px",
    },
    eyebrow: {
        fontSize: "11px",
        letterSpacing: "0.3em",
        color: "#C9A84C",
        marginBottom: "10px",
    },
    title: {
        fontSize: "42px",
        fontWeight: "300",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 8px",
        lineHeight: "1.1",
    },
    titleItalic: {
        fontStyle: "italic",
        color: "#C9A84C",
    },
    count: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.35)",
        margin: 0,
        letterSpacing: "0.05em",
    },

    /* SUMMARY BOX */
    summaryBox: {
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        padding: "16px 28px",
        background: "#111",
    },
    summaryItem: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
    },
    summaryLabel: {
        fontSize: "8px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.3)",
    },
    summaryValue: {
        fontSize: "26px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#C9A84C",
        letterSpacing: "0.02em",
    },

    divider: {
        height: "1px",
        background: "rgba(255,255,255,0.07)",
        marginBottom: "32px",
    },

    /* SUCCESS */
    successBanner: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        border: "1px solid rgba(123,224,160,0.25)",
        background: "rgba(123,224,160,0.05)",
        borderRadius: "2px",
        padding: "20px 28px",
        marginBottom: "24px",
    },
    successIcon: {
        fontSize: "20px",
        color: "#7BE0A0",
    },
    successText: {
        fontSize: "14px",
        fontFamily: "Georgia, serif",
        fontStyle: "italic",
        color: "#7BE0A0",
        letterSpacing: "0.05em",
    },

    /* EMPTY */
    emptyState: {
        textAlign: "center",
        padding: "100px 0",
    },
    emptyIcon: {
        fontSize: "48px",
        marginBottom: "16px",
        opacity: 0.3,
    },
    emptyTitle: {
        fontSize: "22px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        fontStyle: "italic",
        color: "rgba(240,237,230,0.5)",
        marginBottom: "10px",
    },
    emptyDesc: {
        fontSize: "13px",
        color: "rgba(240,237,230,0.25)",
        letterSpacing: "0.05em",
    },

    /* ITEM LIST */
    itemList: {
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        marginBottom: "32px",
    },

    /* CARD */
    card: {
        display: "flex",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#111",
        border: "1px solid rgba(255,255,255,0.05)",
        borderRadius: "3px",
        padding: "0 20px 0 0",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden",
    },
    cardHovered: {
        background: "#141414",
        borderColor: "rgba(201,168,76,0.15)",
    },
    colorBar: {
        width: "3px",
        alignSelf: "stretch",
        background: "#C9A84C",
        opacity: 0.5,
        flexShrink: 0,
        borderRadius: "3px 0 0 3px",
    },

    image: {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        flexShrink: 0,
        display: "block",
    },

    /* INFO */
    info: {
        flex: 1,
        minWidth: 0,
        padding: "16px 0",
    },
    albumIndex: {
        fontSize: "9px",
        letterSpacing: "0.15em",
        color: "rgba(240,237,230,0.2)",
        fontStyle: "italic",
        fontFamily: "Georgia, serif",
        marginBottom: "4px",
    },
    albumName: {
        fontSize: "16px",
        fontWeight: "400",
        fontFamily: "Georgia, serif",
        color: "#F0EDE6",
        margin: "0 0 4px",
        lineHeight: "1.2",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    artistName: {
        fontSize: "12px",
        color: "rgba(240,237,230,0.35)",
        margin: 0,
        letterSpacing: "0.04em",
    },

    /* QTY */
    qtyWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        flexShrink: 0,
    },
    qtyLabel: {
        fontSize: "8px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.2)",
    },
    qtyControls: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    qtyBtn: {
        width: "28px",
        height: "28px",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        background: "transparent",
        color: "#F0EDE6",
        fontSize: "16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "border-color 0.2s, color 0.2s",
        fontFamily: "Arial, sans-serif",
        lineHeight: 1,
        padding: 0,
    },
    qtyNum: {
        fontSize: "18px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#F0EDE6",
        minWidth: "24px",
        textAlign: "center",
    },

    /* PRICE */
    priceWrap: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
        flexShrink: 0,
        minWidth: "90px",
    },
    priceLabel: {
        fontSize: "8px",
        letterSpacing: "0.2em",
        color: "rgba(240,237,230,0.2)",
    },
    price: {
        fontSize: "20px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#C9A84C",
    },
    unitPrice: {
        fontSize: "10px",
        color: "rgba(240,237,230,0.2)",
        letterSpacing: "0.04em",
    },

    /* REMOVE */
    removeBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.2)",
        fontSize: "12px",
        width: "28px",
        height: "28px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "color 0.2s, border-color 0.2s",
        flexShrink: 0,
        padding: 0,
    },

    /* FOOTER */
    footer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "24px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
        flexWrap: "wrap",
        gap: "16px",
    },
    clearBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "2px",
        color: "rgba(240,237,230,0.45)",
        fontSize: "12px",
        letterSpacing: "0.1em",
        fontWeight: "700",
        padding: "12px 24px",
        cursor: "pointer",
        fontFamily: "Arial, sans-serif",
        transition: "color 0.2s, border-color 0.2s",
    },
    footerRight: {
        display: "flex",
        alignItems: "center",
        gap: "28px",
    },
    totalRow: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "4px",
    },
    totalLabel: {
        fontSize: "8px",
        letterSpacing: "0.25em",
        color: "rgba(240,237,230,0.25)",
    },
    totalValue: {
        fontSize: "28px",
        fontFamily: "Georgia, serif",
        fontWeight: "300",
        color: "#C9A84C",
    },
    checkoutBtn: {
        backgroundColor: "#C9A84C",
        border: "none",
        borderRadius: "2px",
        color: "#0D0D0D",
        fontWeight: "700",
        fontSize: "12px",
        letterSpacing: "0.12em",
        cursor: "pointer",
        padding: "14px 32px",
        fontFamily: "Arial, sans-serif",
        transition: "background 0.2s, transform 0.2s",
        whiteSpace: "nowrap",
    },
};