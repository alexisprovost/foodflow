import { ReactNode } from "react";
import Transaction from "./Transaction";

const LatestTransactions = () => {
	return (
		<div className="animate__animated animate__fadeIn animate__faster ">
			<p className="text-primaryText text-lg font-medium">Latest Transactions</p>
			<ul className="divide-y">
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
