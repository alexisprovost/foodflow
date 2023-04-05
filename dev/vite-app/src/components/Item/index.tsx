import React, { useState, useEffect } from "react";

interface ItemProps {
	name: string;
	image: string;
	quantity?: string;
	price?: string;
}

const Item: React.FC<ItemProps> = ({ name, image, quantity, price }) => {
	return (
		<div className="bg-secondary p-4 rounded-[1rem]">
			<div className="text-2xl font-bold mb-4">{name}</div>
			<div
				className="img h-48 w-full rounded-lg bg-[length:auto_100%] bg-no-repeat bg-center"
				style={{
					backgroundImage: `url(${image})`,
				}}
			/>
			<div className="text-right mt-4">{price}</div>
		</div>
	);
};

export default Item;
