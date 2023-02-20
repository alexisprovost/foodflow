import { FaShoppingCart } from "react-icons/fa";

const NavCart = () => {

	return (
		<div className="icon relative inline-block">
			<span className="bg-white text-black w-5 h-5 text-xs flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
				5
			</span>
			<FaShoppingCart className="text-white" />
		</div>
	);
};

export default NavCart;
