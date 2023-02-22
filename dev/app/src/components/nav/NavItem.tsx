import { ReactNode } from "react";
import { IconType } from "react-icons/lib";

type ButtonProps = {
	icon: ReactNode;
	notification?: number;
};

const NavItem = ({ icon, notification }: ButtonProps) => {
	return (
		<div className="icon relative inline-block text-3xl my-4 w-full">
			{notification && (
				<span className="bg-white text-black w-5 h-5 text-xs flex items-center justify-center rounded-full absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
					{notification}
				</span>
			)}
			{icon}
		</div>
	);
};

export default NavItem;
