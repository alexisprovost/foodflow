import { ReactNode } from "react";

interface ActionHolderProps {
	title: string;
	icon: ReactNode;
}

const ActionHolder = ({ title = "Top Up", icon }: ActionHolderProps) => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster bg-teal-500 rounded-[1rem] min-w-[8rem] p-4 mr-4 flex align-middle">
			{icon}
			<p className="text-primaryText text-lg font-bold ml-2">{title}</p>
		</div>
	);
};

export default ActionHolder;
