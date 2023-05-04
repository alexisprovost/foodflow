import React, { ReactNode } from "react";
import { FaQuestionCircle } from "react-icons/fa";

interface TransactionProps {
	icon?: ReactNode;
	itemList?: string[];
	date?: Date;
}

const Transaction = ({ icon = <FaQuestionCircle />, itemList = ["Custom"], date = new Date("1999-01-01") }: TransactionProps) => {
	const iconWithSize = React.cloneElement(icon as React.ReactElement, { size: 30, className: "flex-shrink-0" });

	const formatDate = (date: Date) => {
		//const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
		const localDate = new Date(date);
		const hours24 = localDate.getHours();
		const hours12 = hours24 % 12 || 12;
		const minutes = localDate.getMinutes();
		const amPm = hours24 < 12 ? "AM" : "PM";
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const month = monthNames[localDate.getMonth()];
		const day = localDate.getDate();
		const year = localDate.getFullYear();

		return `${hours12}:${minutes.toString().padStart(2, "0")}${amPm} ${month} ${day}, ${year}`;
	};

	console.log(itemList);

	return (
		<div className="animate__animated animate__fadeIn animate__faster flex items-center py-4">
			<div className="flex items-center mr-4">{iconWithSize}</div>
			<div className="flex flex-col flex-1 min-w-0">
				<p className="text-primaryText text-lg font-bold truncate">Bought {itemList.join(", ")}</p>
				<p className="text-primaryText text-base font-medium truncate">{formatDate(date)}</p>
			</div>
			<hr />
		</div>
	);
};

export default Transaction;
