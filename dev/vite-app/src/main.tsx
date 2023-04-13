import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./stylesheets/index.scss";
import "animate.css";

import AppProvider from "./hooks/AppProvider";
import AuthProvider from "./hooks/AuthProvider";
import CartProvider from "./hooks/CartProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<BrowserRouter>
			<AppProvider providers={{ AuthProvider, CartProvider }}>
				<App />
			</AppProvider>
		</BrowserRouter>
	</React.StrictMode>
);
