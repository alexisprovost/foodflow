import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

const Users = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [users, setUsers] = useState([]);

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
			fetchApiData("/api/1/users/all", setUsers);
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Users" />
			<div className="mt-8">
				<table className="min-w-full divide-y divide-black-800">
					<thead className="bg-secondary">
						<tr>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
							<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
						</tr>
					</thead>
					<tbody className="bg-secondary divide-y divide-black-800">
						{users.map((user: any, index) => (
							<tr key={index}>
								<td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
								<td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
								<td className="px-6 py-4 whitespace-nowrap">{formatCurrency(user.balance)}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
