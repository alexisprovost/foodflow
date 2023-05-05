import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

import Gravatar from "../hooks/Gravatar";

import { FaSignOutAlt } from "react-icons/fa";

const Account = () => {
	useDocumentTitle("Account");
	const { isAuthenticated, userInfo, toggleModal, logout } = useContext(AuthContext);

	let content = (
		<div className="animate__animated animate__fadeIn animate__faster flex flex-col justify-center items-center h-[inherit] p-10">
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
					<div className="flex flex-col items-center">
						<div className="bg-secondary p-8 shadow-md rounded-3xl w-full">
							<Gravatar email={email} size={100} defaultImage="mp" className="rounded-full m-auto" />
							<div className="flex flex-col items-center">
								{firstName && name ? (
									<>
										<p className="text-xl font-semibold mt-4">{name + " " + firstName}</p>
										<p className="text-xl font-semibold mt-4">{email}</p>
									</>
								) : (
									<p className="text-xl font-semibold mt-4">{email}</p>
								)}
							</div>
						</div>
					</div>
					<div className="h-full md:h-auto">
						<div className="rounded-3xl shadow-md cursor-pointer bg-secondary flex flex-col items-center">
							<h2 className="text-xl w-full py-4 px-6 font-semibold">User Settings</h2>
							<ul className="w-full">
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 w-full">Edit my profile</li>
								<li className="text-lg font-normal py-4 shadow-inner px-6 rounded-b-3xl hover:bg-black/25 w-full">Change my password</li>
							</ul>
						</div>
						<div className="rounded-3xl cursor-pointer bg-secondary flex flex-col items-center mt-6 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]">
							<h2 className="text-xl w-full py-4 px-6 font-semibold">Admin Settings</h2>
							<ul className="w-full">
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 w-full">Products</li>
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 w-full">Users</li>
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 w-full">Orders</li>
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 rounded-b-3xl w-full">Statistics</li>
							</ul>
						</div>
						<div className="rounded-3xl shadow-md cursor-pointer bg-secondary flex flex-col items-center mt-6 ">
							<ul className="w-full">
								<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 rounded-3xl w-full" onClick={logout} style={{ display: "flex", alignItems: "center" }}>
									<FaSignOutAlt className="inline-block mr-4 text-xl" />
									Log out
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Account" />
			{content}
		</div>
	);
};

export default Account;
