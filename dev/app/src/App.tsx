import { Routes, Route } from "react-router-dom";

import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Login from "./views/Login";
import Wallet from "./views/Wallet";
import Cart from "./views/Cart";
import NotFound from "./views/NotFound";

function App() {
	return (
		<div className="app h-screen w-screen">
			<div className="h-full w-24 fixed left-0 animate__animated animate__fadeInLeft">
				<Nav />
			</div>
			<section className="ml-24 h-full">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/wallet" element={<Wallet />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="*" element={<NotFound/>} />
				</Routes>
			</section>
		</div>
	);
}

export default App;
