import React, { useState } from "react";
import Title from "../components/Title";

const LoginForm: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(`Email: ${email}, Password: ${password}`);
	};

	return (
		<>
			<Title text="Login" />
			<div className="flex items-center">
				<div className="w-full max-w-md">
					<form onSubmit={handleSubmit} className="p-8">
						<div className="mb-4">
							<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-600">
								Email
							</label>
							<input
								type="email"
								id="email"
								className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className="mb-6">
							<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-600">
								Password
							</label>
							<input
								type="password"
								id="password"
								className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-black"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<button
							type="submit"
							className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default LoginForm;
