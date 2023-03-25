import useDocumentTitle from "../hooks/useDocumentTitle";

const NotFound = () => {
	useDocumentTitle("404");

	return <h1>404</h1>;
};

export default NotFound;
