import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

import Balance from "../components/Wallet/Balance";
import ActionHolder from "../components/Wallet/ActionHolder";
import LatestTransactions from "../components/Wallet/LatestTransactions";

import { BsArrowBarUp, BsArrowBarDown } from "react-icons/bs";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	useDocumentTitle("Wallet");

	const walletContent = isAuthenticated ? (
		<div className="my-8">
			<Balance />
			<div className="py-6 flex overflow-auto no-scrollbar">
				<ActionHolder title="Top up" icon={<BsArrowBarUp />} />
				<ActionHolder title="Withdraw" icon={<BsArrowBarDown />} />
			</div>
			<LatestTransactions />
		</div>
	) : (
		<div className="my-8">
			<p>Not logged in</p>
		</div>
	);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Wallet" />
			{walletContent}
		</div>
	);
};

export default Wallet;
