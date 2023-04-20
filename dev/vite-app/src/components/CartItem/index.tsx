import React, { useState, useEffect } from "react";
import axios from "axios";

interface CartItemProps {
	productId: number;
	quantity: number;
	onIncreaseQuantity: () => void;
	onDecreaseQuantity: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity, onIncreaseQuantity, onDecreaseQuantity }) => {
	const [product, setProduct] = useState({ name: "", price: 0, url_image: "" });

	console.log(productId);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await axios.get(`/api/1/products/${productId.toString()}`);
				setProduct(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProduct();
	}, [productId]);

	return (
		<div className="flex bg-secondary items-center p-4 my-8 shadow rounded-[1rem]">
			<div
				className="h-24 w-24 bg-[auto_100%] bg-center bg-no-repeat rounded-md"
				style={{
					backgroundImage: `url(${product.url_image})`,
				}}
			/>
			<div className="ml-4 flex-grow">
				<h3 className="text-lg font-semibold text-white">{product.name}</h3>
				<div className="flex items-center mt-1">
					<button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm" onClick={onDecreaseQuantity}>
						-
					</button>
					<p className="text-sm text-gray-500 mx-2">Quantity: {quantity}</p>
					<button className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm" onClick={onIncreaseQuantity}>
						+
					</button>
				</div>
			</div>
			<div className="ml-4">
				<p className="text-xl font-semibold ">${(product.price * quantity).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default CartItem;
