import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

interface AuthContextType {
	isAuthenticated: boolean;
	accessToken: string;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	accessToken: "",
	login: async () => {},
	logout: () => {},
});

interface AuthProps {
	children: React.ReactNode;
}

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string;
}

interface LoginData {
	email: string;
	password: string;
}

interface AuthResponse {
	accessToken: string;
	refreshToken: string;
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({ isAuthenticated: false, accessToken: "" });

	useEffect(() => {
		const accessToken = localStorage.getItem("refreshToken");
		if (accessToken) {
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			setAuthState({ isAuthenticated: true, accessToken });
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/1/auth/login", { email, password });
			const { accessToken }: AuthResponse = response.data;
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
			localStorage.setItem("refreshToken", accessToken);
			setAuthState({ isAuthenticated: true, accessToken });
		} catch (error) {
			console.error(error);
		}
	};

	const logout = () => {
		axios.defaults.headers.common.Authorization = "";
		localStorage.removeItem("refreshToken");
		setAuthState({ isAuthenticated: false, accessToken: "" });
	};

	return <AuthContext.Provider value={{ isAuthenticated: authState.isAuthenticated, accessToken: authState.accessToken, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return authContext;
};
