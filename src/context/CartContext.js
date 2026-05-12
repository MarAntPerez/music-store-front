import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {

        const savedCart =
            localStorage.getItem("cart");

        return savedCart
            ? JSON.parse(savedCart)
            : [];

    });

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );

    }, [cartItems]);

    const addToCart = (album) => {

        setCartItems(prevItems => {

            const existingItem =
                prevItems.find(
                    item => item.id === album.id
                );

            // SI YA EXISTE
            if (existingItem) {

                return prevItems.map(item =>

                    item.id === album.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item

                );

            }

            // SI NO EXISTE
            return [

                ...prevItems,

                {
                    ...album,
                    quantity: 1
                }

            ];

        });

    };

    const removeFromCart = (albumId) => {

        setCartItems(prevItems =>
            prevItems.filter(
                item => item.id !== albumId
            )
        );

    };

    const increaseQuantity = (albumId) => {

        setCartItems(prevItems =>

            prevItems.map(item =>

                item.id === albumId
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item

            )

        );

    };

    const decreaseQuantity = (albumId) => {

        setCartItems(prevItems =>

            prevItems
                .map(item =>

                    item.id === albumId
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item

                )
                .filter(item => item.quantity > 0)

        );

    };

    const clearCart = () => {

        setCartItems([]);

        localStorage.removeItem("cart");

    };

    return (

        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >

            {children}

        </CartContext.Provider>

    );

}

export function useCart() {

    return useContext(CartContext);

}