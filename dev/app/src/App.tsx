import { Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./views/Home";
import Login from "./views/Login";

function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>404</h1>} />
			</Routes>
		</div>
	);
}

export default App;
