import { useMemo, useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { FaStoreAlt, FaWallet, FaUserAlt, FaShoppingCart, FaChessKnight } from "react-icons/fa";

import MainFrame from "./components/pageHolder/MainFrame";
import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Wallet from "./views/Wallet";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";

import AppProvider from "./hooks/AppProvider";
import AuthProvider from "./hooks/AuthProvider";
import Account from "./views/Account";
import CartProvider from "./hooks/CartProvider";

import { CartContext } from "./hooks/CartProvider";

function App() {
	const { getCartItems, getNbCartItems } = useContext(CartContext);
	const [nbCartItems, setNbCartItems] = useState(0);
	const [totalCartItems, setTotalCartItems] = useState(0);
	let cartItems = getCartItems();

	// Update the notification count
	useEffect(() => {
		const newTotalCartItems = getNbCartItems();
		setTotalCartItems(newTotalCartItems);
	}, [getNbCartItems]);

	let [navItems, setNavItems] = useState([
		{ icon: <FaStoreAlt />, link: "/" },
		{ icon: <FaWallet />, link: "/wallet" },
		{ icon: <FaShoppingCart />, notification: totalCartItems, link: "/cart" },
		{ icon: <FaUserAlt />, link: "/account" },
	]);

	return (
		<div className="bg-primary text-primaryText h-screen w-screen">
			<div className="h-full w-24 fixed left-0 animate__animated animate__fadeInLeft">
				<Nav navItems={navItems} />
			</div>
			<MainFrame>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/wallet" element={<Wallet />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/account" element={<Account />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</MainFrame>
		</div>
	);
}

export default App;
