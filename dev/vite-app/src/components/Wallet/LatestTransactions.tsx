import { ReactNode, useEffect, useContext, useState } from "react";
import Transaction from "./Transaction";
import axios from "axios";
import { AuthContext } from "../../hooks/AuthProvider";
import { FaAppleAlt } from "react-icons/fa";

const LatestTransactions = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [transactions, setTransactions] = useState([]);
	useEffect(() => {
		if (isAuthenticated) {
			const fetchtransactions = async () => {
				try {
					const response = await axios.get("/api/1/transaction/", {
						headers: { Authorization: `Bearer ${accessToken}` },
					});
					setTransactions(response.data.data);
				} catch (error) {
					console.error("Error fetching transactions:", error);
				}
			};
			fetchtransactions();
		}
	}, [isAuthenticated, accessToken]);
	return (
		<div className="animate__animated animate__fadeIn animate__faster ">
			<p className="text-primaryText text-lg font-medium">Latest Transactions</p>
			<ul className="divide-y-[0.1px] divide-secondary">
				{transactions.length > 0 ? (
					transactions.map((transaction) => (
						<>
							<Transaction icon={<FaAppleAlt />} date={new Date(transaction)} itemList={[transaction.products.map((product: any) => product.product.name)]} />
						</>
					))
				) : (
					<p className="text-primaryText text-lg font-medium py-6">No transactions</p>
				)}
			</ul>
		</div>
	);
};

export default LatestTransactions;
