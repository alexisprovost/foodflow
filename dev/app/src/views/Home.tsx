import Holder from "../components/pageHolder/Holder";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Accueil");

	return (
		<div className="home-page">
			<Holder />
		</div>
	);
};

export default Home;