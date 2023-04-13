import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

const Account = () => {
	useDocumentTitle("Account");
	const { isAuthenticated, userInfo } = useContext(AuthContext);

	let content;
	let userInfos: any = {};

	if (isAuthenticated) {
		if (userInfo && userInfo !== undefined) {
			userInfos = userInfo;
		}
		content = (
			<div className="animate__animated animate__fadeIn animate__faster">
				{userInfo ? (
					<div>
						<p>Logged in</p>
						<p>{userInfos.username}</p>
						<p>{userInfos.email}</p>
						<p className="text-sm text-gray-500">{userInfo.id}</p>
					</div>
				) : (
					<p>Logged in</p>
				)}
			</div>
		);
	} else {
		content = (
			<div className="animate__animated animate__fadeIn animate__faster">
				<p>Not logged in</p>
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
