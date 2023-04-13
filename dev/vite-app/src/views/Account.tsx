import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

const Account = () => {
	useDocumentTitle("Account");
	const { isAuthenticated, accessToken, userInfo } = useContext(AuthContext);

	let content;

	if (isAuthenticated) {
		console.log(userInfo);
		content = (
			<div className="animate__animated animate__fadeIn animate__faster">
				<p>a</p>
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
