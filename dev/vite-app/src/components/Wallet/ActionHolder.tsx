import { ReactElement, ReactNode, cloneElement } from "react";

interface ActionHolderProps {
	title: string;
	icon: ReactNode;
	onClick: () => void;
}

const ActionHolder = ({ title = "Top Up", icon, onClick }: ActionHolderProps) => {
	const actionIcon = cloneElement(icon as ReactElement, { size: 25 });

	return (
		<div className="animate__animated animate__fadeIn animate__faster bg-primaryButton rounded-[1rem] p-4 mr-4 flex items-center cursor-pointer" onClick={onClick}>
			<div className="flex-shrink-0">{actionIcon}</div>
			<div className="flex-1 ml-2">
				<p className="text-primaryText text-lg font-bold truncate">{title}</p>
			</div>
		</div>
	);
};

export default ActionHolder;
