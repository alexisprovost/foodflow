import React, { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../../hooks/CartProvider";
import lottie, { AnimationItem } from "lottie-web";
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
	const animationContainer = useRef<HTMLDivElement>(null);
	const [animation, setAnimation] = useState<AnimationItem | null>(null);

	let onClickFunction = () => {
		addCartItem(id, 1);
		setIsClicked(true);
	};

	useEffect(() => {
		if (isClicked && animationContainer.current) {
			const animationConfig: any = {
				container: animationContainer.current,
				renderer: "svg",
				loop: false,
				autoplay: true,
				animationData: checkAnimationData,
			};

			const anim = lottie.loadAnimation(animationConfig);
			anim.setSpeed(3); // Set animation speed to x3

			const onAnimationComplete = () => {
				setIsClicked(false);
				setAnimation(null);
				if (animationContainer.current) {
					animationContainer.current.innerHTML = "";
				}
			};

			anim.addEventListener("complete", onAnimationComplete);

			setAnimation(anim);

			return () => {
				anim.removeEventListener("complete", onAnimationComplete);
			};
		}
	}, [isClicked]);

	return (
		<div onClick={onClickFunction} className="relative bg-secondary p-4 rounded-[1rem] justify-between hover:cursor-pointer">
			<div className={`absolute inset-0 flex items-center justify-center bg-black ${isClicked ? "opacity-50" : "opacity-0"} transition-opacity duration-500 rounded-[1rem]`} />
			{isClicked && (
				<div className="absolute inset-0 flex items-center justify-center z-[1]">
					<div ref={animationContainer} className="h-[75px] w-[75px]"></div>
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
			</div>
		</div>
	);
};

export default StoreItem;
