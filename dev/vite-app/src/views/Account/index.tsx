import { useContext } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";

import Gravatar from "../../hooks/Gravatar";

import { FaSignOutAlt } from "react-icons/fa";

import LinkMenu from "../../components/Account/LinkMenu";

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
		const { id, firstname: firstName, name, email, date_of_birth, role } = userInfo;

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
						<LinkMenu
							title="Account Settings"
							links={[
								{ title: "Edit my profile", link: "/account/profile" },
								{ title: "Change my password", link: "/account/password", disable: false },
							]}
						/>

						{role >= 90 && (
							<LinkMenu
								title="Admin Settings"
								links={[
									{ title: "Products", link: "/admin/products" },
									{ title: "Users", link: "/admin/users" },
									{ title: "Orders", link: "/admin/orders" },
									{ title: "Statistics", link: "/admin/statistics" },
								]}
								className="mt-6 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]"
							/>
						)}

						<LinkMenu links={[{ title: "Log out", onClick: logout, icon: <FaSignOutAlt /> }]} className="mt-6" />
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
