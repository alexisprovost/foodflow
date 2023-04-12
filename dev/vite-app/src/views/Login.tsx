import React, { useState } from "react";
import Title from "../components/Title";
import Modal from "../components/Modal";

interface LoginFormProps {
	isOpen: boolean;
	toggleModal: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ isOpen, toggleModal }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log(`Email: ${email} Password: ${password}`);
		toggleModal();
	};

	const handleBackClick = () => {
		toggleModal();
	};

	return (
		<>
			{isOpen && (
				<Modal>
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md">
							<button onClick={handleBackClick} className="absolute top-4 left-4 text-white hover:text-gray-100 focus:outline-none">
								&larr; Back
							</button>
							<Title text="Login" />
							<h1 className="text-2xl font-bold mt-6">Sign in to your account</h1>
							<form onSubmit={handleSubmit} className="mt-4">
								<div className="mb-4">
									<label htmlFor="email" className="text-base font-semibold block mb-2">
										Email Address
									</label>
									<input type="email" id="email" name="email" className="w-full text-lg p-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" />
								</div>
								<div className="mb-6">
									<label htmlFor="password" className="text-base font-semibold block mb-2">
										Password
									</label>
									<input type="password" id="password" name="password" className="w-full text-lg p-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" />
								</div>
								<button type="submit" className="w-full p-4 border border-transparent text-base font-semibold text-white bg-gradient-to-r from-secondary to-primary hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-2xl">
									Sign in
								</button>
							</form>
						</div>
					</div>
					<div className="fixed inset-0 bg-black opacity-75"></div>
				</Modal>
			)}
		</>
	);
};

export default LoginForm;
