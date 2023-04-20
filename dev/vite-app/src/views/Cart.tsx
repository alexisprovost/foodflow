import { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import CartItem from "../components/CartItem";
import { CartContext } from "../hooks/CartProvider";

const Cart = () => {
	useDocumentTitle("Cart");
	const { getCartItems, addCartItem, removeCartItem } = useContext(CartContext);
	const cartItems = getCartItems();

	const increaseQuantity = (itemId: number) => {
		addCartItem(itemId, 1);
	};

	const decreaseQuantity = (itemId: number) => {
		removeCartItem(itemId);
	};

	// Consolidate items with the same id and sum their quantities
	const consolidatedItems = Object.entries(cartItems)
		.map(([itemId, quantity]) => ({
			id: Number(itemId),
			quantity,
		}))
		.reduce((accumulator, currentItem) => {
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
				{Array.isArray(consolidatedItems) &&
					consolidatedItems.map((item) => {
						const { id, quantity } = item;
						return (
							<div key={id}>
								<CartItem productId={id} quantity={quantity ?? 0} onDecreaseQuantity={() => decreaseQuantity(id)} onIncreaseQuantity={() => increaseQuantity(id)} />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Cart;
