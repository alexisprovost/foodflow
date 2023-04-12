import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
	icon: ReactNode;
	notification?: number;
	link?: string;
};

const NavItem = ({ icon, notification, link }: ButtonProps) => {
	return (
		<Link to={link ? link : ""} className="icon relative inline-block text-3xl  w-full">
			<div className="my-4">
				<li className="flex items-center justify-center mx-auto">
					<div className="inline-block">
						{notification && <span className="bg-white text-black w-5 h-5 text-xs flex items-center justify-center rounded-full absolute right-3 transform translate-x-1/2 -translate-y-1/2">{notification}</span>}
						{icon}
					</div>
				</li>
			</div>
		</Link>
	);
};

export default NavItem;
