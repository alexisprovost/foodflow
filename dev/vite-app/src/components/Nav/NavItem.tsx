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
		<div className="">
			<li className="flex items-center justify-center mx-auto" onClick={onClick}>
				<div className="inline-block">
					{(notification || notification == 0) && <span className="bg-white font-extrabold text-black p-1 h-5 min-w-[1.25rem] text-sm flex items-center justify-center rounded-full absolute right-0 md:right-3 transform translate-x-1/2 -translate-y-1/2">{notification}</span>}
					{icon}
				</div>
			</li>
		</div>
	);

	if (link) {
		return (
			<Link to={link} className="m-4 icon relative inline-block text-3xl w-full hover:cursor-pointer md:m-4">
				{innerItem}
			</Link>
		);
	} else {
		return innerItem;
	}
};

export default NavItem;
