import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

import axios from "axios";

import Balance from "../components/Wallet/Balance";
import ActionHolder from "../components/Wallet/ActionHolder";
import LatestTransactions from "../components/Wallet/LatestTransactions";

import { BsArrowBarUp, BsArrowBarDown } from "react-icons/bs";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [balance, setBalance] = useState(0);
	useDocumentTitle("Wallet");

	useEffect(() => {
		if (isAuthenticated) {
			const fetchBalance = async () => {
				try {
					const response = await axios.get("/api/1/wallet/balance", {
						headers: { Authorization: `Bearer ${accessToken}` },
					});
					setBalance(response.data.data.balance);
				} catch (error) {
					console.error("Error fetching balance:", error);
				}
			};
			fetchBalance();
		}
	}, [isAuthenticated, accessToken]);

	const walletContent = isAuthenticated ? (
		<div className="mt-8">
			<Balance amount={balance} />
			<div className="py-6 flex overflow-auto no-scrollbar">
				<ActionHolder title="Top up" icon={<BsArrowBarUp />} onClick={() => console.log("Clicked")} />
				<ActionHolder title="Withdraw" icon={<BsArrowBarDown />} onClick={() => console.log("Clicked")} />
				<ActionHolder title="Transfer" icon={<BsArrowBarUp />} onClick={() => console.log("Clicked")} />
				<ActionHolder title="Pay" icon={<BsArrowBarDown />} onClick={() => console.log("Clicked")} />
			</div>
			<LatestTransactions />
		</div>
	) : (
		<div className="mt-8">
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
