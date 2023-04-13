import React, { useState, useEffect, createContext, useContext } from "react";
import { ItemProps } from "../components/Item";

interface CartContextType {
	addCartItems: (item: ItemProps) => void;
	removeCartItems: (id: number) => void;
	getCartItems: () => ItemProps[];
	onCartItemsChange: (callback: (items: ItemProps[]) => void) => void;
}

export const CartContext = createContext<CartContextType>({
	addCartItems: () => {},
	removeCartItems: () => {},
	getCartItems: () => [],
	onCartItemsChange: () => {},
});

interface CartProps {
	children: React.ReactNode;
}

const CartProvider: React.FC<CartProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<ItemProps[]>([]);
	const [itemChangeCallbacks, setItemChangeCallbacks] = useState<((items: ItemProps[]) => void)[]>([]);

	const addCartItems = (item: ItemProps) => {
		setCartItems((prev) => [...prev, item]);
	};

	const removeCartItems = (id: number) => {
		setCartItems((prev) => prev.filter((item) => item.id !== id));
	};

	const getCartItems = () => {
		return cartItems;
	};

	const onCartItemsChange = (callback: (items: ItemProps[]) => void) => {
		setItemChangeCallbacks((prev) => [...prev, callback]);
	};

	useEffect(() => {
		itemChangeCallbacks.forEach((callback) => callback(cartItems));
	}, [cartItems, itemChangeCallbacks]);

	const contextValue = {
		addCartItems,
		removeCartItems,
		getCartItems,
		onCartItemsChange,
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
