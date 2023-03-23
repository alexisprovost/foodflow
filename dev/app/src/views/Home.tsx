import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";

const Home = () => {
	useDocumentTitle("Accueil");

	const handleSearch = (query: string) => {
		console.log(`Search query: ${query}`);
	};

	return (
		<div className="home-page h-full">
			<section className="p-14 h-full overflow-auto">
				<Title text="FoodFlow" />
				<SearchBar onSearch={handleSearch} />
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{Array(10)
						.fill(1)
						.map((el, i) => (
							<Item
								name="Nestea"
								image="https://cms-cdn.placeholder.co/Home_page1_76f0b1d7ab.png?width=1080"
								quantity="1L"
							/>
						))}
				</div>
			</section>
		</div>
	);
};

export default Home;
