import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

import { AuthContext } from "../hooks/AuthProvider";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	useDocumentTitle("Wallet");

	if (!isAuthenticated) {
		return (
			<div className="animate__animated animate__fadeIn animate__faster">
				<div className="my-8">
					<p>Not logged in</p>
				</div>
			</div>
		);
	}

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Wallet" />
			<div className="my-8">
				<p>Logged in</p>
			</div>
		</div>
	);
};

export default Wallet;
