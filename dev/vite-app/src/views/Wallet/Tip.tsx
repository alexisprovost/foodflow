import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import { AuthContext } from "../../hooks/AuthProvider";
import BackButton from "../../components/BackButton";

const Tip = () => {
	const { isAuthenticated } = useContext(AuthContext);
	useDocumentTitle("Tip");

	const walletTopUpContent = isAuthenticated ? (
		<div className="animate__animated animate__fadeIn animate__faster pt-8">
			<p>Soon!</p>
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
				<Title text="Tip" className="ml-4" />
			</div>
			{walletTopUpContent}
		</div>
	);
};

export default Tip;
