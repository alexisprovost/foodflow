import React, { useState, useEffect } from "react";
import axios from "axios";

import { BiPlus, BiMinus } from "react-icons/bi";

interface CartItemProps {
	productId: number;
	quantity: number;
	onIncreaseQuantity: () => void;
	onDecreaseQuantity: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ productId, quantity, onIncreaseQuantity, onDecreaseQuantity }) => {
	const [product, setProduct] = useState({ name: "", price: 0, url_image: "" });

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
		<div className="flex bg-secondary items-center p-3 my-8 shadow rounded-[1rem]">
			<div
				className="h-12 w-12 bg-[auto_100%] bg-center bg-no-repeat rounded-md"
				style={{
					backgroundImage: `url(${product.url_image})`,
				}}
			/>
			<div className="ml-4 flex-grow">
				<h3 className="text-base font-semibold text-white">{product.name}</h3>
				<p className="text-base font-semibold ">${(product.price * quantity).toFixed(2)}</p>
			</div>
			<div className="ml-4">
				<div className="flex flex-col items-center justify-content-center p-1 mt-1 bg-primaryButton rounded-[1rem] ">
					<button className="flex items-center justify-center text-white py-1 rounded-md text-sm w-full" onClick={onIncreaseQuantity}>
						<BiPlus />
					</button>
					<p className="text-sm text-white mx-2">{quantity}</p>
					<button className="flex items-center justify-center text-white py-1 rounded-md text-sm w-full" onClick={onDecreaseQuantity}>
						<BiMinus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
