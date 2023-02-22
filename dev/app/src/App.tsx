import { Routes, Route } from "react-router-dom";

import Nav from "./components/nav/Nav";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
	return (
		<div className="app h-screen w-screen">
			<Nav />
			<section className="ml-24 h-full">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="*" element={<h1>404</h1>} />
			</Routes>
			</section>
		</div>
	);
}

export default App;
