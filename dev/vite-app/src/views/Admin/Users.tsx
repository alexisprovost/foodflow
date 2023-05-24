import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

const Users = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [topThreeProducts, setTopThreeProducts] = useState([]);
	const [bottomThreeProducts, setBottomThreeProducts] = useState([]);
	const [totalSales, setTotalSales] = useState("");

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
			fetchApiData("/api/1/stats/top-three-products", setTopThreeProducts);
			fetchApiData("/api/1/stats/bottom-three-products", setBottomThreeProducts);
			fetchApiData("/api/1/stats/total-sales", setTotalSales);
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Statistics" />

			<h2 className="text-xl font-semibold my-4">Top Three Products</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-black-800">
					<thead className="bg-secondary">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
						</tr>
					</thead>
					<tbody className="bg-secondary divide-y divide-black-800">
						{topThreeProducts.map((product: any, index) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">{product.total_quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap">{formatCurrency(product.total_sales)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h2 className="text-xl font-semibold my-4">Bottom Three Products</h2>
			<div className="overflow-x-auto">
				<table className="min-w-full divide-y divide-black-800">
					<thead className="bg-secondary">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
						</tr>
					</thead>
					<tbody className="bg-secondary divide-y divide-black-800">
						{bottomThreeProducts.map((product: any, index) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
								<td className="px-6 py-4 whitespace-nowrap">{product.total_quantity}</td>
								<td className="px-6 py-4 whitespace-nowrap">{formatCurrency(product.total_sales)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<h2 className="text-xl font-semibold my-4">Total Sales</h2>
			<div className="px-4 py-2 border rounded text-lg">
				<p>{formatCurrency(totalSales)}</p>
			</div>
		</div>
	);
};

export default Users;
