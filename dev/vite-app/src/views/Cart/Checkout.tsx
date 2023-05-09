import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import CartCheckoutItem from "../../components/Cart/CartCheckoutItem";
import { CartContext } from "../../hooks/CartProvider";

import axios from "axios";

import { Link } from "react-router-dom";
import { ItemProps } from "../../components/StoreItem";
import { CartItemProps } from ".";

const Checkout = () => {
	useDocumentTitle("Cart");
	const { getCartItems, addCartItem, removeCartItem, setCartItem } = useContext(CartContext);
	const cartItems = getCartItems();
	const [products, setProducts] = useState<ItemProps[]>([]);

    useEffect(() => {
		const fetchProducts = async () => {
			const itemIds = Object.keys(cartItems);
			const requests = itemIds.map((itemId) => axios.get(`/api/1/products/${itemId}`));
			try {
				const responses = await Promise.all(requests);
				const fetchedProducts = responses.map((response) => response.data.data);
				setProducts(fetchedProducts);
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

	let itemComp = consolidatedItems.map((cartItem: CartItemProps) => {
		const { item, quantity } = cartItem;
		return (
			<li key={item.id}>
				<CartCheckoutItem item={item} quantity={quantity ?? 0} />
			</li>
		);
	});

	let subtotal = consolidatedItems.reduce((acc, curr) => acc + (curr.item.price ? curr.item.price : 0) * curr.quantity, 0).toFixed(2);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Checkout" />
			<div className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
					<div className="flex flex-col items-center">
						<div className="bg-secondary p-8 shadow-md rounded-3xl w-full">
							Checkout items
                            <ul>
								{itemComp}
							</ul>
						</div>
                        <div className="bg-secondary p-8 mt-8 shadow-md rounded-3xl w-full">
							Payment method
						</div>
                        <div className="bg-secondary p-8 mt-8 shadow-md rounded-3xl w-full">
							Shipping
						</div>
					</div>
					<div className="h-full md:h-auto">
						<div className="rounded-3xl shadow-md cursor-pointer bg-secondary flex flex-col items-center">
							<h2 className="text-xl w-full py-4 px-6 font-semibold">Total</h2>
							<ul className="w-full">
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 rounded-b-3xl w-full">${subtotal}</li>
							</ul>
						</div>

                        <button className="bg-green-500 w-full text-white font-semibold rounded-3xl shadow-md px-8 py-4 mt-8">Place order</button>
						
					</div>
				</div>
            </div>              
		</div>
	);
};

export default Checkout;
