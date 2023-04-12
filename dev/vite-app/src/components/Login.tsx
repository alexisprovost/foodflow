import React, { useState } from "react";

import Title from "./Title";
import Modal from "./Modal";

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
							<Title text="Sign In." />
							<h1 className="text-2xl font-bold mt-6">Please sign in to your FoodFlow account to access the app</h1>
							<form onSubmit={handleSubmit} className="mt-4">
								<div className="mb-4">
									<label htmlFor="email" className="text-base font-semibold block mb-2">
										Email Address
									</label>
									<input type="email" id="email" name="email" className="w-full text-lg px-5 py-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" />
								</div>
								<div className="mb-6">
									<label htmlFor="password" className="text-base font-semibold block mb-2">
										Password
									</label>
									<input type="password" id="password" name="password" className="w-full text-lg px-5 py-3 font-bold bg-primary text-gray-200 border border-gray-700 rounded-2xl focus:border-indigo-500 focus:ring-indigo-500 focus:outline-none" />
								</div>
								<div className="flex justify-between items-center m-6">
									<div className="flex items-center">
										<input type="checkbox" id="remember" name="remember" className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
										<label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
											Remember me
										</label>
									</div>
									<div className="text-sm">
										<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
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
									<button type="button" className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2 ease-in-out duration-300">
										{/* These are based on this src: https://tailwindflex.com/laurits/sign-up-with-google-button */}
										<svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
											<path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
										</svg>
										Login with Google<div></div>
									</button>
									<button type="button" className="text-white w-full  bg-[#7289DA] hover:bg-[#7289DA]/90 focus:ring-4 focus:outline-none focus:ring-[#7289DA]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#7289DA]/55 mr-2 mb-2 ease-in-out duration-300">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="discord" className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="discord" role="img">
											<path fill="currentColor" d="M85.778,24.561c-11.641-8.71-22.793-8.466-22.793-8.466s-1.14,1.302-1.14,1.302c13.839,4.152,20.27,10.257,20.27,10.257c-19.799-10.901-45.019-10.823-65.613,0c0,0,6.675-6.431,21.328-10.583c0,0-0.814-0.977-0.814-0.977s-11.071-0.244-22.793,8.466c0,0-11.722,21.084-11.722,47.052c0,0,6.838,11.722,24.829,12.292c0,0,3.012-3.582,5.454-6.675c-10.339-3.093-14.246-9.524-14.246-9.524c6.495,4.064,13.063,6.608,21.247,8.222c13.316,2.741,29.879-0.077,42.249-8.222c0,0-4.07,6.594-14.734,9.606c2.442,3.012,5.373,6.512,5.373,6.512C90.662,83.254,97.5,71.532,97.5,71.613C97.5,45.645,85.778,24.561,85.778,24.561z M34.818,64.043c-4.559,0-8.303-3.989-8.303-8.955c0.333-11.892,16.357-11.855,16.607,0C43.121,60.054,39.458,64.043,34.818,64.043z M64.531,64.043c-4.559,0-8.303-3.989-8.303-8.955c0.366-11.869,16.19-11.874,16.607,0C72.834,60.054,69.171,64.043,64.531,64.043z"></path>
										</svg>
										Login with Discord<div></div>
									</button>
									<button type="button" className="text-white w-full  bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 focus:ring-4 focus:outline-none focus:ring-[#1DA1F2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#1DA1F2]/55 mr-2 mb-2 ease-in-out duration-300">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="twitter" className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" role="img">
											<path fill="currentColor" d="M100,20.4c-3.6,1.6-7.5,2.7-11.5,3.2c4.2-2.5,7.4-6.4,8.9-11.1c-3.9,2.3-8.3,4-13,4.9c-3.7-3.9-9-6.4-14.8-6.4c-11.3,0-20.4,9.2-20.4,20.4c0,1.6,0.2,3.1,0.5,4.6c-16.9-0.8-31.7-8.9-41.5-21.2c-1.7,2.9-2.7,6.3-2.7,10c0,6.9,3.5,13,8.9,16.7c-3.3-0.1-6.3-1-9-2.5c0,0.1,0,0.1,0,0.2c0,9.6,6.8,17.6,15.9,19.4c-1.7,0.5-3.4,0.7-5.2,0.7c-1.3,0-2.6-0.1-3.8-0.4c2.5,7.8,10,13.4,18.6,13.5c-6.7,5.3-15.2,8.4-24.4,8.4c-1.6,0-3.1,0-4.7-0.1c8.7,5.5,19.1,8.7,30.2,8.7c36.1,0,55.8-30,55.8-55.8c0-0.8,0-1.6,0-2.4C92.8,28,96.3,24.1,100,20.4z"></path>
										</svg>
										Login with Twitter<div></div>
									</button>
									<button type="button" className="text-white w-full  bg-[#24292E] hover:bg-[#24292E]/90 focus:ring-4 focus:outline-none focus:ring-[#24292E]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#24292E]/55 mr-2 mb-2 ease-in-out duration-300">
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" id="github" className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img">
											<path fill="currentColor" d="M50,0C22.4,0,0,22.4,0,50c0,22.1,14.3,40.7,33.9,47.2c2.5,0.5,3.4-1.1,3.4-2.4c0-1.2,0-4.4,0-8.3c-13.8,3-16.8-6.6-16.8-6.6c-2.3-5.9-5.6-7.5-5.6-7.5c-4.6-3.2,0.4-3.1,0.4-3.1c5.1,0.4,7.8,5.3,7.8,5.3c4.5,7.8,11.8,5.5,14.6,4.2c0.5-3.2,1.8-5.5,3.2-6.9c-11.1-1.3-22.7-5.5-22.7-24.4c0-5.5,1.9-10,5.1-13.5c-0.5-1.3-2.2-6.6,0.5-13.3c0,0,4.2-1.4,13.8,5.1c4-1.1,8.2-1.7,12.4-1.7c4.2,0,8.4,0.6,12.4,1.7c9.6-6.5,13.8-5.1,13.8-5.1c2.7,6.7,1,12,0.5,13.3c3.2,3.5,5.1,8,5.1,13.5c0,18.9-11.6,23-22.7,24.3c1.9,1.6,3.5,4.8,3.5,9.7c0,7,0,12.7,0,14.4c 0,1.4,0.9,3,3.4,2.4C85.7,90.7,100,72.1,100,50C100,22.4,77.6,0,50,0z"></path>
										</svg>
										Login with Github<div></div>
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="fixed inset-0 bg-black opacity-75"></div>
				</Modal>
			)}
		</>
	);
};

export default LoginForm;
