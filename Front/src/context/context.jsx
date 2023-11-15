import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalItems, setTotalItems] = useState(0);

    const addToCart = (item) => {
        console.log(item);
        if (cartItems.some((i) => i._id === item._id)) {
            setCartItems(
                cartItems.map((i) =>
                    i._id === item._id ? { ...i, quanty: i.quanty + 1 } : i
                )
            );
            setTotal(total + item.price);
            setTotalItems(totalItems + 1);
            return;
        }
        item.quanty = 1;
        setTotal(total + item.price);
        setTotalItems(totalItems + 1);
        setCartItems((prevItems) => [...prevItems, item]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, total, totalItems }}>
        {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};