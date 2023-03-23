import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";

const Home = () => {
	useDocumentTitle("Accueil");

	const handleSearch = (query: string) => {
		console.log(`Search query: ${query}`);
	};

	return (
		<div className="home-page h-full">
			<section className="p-14 h-full">
				<Title text="FoodFlow" />
				<SearchBar onSearch={handleSearch} />
			</section>
		</div>
	);
};

export default Home;
