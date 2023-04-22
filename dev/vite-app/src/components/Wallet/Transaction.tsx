import { ReactNode } from "react";
import { FaAppleAlt } from "react-icons/fa";

const Transaction = () => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster flex items-center py-4">
			<div className="flex items-center mr-4">
				<FaAppleAlt size={25} className="flex-shrink-0" />
			</div>
			<div className="flex flex-col flex-1 min-w-0">
				<p className="text-primaryText text-lg font-bold truncate">Bought Doritos, Nestea, Trailmix, Trailmix</p>
				<p className="text-primaryText text-base font-medium truncate">3:24PM Apr 22, 2023</p>
			</div>
			<hr />
		</div>
	);
};

export default Transaction;
