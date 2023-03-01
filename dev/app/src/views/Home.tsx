import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Accueil");

	return (
		<div className="home-page">
			<h1>Accueil</h1>
		</div>
	);
};

export default Home;