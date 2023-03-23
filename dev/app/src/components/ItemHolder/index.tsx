import React, { useState, useEffect } from "react";

interface ItemProps {
	onSearch: (query: string) => void;
}

const ItemHolder = () => {
	return (
		<div className="bg-secondary p-4 rounded-[1rem]">
			<div className="text-2xl font-bold mb-4">Iced Tea</div>
			<div
				className="img h-48 w-full rounded-lg bg-cover bg-center"
				style={{
					backgroundImage: `url(https://cms-cdn.placeholder.co/toronto_be6ed650f3.png?width=384)`,
					backgroundSize: "cover",
				}}
			/>
			<div className="text-right mt-4">16 oz</div>
		</div>
	);
};

export default ItemHolder;
