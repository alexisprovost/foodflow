import React, { useState, useEffect, createContext, useContext } from "react";
import { ItemProps } from "../components/StoreItem";

interface CartContextType {
	addCartItem: (itemId: number, quantity: number) => void;
	removeCartItem: (itemId: number) => void;
	setCartItem: (itemId: number, newQuantity: number) => void;
	getCartItems: () => Record<number, number>;
	onCartItemsChange: (callback: (items: Record<number, number>) => void) => void;
	getNbCartItems: (itemId: number) => number;
	emptyCart: () => void;
}

export const CartContext = createContext<CartContextType>({
	addCartItem: () => {},
	removeCartItem: () => {},
	getCartItems: () => ({}),
	onCartItemsChange: () => {},
	getNbCartItems: () => 0,
	setCartItem: () => {},
	emptyCart: () => {},
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

	const setCartItem = (itemId: number, newQuantity: number) => {
		setCartItems((prev) => {
			const newItems = { ...prev };

			if (newQuantity > 0) {
				newItems[itemId] = newQuantity;
			} else {
				delete newItems[itemId];
			}

			return newItems;
		});
	};

	const getNbCartItems = () => {
		const itemIds = Object.keys(cartItems) as unknown as number[];
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

	const emptyCart = () => {
		setCartItems({});
	};

	const loadFromLocalStorage = () => {
		const savedCartItems = localStorage.getItem(CART_STORAGE_KEY);
		if (savedCartItems) {
			const parsedSavedCartItems = JSON.parse(savedCartItems);
			if (Object.keys(parsedSavedCartItems).length > 0) {
				setCartItems(parsedSavedCartItems);
			}
		}
	};

	useEffect(() => {
		loadFromLocalStorage();
	}, []);

	useEffect(() => {
		// Save to local storage
		localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

		itemChangeCallbacks.forEach((callback) => callback(cartItems));
	}, [cartItems, itemChangeCallbacks]);

	const contextValue = {
		addCartItem,
		removeCartItem,
		setCartItem,
		getCartItems,
		onCartItemsChange,
		getNbCartItems,
		emptyCart,
	};

	return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export default CartProvider;
