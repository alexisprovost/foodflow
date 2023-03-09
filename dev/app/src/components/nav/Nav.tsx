import { Link } from "react-router-dom";
import { FaWallet, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import NavItem from "./NavItem";

const Nav = () => {
	return (
		<nav className="bg-navBg top-1/2 transform -translate-y-1/2 h-3/4 w-24 fixed left-0 flex flex-col items-center justify-between p-4 rounded-tr-[2rem] rounded-br-[2rem] shadow-lg">
			<Link to="/" className="font-fugazone">
				<h1 className="my-2 text-2xl">FF</h1>
			</Link>
			<ul className="w-full ">
				<NavItem icon={<FaWallet />} link="/wallet" />
				<NavItem icon={<FaShoppingCart />} notification={2} link="/cart" />
				<NavItem icon={<FaUserAlt />} link="/login" />
			</ul>
		</nav>
	);
};

export default Nav;
