import { Link } from "react-router-dom";
import NavItem from "./NavItem";

interface NavItemProps {
	icon: JSX.Element;
	notification?: number;
	link?: string;
	onClick?: () => void;
}

interface NavProps {
	navItems: NavItemProps[];
}

const Nav = ({ navItems }: NavProps) => {
	return (
		<nav className="bg-secondary top-1/2 transform -translate-y-1/2 h-3/4 w-24 fixed left-0 flex flex-col items-center justify-between p-4 rounded-tr-[2rem] rounded-br-[2rem] shadow-lg">
			<Link to="/" className="font-fugazone">
				<h1 className="my-2 text-2xl">FF</h1>
			</Link>
			<ul className="w-full ">
				{navItems.map(({ icon, notification, link, onClick }) => (
					<NavItem key={link} icon={icon} notification={notification} link={link} onClick={onClick} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
