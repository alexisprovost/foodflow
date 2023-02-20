import { Link } from "react-router-dom";
import { FaWallet, FaUserAlt } from "react-icons/fa";
import NavCart from "./Nav/NavCart";

const Nav = () => {
	return (
		<nav>
			<div className="branding">
				<Link to="/">
					<h1>FF</h1>
				</Link>
			</div>
			<ul>
				<li>
					<Link to="/dashboard">
						<FaWallet className="icon" />
					</Link>
				</li>
				<li>
					<Link to="/login">
						<FaUserAlt className="icon" />
					</Link>
				</li>
				<li>
					<Link to="/cart">
						<NavCart />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
