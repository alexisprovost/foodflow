import { Link } from "react-router-dom";

import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = () => {
	useDocumentTitle("404");

	return (
		<div className="flex flex-col justify-center items-center h-[inherit]">
			<h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
			<p className="text-lg mb-8">The page you are looking for does not exist.</p>
			<Link to="/" className="text-blue-500 hover:underline">
				Go back to the homepage
			</Link>
		</div>
	);
};

export default NotFound;
