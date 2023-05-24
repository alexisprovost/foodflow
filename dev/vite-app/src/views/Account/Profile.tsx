import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext, UserInfo } from "../../hooks/AuthProvider";
import Title from "../../components/Title";

const Profile = () => {
	const { userInfo, setUser, isAuthenticated, accessToken } = useContext(AuthContext);
	const [updatedInfo, setUpdatedInfo] = useState<UserInfo | null>(userInfo);

	const fetchProfile = async () => {
		try {
			const response = await axios.get("/api/1/users", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			if (response.data.status === "success") {
				setUpdatedInfo(response.data.data);
			}
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (updatedInfo) {
			setUpdatedInfo({ ...updatedInfo, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const response = await axios.put("/api/1/users/1", updatedInfo, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});

			if (response.data.status === "success") {
				setUser(updatedInfo);
				alert("Profile updated successfully!");
			}
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchProfile();
		}
	}, [isAuthenticated]);

	return (
		<div>
			<Title text="Profile" />
			<form onSubmit={handleSubmit}>
				<label>
					First Name:
					<input type="text" name="firstname" value={updatedInfo && updatedInfo.firstname ? updatedInfo.firstname : ""} onChange={handleChange} className="bg-secondary text-white" />
				</label>
				<label>
					Name:
					<input type="text" name="name" value={updatedInfo && updatedInfo.name ? updatedInfo.name : ""} onChange={handleChange} className="bg-secondary text-white" />
				</label>
				<label>
					Date of Birth:
					<input type="date" name="date_of_birth" value={updatedInfo && updatedInfo.date_of_birth ? updatedInfo.date_of_birth : ""} onChange={handleChange} className="bg-secondary text-white" />
				</label>
				<button type="submit">Update Profile</button>
			</form>
		</div>
	);
};

export default Profile;
