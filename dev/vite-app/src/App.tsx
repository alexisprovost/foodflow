import { useState, useCallback, useContext } from "react";
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

function App() {
	const initialProviders = { AuthProvider };

	const [navItems, setNavItems] = useState([
		{ icon: <FaStoreAlt />, link: "/" },
		{ icon: <FaWallet />, link: "/wallet" },
		{ icon: <FaShoppingCart />, notification: 1, link: "/cart" },
		{ icon: <FaUserAlt />, link: "/account" },
	]);

	return (
		<AppProvider providers={initialProviders}>
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
		</AppProvider>
	);
}

export default App;
