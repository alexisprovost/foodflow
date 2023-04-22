import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

import GoogleLogo from "../../assets/googleLogo.svg";
import DiscordLogo from "../../assets/discordLogo.svg";
import TwitterLogo from "../../assets/twitterLogo.svg";
import GithubLogo from "../../assets/githubLogo.svg";

import Title from "../Title";
import Modal from "../Modal";
import OAuthProviderButton from "./OAuthProviderButton";
import { useAuth } from "../../hooks/AuthProvider";

interface LoginFormProps {
	isOpen: boolean;
	toggleModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, toggleModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegister, setIsRegister] = useState(false);
	const { login, register } = useAuth();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isRegister) {
			register(email, password);
		} else {
			login(email, password);
		}
		toggleModal();
	};

	const toggleType = () => {
		setIsRegister(!isRegister);
	};

	const handleBackClick = () => {
		toggleModal();
	};

	return (
		<>
			<Modal isOpen={isOpen}>
				<div className="fixed inset-0 z-50 md:z-[110] flex md:items-center justify-center">
					<div className="bg-white overflow-auto pb-24 md:pb-8 no-scrollbar w-full max-w-md p-8 rounded-2xl shadow-md">
						<div className="relative">
							<button className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700" onClick={handleBackClick}>
								<MdClose size={24} />
							</button>
							{isRegister ? <Title text="Sign Up." className="text-primary" /> : <Title text="Sign In." className="text-primary" />}
						</div>
						<h1 className="text-2xl font-bold mt-6 text-primary">Please {isRegister ? "sign up" : "sign in"} to access the app</h1>
						<form onSubmit={handleSubmit} className="mt-4 text-primary">
							<div className="mb-4">
								<label htmlFor="email" className="text-base font-semibold block mb-2">
									Email Address
								</label>
								<input type="email" id="email" name="email" className="w-full text-lg px-5 py-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" value={email} onChange={handleEmailChange} />
							</div>
							<div className="mb-6">
								<label htmlFor="password" className="text-base font-semibold block mb-2">
									Password
								</label>
								<input type="password" id="password" name="password" className="w-full text-lg px-5 py-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" value={password} onChange={handlePasswordChange} />
							</div>
							<div className="flex justify-between items-center m-6">
								<div className="text-sm">
									{isRegister ? (
										<div onClick={toggleType} className="cursor-pointer font-medium hover:text-indigo-500 focus:outline-none">
											Already have an account?
										</div>
									) : (
										<div onClick={toggleType} className="cursor-pointer font-medium hover:text-indigo-500 focus:outline-none">
											Don't have an account?
										</div>
									)}
								</div>
								<div className="text-sm">
									<a href="#" className="font-medium hover:text-indigo-500">
										Forgot your password?
									</a>
								</div>
							</div>
							<button type="submit" className="w-full p-4 border border-transparent text-base font-semibold text-white bg-primary rounded-2xl shadow-sm hover:bg-secondary ease-in-out duration-300">
								{isRegister ? "Sign up" : "Sign in"}
							</button>
						</form>
						<hr className="m-6" />
						<div className="flex justify-center items-center mt-6">
							<div className="grid grid-rows-2 grid-flow-col gap-2">
								<OAuthProviderButton text="Login with Google" Icon={GoogleLogo} color="#4285F4" />
								<OAuthProviderButton text="Login with Discord" Icon={DiscordLogo} color="#7289DA" />
								<OAuthProviderButton text="Login with Twitter" Icon={TwitterLogo} color="#1DA1F2" />
								<OAuthProviderButton text="Login with Github" Icon={GithubLogo} color="#24292E" />
							</div>
						</div>
					</div>
				</div>
				<div className="fixed inset-0 bg-black opacity-75"></div>
			</Modal>
		</>
	);
};

export default LoginForm;
