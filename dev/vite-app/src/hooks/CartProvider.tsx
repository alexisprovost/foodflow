import React, { useState, useEffect, createContext, useContext } from "react";
import { ItemProps } from "../components/StoreItem";

interface CartContextType {
	addCartItem: (itemId: number, quantity: number) => void;
	removeCartItem: (itemId: number) => void;
	getCartItems: () => Record<number, number>;
	onCartItemsChange: (callback: (items: Record<number, number>) => void) => void;
	getNbCartItems: (itemId: number) => number;
}

export const CartContext = createContext<CartContextType>({
	addCartItem: () => {},
	removeCartItem: () => {},
	getCartItems: () => ({}),
	onCartItemsChange: () => {},
	getNbCartItems: () => 0,
});

interface CartProps {
	children: React.ReactNode;
}

const CART_STORAGE_KEY = "cartItems";

const CartProvider: React.FC<CartProps> = ({ children }) => {
	const [cartItems, setCartItems] = useState<Record<number, number>>({});
	const [itemChangeCallbacks, setItemChangeCallbacks] = useState<((items: Record<number, number>) => void)[]>([]);

	const addCartItem = (itemId: number, quantity: number) => {
		setCartItems((prev) => ({
			...prev,
			[itemId]: (prev[itemId] ?? 0) + quantity,
		}));
	};

	const removeCartItem = (itemId: number) => {
		setCartItems((prev) => {
			const newItems = { ...prev };
			const currentQuantity = prev[itemId] ?? 0;

			if (currentQuantity > 1) {
				newItems[itemId] = currentQuantity - 1;
			} else {
				delete newItems[itemId];
			}

			return newItems;
		});
	};

	const getNbCartItems = () => {
		const itemIds = Object.keys(cartItems);
		const totalQuantity = itemIds.reduce((total, itemId) => {
			return total + cartItems[itemId];
		}, 0);
		return totalQuantity;
	};

	const getCartItems = () => {
		return cartItems;
	};

	const onCartItemsChange = (callback: (items: Record<number, number>) => void) => {
		setItemChangeCallbacks((prev) => [...prev, callback]);
	};

	useEffect(() => {
		// Load cart items from localStorage on component mount
		const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
		if (savedCartItems) {
			setCartItems(JSON.parse(savedCartItems));
		}
	}, []);

	useEffect(() => {
		// Save cart items to localStorage whenever they change
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

		itemChangeCallbacks.forEach((callback) => callback(cartItems));
	}, [cartItems, itemChangeCallbacks]);

	const contextValue = {
		addCartItem,
		removeCartItem,
		getCartItems,
		onCartItemsChange,
		getNbCartItems,
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
