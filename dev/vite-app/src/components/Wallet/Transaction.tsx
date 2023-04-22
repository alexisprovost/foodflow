import { ReactNode } from "react";
import { FaAppleAlt } from "react-icons/fa";

const Transaction = () => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster flex py-4">
			<FaAppleAlt size={25} className="flex-shrink-0 mr-4" />
			<div className="flex flex-col truncate">
				<p className="text-primaryText text-lg font-bold">Bought Doritos, Nestea, Trailmix, Trailmix</p>
				<p className="text-primaryText text-base font-medium">3:24PM Apr 22, 2023</p>
			</div>
			<hr />
		</div>
	);
};

export default Transaction;
