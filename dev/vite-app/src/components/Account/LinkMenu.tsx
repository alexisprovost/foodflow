import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons";

export interface LinkProps {
	title: string;
	link?: string;
	onClick?: () => void;
	icon?: ReactElement<IconType>;
	disable?: boolean;
}

export interface LinkMenuProps {
	title?: string;
	links: LinkProps[];
	className?: string;
}

const LinkMenu = ({ title, links, className }: LinkMenuProps) => {
	const classes = className ? className : "";
	const navigate = useNavigate();

	return (
		<div className={`rounded-3xl bg-secondary flex flex-col items-center ${classes}`}>
			{title && <h2 className="text-xl w-full py-4 px-6 font-semibold">{title}</h2>}
			<ul className="w-full">
				{links.map((link) => (
					<li
						className={`text-lg font-normal py-4 shadow-inner px-6  ${link === links[links.length - 1] ? "rounded-b-3xl" : ""} ${!title ? "rounded-t-3xl" : ""} ${link.disable ? "bg-black/25 cursor-default" : "hover:bg-black/25 cursor-pointer"} w-full`}
						onClick={() => {
							if (!link.disable) {
								if (link.onClick) {
									link.onClick();
								} else if (link.link) {
									navigate(link.link);
								} else {
									navigate("/");
								}
							}
						}}
						style={{ display: "flex", alignItems: "center" }}
						key={link.title}
					>
						{link.icon && <span className="inline-block mr-4 text-xl">{link.icon}</span>}
						{link.title}
					</li>
				))}
			</ul>
		</div>
	);
};

export default LinkMenu;
