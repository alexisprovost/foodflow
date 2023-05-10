import React, { useState, useEffect } from "react";
import { ItemProps } from "../StoreItem";

import { BiPlus, BiMinus } from "react-icons/bi";

import { CartItemProps } from "../../views/Cart";

const CartItem: React.FC<CartItemProps> = ({ item, quantity, onQuantityChange }) => {
	const [product, setProduct] = useState<ItemProps>(item);

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onQuantityChange) return;
		const newQuantity = parseInt(e.target.value, 10);
		onQuantityChange(isNaN(newQuantity) ? 0 : newQuantity);
	};

	return (
		<div className="flex bg-secondary items-center p-3 md:p-6 my-8 shadow rounded-[1rem]">
			<div
				className="h-12 w-12 md:h-24 md:w-24 bg-[auto_100%] bg-center bg-no-repeat rounded-md"
				style={{
					backgroundImage: `url(${product.url_image})`,
				}}
			/>
			<div className="ml-4 flex-grow">
				<h3 className="text-base font-semibold text-white">{product.name}</h3>
				<p className="text-base font-semibold ">${((product.price ? product.price : 0) * quantity).toFixed(2)}</p>
			</div>
			<div className="ml-4">
				<div className="flex flex-col items-center justify-content-center p-1 mt-1 bg-primaryButton rounded-[1rem] ">
					<button
						className="flex items-center justify-center text-white py-1 rounded-md text-sm w-full"
						onClick={() => {
							if (onQuantityChange) onQuantityChange(quantity + 1);
						}}
					>
						<BiPlus />
					</button>
					<div className="relative">
						<p className="text-sm text-white mx-2">{quantity}</p>
						<input type="number" pattern="\d*" min="0" value={quantity} className="text-sm absolute top-0 left-0 w-full h-full opacity-0" onChange={handleQuantityChange} />
					</div>
					<button
						className="flex items-center justify-center text-white py-1 rounded-md text-sm w-full"
						onClick={() => {
							if (onQuantityChange) onQuantityChange(quantity - 1);
						}}
					>
						<BiMinus />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
