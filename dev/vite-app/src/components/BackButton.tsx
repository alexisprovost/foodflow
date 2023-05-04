import React from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";

const BackButton = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-start">
			<button className="bg-transparent text-primaryText hover:text-primaryText/50" onClick={() => navigate(-1)}>
				<FiChevronLeft className="w-8 h-8" />
			</button>
		</div>
	);
};

export default BackButton;
