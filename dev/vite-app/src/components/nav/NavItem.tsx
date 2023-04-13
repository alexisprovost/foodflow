import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	icon: ReactNode;
	notification?: number;
	link?: string;
	onClick?: () => void;
};

const NavItem = ({ icon, notification, link, onClick }: ButtonProps) => {
	let innerItem = (
		<div className="my-4 icon relative inline-block text-3xl w-full hover:cursor-pointer">
			<li className="flex items-center justify-center mx-auto" onClick={onClick}>
				<div className="inline-block">
					{notification && <span className="bg-white text-black w-5 h-5 text-xs flex items-center justify-center rounded-full absolute right-3 transform translate-x-1/2 -translate-y-1/2">{notification}</span>}
					{icon}
				</div>
			</li>
		</div>
	);

	if (link) {
		return (
			<Link to={link} className="">
				{innerItem}
			</Link>
		);
	} else {
		return innerItem;
	}
};

export default NavItem;
