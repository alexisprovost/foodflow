import { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { FaStoreAlt, FaWallet, FaUserAlt, FaShoppingCart } from "react-icons/fa";

import MainFrame from "./components/MainFrame";
import Nav from "./components/Nav";
import Home from "./views/Home";

import Wallet from "./views/Wallet";
import TopUp from "./views/Wallet/TopUp";
import Tip from "./views/Wallet/Tip";
import Withdraw from "./views/Wallet/Withdraw";

import Cart from "./views/Cart";
import Success from "./views/Cart/Success";
import NotFound from "./views/NotFound";

import Account from "./views/Account";

import { CartContext } from "./hooks/CartProvider";
import Checkout from "./views/Cart/Checkout";
import Statistics from "./views/Admin/Statistics";
import Users from "./views/Admin/Users";
import Orders from "./views/Admin/Orders";

function App() {
	const { getCartItems } = useContext(CartContext);
	const [nbCartItems, setNbCartItems] = useState(0);
	let cartItems = getCartItems();

	useEffect(() => {
		const itemIds = Object.values(cartItems) as unknown as number[];
		setNbCartItems(itemIds.reduce((acc, curr) => acc + curr, 0));
	}, [cartItems]);

	useEffect(() => {
		setNavItems((prev) => {
			return prev.map((item) => {
				if (item.link === "/cart") {
					return { ...item, notification: nbCartItems };
				}
				return item;
			});
		});
	}, [nbCartItems]);

	let [navItems, setNavItems] = useState([
		{ icon: <FaStoreAlt />, link: "/" },
		{ icon: <FaWallet />, link: "/wallet" },
		{ icon: <FaShoppingCart />, notification: nbCartItems, link: "/cart" },
		{ icon: <FaUserAlt />, link: "/account" },
	]);

	return (
		<div className="bg-primary text-primaryText h-screen w-screen">
			<div className="md:h-full w-full h-24 md:w-24 bottom-0 z-[100] fixed left-0 animate__animated animate__fadeIn animate__faster">
				<Nav navItems={navItems} />
			</div>
			<MainFrame>
				<Routes>
					<Route path="/" element={<Home />} />

					<Route path="/wallet" element={<Wallet />} />
					<Route path="/wallet/top-up" element={<TopUp />} />
					<Route path="/wallet/withdraw" element={<Withdraw />} />
					<Route path="/wallet/tip" element={<Tip />} />

					<Route path="/cart" element={<Cart />} />
					<Route path="/cart/checkout" element={<Checkout />} />
					<Route path="/cart/checkout/success" element={<Success />} />
					<Route path="/account" element={<Account />} />

					<Route path="/admin/users" element={<Users />} />
					<Route path="/admin/orders" element={<Orders />} />
					<Route path="/admin/statistics" element={<Statistics />} />

					<Route path="*" element={<NotFound />} />
				</Routes>
			</MainFrame>
		</div>
	);
}

export default App;
