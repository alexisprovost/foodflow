import { ReactElement, ReactNode, cloneElement } from "react";

interface ActionHolderProps {
	title: string;
	icon: ReactNode;
	onClick: () => void;
}

const ActionHolder = ({ title = "Top Up", icon, onClick }: ActionHolderProps) => {
	const actionIcon = cloneElement(icon as ReactElement, { size: 32 });

	return (
		<div className="animate__animated animate__fadeIn animate__faster bg-primaryButton rounded-3xl p-4 h-20 mr-4 flex items-center cursor-pointer backdrop-blur-xl" onClick={onClick}>
			<div className="flex-shrink-0 px-2">{actionIcon}</div>
			<div className="flex-1 ml-2 min-w-[5rem] text-center pr-2">
				<p className="text-primaryText text-2xl font-bold truncate">{title}</p>
			</div>
		</div>
	);
};

export default ActionHolder;
