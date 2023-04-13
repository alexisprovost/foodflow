import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import { ItemProps } from "../components/Item";


interface CartContextType{
    addCartItems: (item: ItemProps) => void;
    removeCartItems: (id: number) => void;
    getCartItems: () => any;
}

export const CartContext = createContext<CartContextType>({
    addCartItems: () => {},
    removeCartItems: () => {},
    getCartItems: () => {},
});

interface CartProps{
    children: React.ReactNode;
}

const CartProvider: React.FC<CartProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<ItemProps[]>([]);

    const addCartItems = (item: ItemProps) => {
        setCartItems((prev) => [...prev, item]);
        console.log("Cart Items: ", JSON.stringify(cartItems));
        
    };

    const removeCartItems = (id: number) => {
        setCartItems((prev) => {
            const { [id]: _, ...rest } = prev;
            return rest;
        });
    };

    const getCartItems = () => {
        return cartItems;
    };

    const contextValue = {
        addCartItems,
        removeCartItems,
        getCartItems,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;