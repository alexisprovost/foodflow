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

	const changeRole = async (userId: number, newRole: string) => {
		try {
			const response = await axios.put(`/api/1/users/${userId}/role`, { role: newRole }, { headers: { Authorization: `Bearer ${accessToken}` } });
			fetchApiData("/api/1/users/all", setUsers);
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	const changeBalance = async (userId: number, newBalance: number) => {
		try {
			const response = await axios.put(`/api/1/wallet/${userId}/balance`, { balance: newBalance }, { headers: { Authorization: `Bearer ${accessToken}` } });
			fetchApiData("/api/1/users/all", setUsers);
		} catch (error) {
			console.log("There was an error: ", error);
		}
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
								<td className="px-6 py-4 whitespace-nowrap">
									<select className="bg-secondary" defaultValue={user.role} onChange={(e) => changeRole(user.id, e.target.value)} {...(user.role === 100 && { disabled: true })}>
										<option value="0">User</option>
										<option value="90">Admin</option>
										<option value="100" disabled>
											Super Admin
										</option>
									</select>
								</td>
								<td className="px-6 py-4 whitespace-nowrap">
									<input className="bg-secondary" type="number" defaultValue={user.balance} onBlur={(e) => changeBalance(user.id, parseFloat(e.target.value))} />$
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Users;
