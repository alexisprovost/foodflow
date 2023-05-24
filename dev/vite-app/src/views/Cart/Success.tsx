import React, { useContext, useEffect, useRef, useState } from "react";
import lottie, { AnimationItem } from "lottie-web";
import confetti from "../../assets/lotties/confetti.json";

import { CartContext } from "../../hooks/CartProvider";

import { useNavigate } from "react-router-dom";

const Success = () => {
	const animation2Container = useRef<HTMLDivElement | null>(null);

	const { emptyCart } = useContext(CartContext);

	const [animLoaded, setAnimLoaded] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		if (!animLoaded && animation2Container.current !== null) {
			const animation = lottie.loadAnimation({
				container: animation2Container.current,
				renderer: "svg",
				loop: false,
				autoplay: true,
				animationData: confetti,
			});

			animation.setSpeed(1);
			setAnimLoaded(true);
		}
	}, [animLoaded]);

	useEffect(() => {
		emptyCart();
	}, []);

	return (
		<div className="flex flex-col items-center justify-center z-10 relative h-[inherit]">
			<div ref={animation2Container} className="absolute w-full top-0 left-0 z-0 pointer-events-none h-[inherit]">
				{" "}
			</div>
			<h1 className="text-3xl font-bold">Success!</h1>
			<p className="text-center text-xl mt-4">
				Your order has been placed. <br /> You will receive a confirmation email shortly.
			</p>
			<button className="mt-8 bg-green-500 text-white font-semibold rounded-3xl shadow-md flex justify-center px-8 py-4 transition-all hover:bg-green-600" onClick={() => navigate("/")}>
				Back to home
			</button>
		</div>
	);
};

export default React.memo(Success);
