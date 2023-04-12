import React, { useState, useEffect } from "react";

export interface ItemProps {
	id: number;
	name: string;
	quantity?: number;
	price?: number;
	added_date?: string;
	barcode?: string;
	categories?: string[];
	format?: string;
	url_image?: string;
}

const Item: React.FC<ItemProps> = ({ id, name, url_image, quantity, price }) => {
	return (
		<div key={id} className="bg-secondary p-4 rounded-[1rem] flex items-end flex-wrap justify-between">
			<div className="text-2xl font-bold pb-6">{name}</div>
			<div
				className="img h-48 w-full rounded-lg bg-[length:auto_100%] bg-no-repeat bg-center"
				style={{
					backgroundImage: `url(${url_image})`,
				}}
			/>
			<div className="w-full mt-4 text-right font-medium text-lg">${price}</div>
		</div>
	);
};

export default Item;
