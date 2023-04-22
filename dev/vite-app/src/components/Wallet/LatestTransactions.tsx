import { ReactNode } from "react";
import Transaction from "./Transaction";

const LatestTransactions = () => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster ">
			<p className="text-primaryText text-lg font-medium">Latest Transactions</p>
			<ul className="divide-y-[0.1px] divide-secondary">
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
				<Transaction />
			</ul>
		</div>
	);
};

export default LatestTransactions;
