import React, { useState, useEffect } from "react";

import GoogleLogo from "../../assets/googleLogo.svg";
import DiscordLogo from "../../assets/discordLogo.svg";
import TwitterLogo from "../../assets/twitterLogo.svg";
import GithubLogo from "../../assets/githubLogo.svg";

import Title from "../Title";
import Modal from "../Modal";
import OAuthProviderButton from "./OAuthProviderButton";
import Input from "./Input";

interface LoginFormProps {
	isOpen: boolean;
	toggleModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, toggleModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Email:", email);
		console.log("Password:", password);
		toggleModal();
	};

	const handleBackClick = () => {
		toggleModal();
	};

	return (
		<>
			<Modal isOpen={isOpen}>
				<div className="fixed inset-0 z-50 flex items-center justify-center animate__animated animate__fadeIn animate__faster">
					<div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
						<button onClick={handleBackClick} className="absolute top-4 left-4 text-white hover:text-gray-100 focus:outline-none">
							&larr; Back
						</button>
						<Title text="Sign In." className="text-primary" />
						<h1 className="text-2xl font-bold mt-6 text-primary">Please sign in to your FoodFlow account to access the app</h1>
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
								<div className="flex items-center">
									<input type="checkbox" id="remember" name="remember" className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
									<label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
										Remember me
									</label>
								</div>
								<div className="text-sm">
									<a href="#" className="font-medium hover:text-indigo-500">
										Forgot your password?
									</a>
								</div>
							</div>
							<button type="submit" className="w-full p-4 border border-transparent text-base font-semibold text-white bg-primary rounded-2xl shadow-sm hover:bg-secondary ease-in-out duration-300">
								Sign in
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
