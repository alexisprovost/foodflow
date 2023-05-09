import React, { useState, useEffect } from "react";
import { ItemProps } from "../StoreItem";

import { CartItemProps } from "../../views/Cart";

const CartCheckoutItem: React.FC<CartItemProps> = ({ item, quantity }) => {
	const [product, setProduct] = useState<ItemProps>(item);

	return (
		<div className="flex bg-secondary items-center my-8 last:mb-0">
			<div
				className="h-12 w-12 md:h-12 md:w-8 bg-[auto_100%] bg-center bg-no-repeat rounded-md"
				style={{
					backgroundImage: `url(${product.url_image})`,
				}}
			/>
			<div className="ml-4 flex-grow">
				<h3 className="text-base font-semibold text-white">{product.name}</h3>
				<p className="text-base font-semibold ">${((product.price ? product.price : 0) * quantity).toFixed(2)}</p>
			</div>
		</div>
	);
};

export default CartCheckoutItem;
