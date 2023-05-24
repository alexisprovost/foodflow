import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

const Orders = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [orders, setOrders] = useState([]);

	const fetchApiData = async (apiUrl: string, setSearchFunction: Function, params = {}) => {
		try {
			const response = await axios.get(apiUrl, { headers: { Authorization: `Bearer ${accessToken}` }, params });
			if (response.data.status === "success") {
				setSearchFunction(response.data.data);
			}
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	const formatCurrency = (amount: string) => {
		return parseFloat(amount).toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchApiData("/api/1/transaction/all", setOrders);
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Orders" />
			<div className="mt-8">
				<table className="min-w-full divide-y divide-black-800">
					<thead className="bg-secondary">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
						</tr>
					</thead>
					<tbody className="bg-secondary divide-y divide-black-800">
						{orders.map((order: any, index: number) =>
							order.products.map((product: any, productIndex: number) => (
								<tr key={`${index}-${productIndex}`}>
									<td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
									<td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toLocaleDateString()}</td>
									<td className="px-6 py-4 whitespace-nowrap">{product.product.name}</td>
									<td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Orders;
