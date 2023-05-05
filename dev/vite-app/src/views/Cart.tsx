import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import CartItem from "../components/CartItem";
import { CartContext } from "../hooks/CartProvider";

import axios from "axios";

import { Link } from "react-router-dom";
import { ItemProps } from "../components/StoreItem";

export interface CartItemProps {
	item: ItemProps;
	quantity: number;
	onQuantityChange: (newQuantity: number) => void;
}

const Cart = () => {
	useDocumentTitle("Cart");
	const { getCartItems, addCartItem, removeCartItem, setCartItem } = useContext(CartContext);
	const cartItems = getCartItems();
	const [products, setProducts] = useState<ItemProps[]>([]); // Added a type for useState

	useEffect(() => {
		const fetchProducts = async () => {
			const itemIds = Object.keys(cartItems);
			const requests = itemIds.map((itemId) => axios.get(`/api/1/products/${itemId}`));
			try {
				const responses = await Promise.all(requests);
				const fetchedProducts = responses.map((response) => response.data.data);
				setProducts(fetchedProducts); // Set the fetched products to the state
			} catch (error) {
				console.error(error);
			}
		};

		fetchProducts();
	}, [cartItems]);

	const increaseQuantity = (itemId: number) => {
		addCartItem(itemId, 1);
	};

	const decreaseQuantity = (itemId: number) => {
		removeCartItem(itemId);
	};

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		setCartItem(itemId, newQuantity);
	};

	const consolidatedItems = products.map((product) => {
		return {
			item: product,
			quantity: cartItems[product.id],
			onQuantityChange: (newQuantity: number) => handleQuantityChange(product.id, newQuantity),
		};
	});

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Cart" />
			<div className="mt-8">
				{consolidatedItems.length > 0 ? (
					consolidatedItems.map((cartItem: CartItemProps) => {
						const { item, quantity } = cartItem;
						return (
							<div key={item.id}>
								<CartItem item={item} quantity={quantity ?? 0} onQuantityChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)} />
							</div>
						);
					})
				) : (
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<p className="text-white mt-4 pt-4 text-center">
								Your cart is currently empty.
								<br />
								Please visit the <Link to="/">shop</Link> to add products to your cart.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
