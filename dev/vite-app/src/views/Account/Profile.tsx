import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

const Profile = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [accountInfo, setAccountInfo] = useState([]);

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

	useEffect(() => {
		if (isAuthenticated) {
			//fetchApiData("/api/1/transaction/all", setOrders);
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Edit your profile" />
			<div className="mt-8"></div>
		</div>
	);
};

export default Profile;
