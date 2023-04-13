import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

interface AuthContextType {
	isAuthenticated: boolean;
	accessToken: string;
	userInfo: UserInfo | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	accessToken: "",
	userInfo: null,
	login: async () => {},
	logout: () => {},
});

interface AuthProps {
	children: React.ReactNode;
}

interface AuthState {
	isAuthenticated: boolean;
	accessToken: string;
	userInfo: UserInfo | null;
}

interface LoginData {
	email: string;
	password: string;
}

interface AuthResponse {
	status: string;
	data: {
		token: string;
		refreshToken: string;
		expires: string;
	};
}

interface UserInfo {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		accessToken: "",
		userInfo: null,
	});

	useEffect(() => {
		const refreshToken = localStorage.getItem("refreshToken");

		if (refreshToken) {
			refreshAccessToken();
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/1/auth/login", { email, password });
			const { token, refreshToken }: AuthResponse["data"] = response.data.data;
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			localStorage.setItem("refreshToken", refreshToken);
			setAuthState({
				isAuthenticated: true,
				accessToken: token,
				userInfo: response.data.userInfo,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const logout = () => {
		axios.defaults.headers.common.Authorization = "";
		localStorage.removeItem("refreshToken");
		setAuthState({
			isAuthenticated: false,
			accessToken: "",
			userInfo: null,
		});
	};

	const refreshAccessToken = async () => {
		try {
			const refreshToken = localStorage.getItem("refreshToken");

			if (refreshToken) {
				const response = await axios.post("/api/1/auth/refresh", { refreshToken: refreshToken });
				const { token }: AuthResponse["data"] = response.data.data;
				axios.defaults.headers.common.Authorization = `Bearer ${token}`;
				setAuthState({
					isAuthenticated: true,
					accessToken: token,
					userInfo: authState.userInfo,
				});
				getUserInfo();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getUserInfo = async () => {
		try {
			const response = await axios.get("/api/1/users");
			setAuthState({ isAuthenticated: true, accessToken: authState.accessToken, userInfo: response.data });
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: authState.isAuthenticated,
				accessToken: authState.accessToken,
				userInfo: authState.userInfo,
				login,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;

export const useAuth = () => {
	const authContext = useContext(AuthContext);
	if (!authContext) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return authContext;
};
