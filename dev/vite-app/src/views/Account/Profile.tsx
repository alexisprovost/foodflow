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
				if (updatedInfo) {
					setUser(updatedInfo);
					alert("Profile updated successfully!");
				}
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
		<div className="mx-auto">
			<Title text="Profile" />
			<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 pt-8">
				<label className="block">
					<span className="text-white">First Name:</span>
					<input type="text" name="firstname" value={updatedInfo?.firstname || ""} onChange={handleChange} className="mt-1 block w-full rounded-md bg-secondary p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
				</label>
				<label className="block">
					<span className="text-white">Name:</span>
					<input type="text" name="name" value={updatedInfo?.name || ""} onChange={handleChange} className="mt-1 block w-full rounded-md bg-secondary p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
				</label>
				<label className="block">
					<span className="text-white">Date of Birth:</span>
					<input type="date" name="date_of_birth" value={updatedInfo?.date_of_birth || ""} onChange={handleChange} className="mt-1 block w-full rounded-md bg-secondary p-2 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" />
				</label>
				<button type="submit" className="py-2 px-4 mt-6 block w-full bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
					Update Profile
				</button>
			</form>
		</div>
	);
};

export default Profile;
