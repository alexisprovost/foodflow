import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../hooks/CartProvider";
import Lottie from "react-lottie";
import checkAnimationData from "../../assets/lotties/add-to-cart.json";

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

const StoreItem: React.FC<ItemProps> = ({ id, name, url_image, quantity = 0, price }) => {
	const { addCartItem } = useContext(CartContext);
	const [isClicked, setIsClicked] = useState(false);

	const defaultOptions = {
		loop: false,
		autoplay: true,

		animationData: checkAnimationData,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	let onClickFunction = () => {
		addCartItem(id, 1);
		setIsClicked(true);
	};

	useEffect(() => {
		if (isClicked) {
			setTimeout(() => {
				setIsClicked(false);
			}, 700);
		}
	}, [isClicked]);

	return (
		<div onClick={onClickFunction} className="relative bg-secondary p-4 rounded-[1rem] justify-between hover:cursor-pointer">
			<div className={`absolute inset-0 flex items-center justify-center bg-black ${isClicked ? "opacity-50" : "opacity-0"} transition-opacity duration-500 rounded-[1rem]`} />
			{isClicked && (
				<div className="absolute inset-0 flex items-center justify-center z-[1]">
					<Lottie options={defaultOptions} height={75} width={75} speed={3} isStopped={!isClicked} isPaused={!isClicked} />
				</div>
			)}
			<div className={`${isClicked ? "blur-md" : ""}`}>
				<div className="text-2xl md:text-base xl:text-2xl font-bold pb-6">{name}</div>
				<div
					className={`img h-48 w-full rounded-lg bg-[length:auto_100%] bg-no-repeat bg-center`}
					style={{
						backgroundImage: `url(${url_image})`,
					}}
				/>
				<div className="w-full mt-4 text-right font-medium text-lg">${price}</div>
				{/*<div className="w-full mt-4 text-right font-medium text-lg">Available Quantity: {quantity}</div>*/}
			</div>
		</div>
	);
};

export default StoreItem;
