import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import Balance from "../../components/Wallet/Balance";
import ActionHolder from "../../components/Wallet/ActionHolder";
import LatestTransactions from "../../components/Wallet/LatestTransactions";

import { RiMoneyDollarBoxLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbPigMoney } from "react-icons/tb";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [balance, setBalance] = useState(0);
	const navigate = useNavigate();
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
			<div className="py-6 flex no-scrollbar overflow-scroll overflow-scrolling-touch">
				<ActionHolder title="Top up" icon={<RiMoneyDollarBoxLine />} onClick={() => navigate("/wallet/top-up")} />
				<ActionHolder title="Withdraw" icon={<BiMoneyWithdraw />} onClick={() => navigate("/wallet/withdraw")} />
				<ActionHolder title="Tip" icon={<TbPigMoney />} onClick={() => navigate("/wallet/tip")} />
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
