import { Link } from "react-router-dom";
import { FaWallet, FaUserAlt } from "react-icons/fa";

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
						<FaWallet />
					</Link>
				</li>
				<li>
					<Link to="/login">
						<FaUserAlt />
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
