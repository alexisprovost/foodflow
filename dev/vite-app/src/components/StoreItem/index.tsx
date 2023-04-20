import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../hooks/CartProvider";

export interface ItemProps {
	id: number;
	name: string;
	quantity?: number;
	price?: number;
	added_date?: string;
	barcode?: string;
	categories?: string[];
	format?: string;
	url_image?: string;
}

const StoreItem: React.FC<ItemProps> = ({ id, name, url_image, quantity, price }) => {
	const { addCartItem } = useContext(CartContext);

	let onclickfunction = () => {
		addCartItem(id, 1);
	};

	return (
		<div onClick={onclickfunction} className="bg-secondary p-4 rounded-[1rem] flex items-end flex-wrap justify-between hover:cursor-pointer">
			<div className="text-2xl lg:text-base md:text-sm sm:text-xs font-bold pb-6">{name}</div>
			<div
				className="img h-48 w-full rounded-lg bg-[length:auto_100%] bg-no-repeat bg-center"
				style={{
					backgroundImage: `url(${url_image})`,
				}}
			/>
			<div className="w-full mt-4 text-right font-medium text-lg">${price}</div>
		</div>
	);
};

export default StoreItem;
