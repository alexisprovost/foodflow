import Holder from "../components/pageHolder/Holder";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Home = () => {
	useDocumentTitle("Accueil");

	return (
		<div className="home-page h-full">
			<section className="p-14 h-full">
				<Holder />
			</section>
		</div>
	);
};

export default Home;