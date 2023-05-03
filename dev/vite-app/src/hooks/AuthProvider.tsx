import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";
import LoginForm from "../components/Login";

interface AuthContextType {
	isAuthenticated: boolean;
	accessToken: string;
	userInfo: UserInfo | null;
	login: (email: string, password: string) => Promise<void>;
	register: (email: string, password: string) => Promise<void>;
	logout: () => void;
	toggleModal: () => void;
}

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	accessToken: "",
	userInfo: null,
	login: async () => {},
	register: async () => {},
	logout: () => {},
	toggleModal: () => {},
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
	role: string;
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		accessToken: "",
		userInfo: null,
	});
	const [tokenExpiresAt, setTokenExpiresAt] = useState(0);

	const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

	const toggleModal = () => {
		setIsLoginFormOpen(!isLoginFormOpen);
	};

	useEffect(() => {
		const refreshToken = localStorage.getItem("refreshToken");

		if (refreshToken) {
			refreshAccessToken();
		}
		scheduleRefresh();
	}, []);

	const scheduleRefresh = () => {
		const expiresIn = tokenExpiresAt - Date.now() - 60000;
		if (expiresIn > 0) {
			setTimeout(() => {
				refreshAccessToken();
			}, expiresIn);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/1/auth/login", { email, password });
			const { token, refreshToken, expires }: AuthResponse["data"] = response.data.data;
			setTokenExpiresAt(new Date(expires).getTime());
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			localStorage.setItem("refreshToken", refreshToken);
			//get user info
			getUserInfo(token);
			setAuthState({
				isAuthenticated: true,
				accessToken: token,
				userInfo: response.data.userInfo,
			});
		} catch (error) {
			console.error(error);
		}
	};

	const register = async (email: string, password: string) => {
		try {
			const response = await axios.post("/api/1/auth/register", { email, password });
			const { token, refreshToken, expires }: AuthResponse["data"] = response.data.data;
			setTokenExpiresAt(new Date(expires).getTime());
			axios.defaults.headers.common.Authorization = `Bearer ${token}`;
			localStorage.setItem("refreshToken", refreshToken);
			//get user info
			getUserInfo(token);
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

				getUserInfo(token);
				setTokenExpiresAt(new Date(response.data.expires).getTime());
				scheduleRefresh();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getUserInfo = async (accessToken: string) => {
		try {
			const response = await axios.get("/api/1/users", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			setAuthState((prevState) => ({
				...prevState,
				isAuthenticated: true,
				accessToken,
				userInfo: response.data.data,
			}));
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
				register,
				logout,
				toggleModal,
			}}
		>
			{children}
			<LoginForm isOpen={isLoginFormOpen} toggleModal={toggleModal} />
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
