import React, { JSXElementConstructor, ReactElement, cloneElement } from "react";

interface ActionHolderProps {
	title: string;
	icon: ReactElement<any, string | JSXElementConstructor<any>>;
}

const ActionHolder = ({ title = "Top Up", icon }: ActionHolderProps) => {
	const actionIcon = cloneElement(icon, {
		size: 25,
	});

	return (
		<div className="animate__animated animate__fadeIn animate__faster bg-primaryButton rounded-[1rem] min-w-[8rem] p-4 mr-4 flex align-middle">
			{actionIcon}
			<p className="text-primaryText text-lg font-bold ml-2">{title}</p>
		</div>
	);
};

export default ActionHolder;
