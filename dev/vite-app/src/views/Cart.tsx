import { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import CartItem from "../components/CartItem";
import { CartContext } from "../hooks/CartProvider";

import { Link } from "react-router-dom";

const Cart = () => {
	useDocumentTitle("Cart");
	const { getCartItems, addCartItem, removeCartItem, setCartItem } = useContext(CartContext);
	const cartItems = getCartItems();

	const increaseQuantity = (itemId: number) => {
		addCartItem(itemId, 1);
	};

	const decreaseQuantity = (itemId: number) => {
		removeCartItem(itemId);
	};

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		setCartItem(itemId, newQuantity);
	};

	const consolidatedItems = Object.entries(cartItems)
		.map(([itemId, quantity]) => ({
			id: Number(itemId),
			quantity,
		}))
		.reduce((accumulator: { id: number; quantity: number }[], currentItem) => {
			const existingItemIndex = accumulator.findIndex((item) => item.id === currentItem.id);

			if (existingItemIndex !== -1) {
				accumulator[existingItemIndex].quantity += currentItem.quantity;
			} else {
				accumulator.push(currentItem);
			}

			return accumulator;
		}, []);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Cart" />
			<div className="my-8">
				{Array.isArray(consolidatedItems) && consolidatedItems.length > 0 ? (
					consolidatedItems.map((item) => {
						const { id, quantity } = item;
						return (
							<div key={id}>
								<CartItem productId={id} quantity={quantity ?? 0} onQuantityChange={(newQuantity) => handleQuantityChange(id, newQuantity)} />
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
