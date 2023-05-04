import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

import Gravatar from "../hooks/Gravatar";

const Account = () => {
	useDocumentTitle("Account");
	const { isAuthenticated, userInfo, toggleModal, logout } = useContext(AuthContext);

	let content = (
		<div className="animate__animated animate__fadeIn animate__faster flex flex-col justify-center items-center h-[inherit]">
			<p className="text-xl font-semibold">Not logged in</p>
			<button className="bg-blue-500 text-white py-2 px-4 rounded mt-4" onClick={toggleModal}>
				Sign in
			</button>
		</div>
	);

	if (isAuthenticated && userInfo) {
		const { id, firstName, name, email, date_of_birth, role } = userInfo;
		content = (
			<div className="mt-8">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
					<div className="bg-secondary p-8 shadow-md rounded-3xl">
						<div className="flex flex-col items-center">
							<Gravatar email={email} size={100} defaultImage="mp" className="rounded-full" />
							<p className="text-xl font-semibold mt-4">{firstName && name ? firstName + " " + name : email}</p>
							<button className="bg-blue-500 rounded-xl w-full text-white py-2 px-4 mt-4 hover:bg-blue-500/80" onClick={logout}>
								Log out
							</button>
						</div>
					</div>
					<div className="h-3">
						<div className="rounded-3xl shadow-md cursor-pointer bg-secondary flex flex-col items-center">
							<h2 className="text-xl w-full py-4 px-6 font-semibold">User Settings</h2>
							<ul className="w-full">
								<li className="text-lg font-normal py-4 px-6 hover:bg-black/25 w-full">Orders</li>
								<li className="text-lg font-normal py-4 px-6 rounded-b-3xl hover:bg-black/25 w-full">Wishlist</li>
							</ul>
						</div>
					</div>
				</div>
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
