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
	const randomId = Math.random().toString(36).substring(2, 11);

	return (
		<nav className="bg-secondary bottom-0 fixed flex flex-row md:flex-col items-center justify-between w-full md:p-4 shadow-lg h-[5rem] md:h-3/4 md:w-24 md:top-1/2 md:left-0 transform md:-translate-y-1/2 rounded-tr-[1.5rem] rounded-tl-[1.5rem] md:rounded-tl-none md:rounded-tr-[2rem] md:rounded-br-[2rem]">
			<Link to="/" className="font-fugazone hidden md:block">
				<h1 className="my-2 text-2xl">FF</h1>
			</Link>
			<ul className="flex flex-row flex-grow justify-center items-center md:flex-grow-0 md:flex-col md:w-full">
				{navItems.map(({ icon, notification, link, onClick }) => (
					<NavItem key={link ? link : randomId} icon={icon} notification={notification} link={link} onClick={onClick} />
				))}
			</ul>
		</nav>
	);
};

export default Nav;
