import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Login");

	return (
		<div className="login-page">
			<h1>Login</h1>
		</div>
	);
};

export default Home;