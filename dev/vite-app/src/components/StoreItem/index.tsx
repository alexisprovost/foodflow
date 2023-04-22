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
	const [isClicked, setIsClicked] = useState(false);

	let onClickFunction = () => {
		addCartItem(id, 1);
		setIsClicked(true);
	};

	useEffect(() => {
		if (isClicked) {
			setTimeout(() => {
				setIsClicked(false);
			}, 500);
		}
	}, [isClicked]);

	return (
		<div onClick={onClickFunction} className={`bg-secondary p-4 rounded-[1rem] flex items-end flex-wrap justify-between hover:cursor-pointer ${isClicked ? "bg-emerald-600" : ""}`} style={{ transition: "background-color 0.25s ease-in-out" }}>
			<div className="text-2xl md:text-base xl:text-2xl font-bold pb-6">{name}</div>
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
