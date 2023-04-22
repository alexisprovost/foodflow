import React, { useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import { AuthContext } from "../hooks/AuthProvider";

const Wallet = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	useDocumentTitle("Wallet");

	const walletContent = isAuthenticated ? (
		<div className="my-8">
			<p>Logged in</p>
		</div>
	) : (
		<div className="my-8">
			<p>Not logged in</p>
		</div>
	);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Wallet" />
			{walletContent}
		</div>
	);
};

export default Wallet;
