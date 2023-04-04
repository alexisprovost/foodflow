import { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";
import axios from "axios";

interface Product {
	id: number;
	barcode: number;
	name: string;
	added_date: string;
	quantity: number;
	category: string | null;
	format: string;
	url_image: string;
}

const Home = () => {
	useDocumentTitle("Accueil");
	const [products, setProducts] = useState<Product[]>([]);

	const handleSearch = (query: string) => {
		if (query.length > 0) {
			console.log(`Search query: ${query}`);
		}
	};

	useEffect(() => {
		axios
			.get("/api/1/products")
			.then((response) => {
				setProducts(response.data.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<Title text="FoodFlow" />
			<SearchBar onSearch={handleSearch} />
			<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
				{Array.isArray(products) && products.map((product) => <Item key={product.id} name={product.name} image={product.url_image} quantity={product.quantity.toString()} />)}
			</div>
		</>
	);
};

export default Home;
