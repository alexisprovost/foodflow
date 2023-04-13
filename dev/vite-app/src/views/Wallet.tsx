import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

import { AuthContext } from "../hooks/AuthProvider";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	useDocumentTitle("Wallet");

	if (isAuthenticated) {
		return (
			<div className="animate__animated animate__fadeIn animate__faster">
				<Title text="Wallet" />
				<p>Logged in</p>
			</div>
		);
	} else {
		return (
			<div className="animate__animated animate__fadeIn animate__faster">
				<Title text="Wallet" />
				<p>Not logged in</p>
			</div>
		);
	}
};

export default Wallet;
