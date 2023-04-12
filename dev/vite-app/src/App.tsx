import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { FaWallet, FaUserAlt, FaShoppingCart } from "react-icons/fa";

import MainFrame from "./components/pageHolder/MainFrame";
import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Login from "./views/Login";
import Wallet from "./views/Wallet";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";

function App() {
	const [showLoginModal, setShowLoginModal] = useState(true);

	const toggleModal = () => {
		setShowLoginModal(!showLoginModal);
	};

	const [navItems, setNavItems] = useState([
		{ icon: <FaWallet />, link: "/wallet" },
		{ icon: <FaShoppingCart />, notification: 2, link: "/cart" },
		{ icon: <FaUserAlt />, link: "/login" },
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
					<Route path="*" element={<NotFound />} />
				</Routes>
			</MainFrame>
			<Login isOpen={showLoginModal} toggleModal={toggleModal} />
		</div>
	);
}

export default App;
