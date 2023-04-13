import React, { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

import { FaWallet, FaUserAlt, FaShoppingCart } from "react-icons/fa";

import MainFrame from "./components/pageHolder/MainFrame";
import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Login from "./components/Login";
import Wallet from "./views/Wallet";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";

import AuthProvider from "./hooks/AuthProvider";

function App() {
	const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

	const handleLoginModal = useCallback(() => {
		setIsLoginFormOpen(!isLoginFormOpen);
	}, [isLoginFormOpen]);

	const [navItems, setNavItems] = useState([
		{ icon: <FaWallet />, link: "/wallet" },
		{ icon: <FaShoppingCart />, notification: 2, link: "/cart" },
		{ icon: <FaUserAlt />, onClick: handleLoginModal },
	]);

	return (
		<AuthProvider>
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
				<Login isOpen={isLoginFormOpen} toggleModal={handleLoginModal} />
			</div>
		</AuthProvider>
	);
}

export default App;
