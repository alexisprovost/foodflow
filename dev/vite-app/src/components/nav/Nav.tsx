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
		<nav className="bg-secondary bottom-0 fixed flex flex-row md:flex-col items-center justify-between w-full p-4 shadow-lg h-24 md:h-3/4 md:w-24 md:top-1/2 md:left-0 transform md:-translate-y-1/2 rounded-tr-[2rem] rounded-tl-[2rem] md:rounded-tl-none  md:rounded-br-[2rem]">
			<Link to="/" className="font-fugazone">
				<h1 className="my-2 text-2xl">FF</h1>
			</Link>
			<ul className="flex flex-row md:flex-col md:w-full">
				{navItems.map(({ icon, notification, link, onClick }) => (
					<NavItem key={link ? link : randomId} icon={icon} notification={notification} link={link} onClick={onClick} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
