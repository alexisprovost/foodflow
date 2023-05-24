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
			//
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Users" />
		</div>
	);
};

export default Users;
