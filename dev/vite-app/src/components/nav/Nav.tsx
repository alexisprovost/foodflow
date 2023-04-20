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
	const randomId = Math.random().toString(36).substr(2, 9);

	return (
		<nav className="md:top-1/2 bg-secondary bottom-0 transform md:-translate-y-1/2 md:h-3/4 md:w-24 h-24 w-full fixed md:left-0 flex md:flex-col flex-row items-center justify-between p-4 md:rounded-tr-[2rem] md:rounded-br-[2rem] shadow-lg">
			<Link to="/" className="font-fugazone">
				<h1 className="my-2 text-2xl">FF</h1>
			</Link>
			<ul className="md:w-full flex">
				{navItems.map(({ icon, notification, link, onClick }) => (
					<NavItem key={link ? link : randomId} icon={icon} notification={notification} link={link} onClick={onClick} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
