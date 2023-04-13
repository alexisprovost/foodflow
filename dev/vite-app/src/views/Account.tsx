import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

const Account = () => {
	useDocumentTitle("Account");
	const { isAuthenticated, userInfo, toggleModal, logout } = useContext(AuthContext);

	let content = (
		<div className="animate__animated animate__fadeIn animate__faster flex flex-col justify-center items-center h-[inherit]">
			<p className="text-xl font-semibold">Not logged in</p>
			<button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={toggleModal}>
				Log in
			</button>
		</div>
	);
	if (isAuthenticated && userInfo) {
		const { email, id } = userInfo;
		content = (
			<div className="animate__animated animate__fadeIn animate__faster flex flex-col justify-center items-center h-[inherit]">
				<p className="text-xl font-semibold">Logged in</p>
				<p className="my-2">{email}</p>
				<p className="text-sm text-gray-500 my-2">{id}</p>
				<button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={logout}>
					Log out
				</button>
			</div>
		);
	}

	return (
		<div className="animate__animated animate__fadeIn animate__faster h-full">
			<Title text="Account" />
			{content}
		</div>
	);
};

export default Account;
