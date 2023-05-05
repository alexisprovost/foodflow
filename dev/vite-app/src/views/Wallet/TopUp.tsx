import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";
import BackButton from "../../components/BackButton";

const TopUp = () => {
	const { isAuthenticated } = useContext(AuthContext);
	useDocumentTitle("TopUp");

	const walletTopUpContent = isAuthenticated ? (
		<div className="animate__animated animate__fadeIn animate__faster pt-8">
			<p>To top up your wallet, please send the amount you want to top up to the following address using e-transfer: etransfer@email.com</p>
		</div>
	) : (
		<div className="mt-8">
			<p>Not logged in</p>
		</div>
	);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<div className="flex">
				<BackButton />
				<Title text="Top Up" className="ml-4" />
			</div>
			{walletTopUpContent}
		</div>
	);
};

export default TopUp;
