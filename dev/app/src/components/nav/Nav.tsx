import { Link } from "react-router-dom";
import { FaWallet, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import NavItem from "./NavItem";

const Nav = () => {
	return (
		<nav className="top-1/2 transform -translate-y-1/2 h-3/4 w-24 fixed left-0 flex flex-col items-center justify-between p-4 rounded-tr-[2rem] rounded-br-[2rem] shadow-lg">
			<div className="branding text-lg font-bold text-primary-text">
				<Link to="/">
					<h1>FF</h1>
				</Link>
			</div>
			<ul>
				<li>
					<Link to="/dashboard">
						<NavItem icon={<FaWallet />} />
					</Link>
				</li>
				<li>
					<Link to="/login">
						<NavItem icon={<FaUserAlt />} />
					</Link>
				</li>
				<li>
					<Link to="/cart">
						<NavItem icon={<FaShoppingCart />} notification={2} />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
