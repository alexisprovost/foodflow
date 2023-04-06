import { useState, useEffect } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import Item from "../components/Item";
import axios from "axios";
import { GiDeadlyStrike } from "react-icons/gi";

import { Oval } from "react-loading-icons";

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
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const getProduct = (apiUrl: string) => {
		setError(false);
		setLoading(true);

		axios
			.get(apiUrl, {
				params: {
					searchQuery: searchQuery,
				},
			})
			.then((response) => {
				setProducts(response.data.data);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(true);
				setLoading(false);
			});
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	useEffect(() => {
		getProduct("/api/1/products");
	}, [searchQuery]);

	return (
		<>
			<Title text="FoodFlow" />
			<SearchBar onSearch={handleSearch} />

			{loading ? (
				<div className="loading" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem 0" }}>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<Oval strokeWidth="4" stroke="#fff" />
						<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>Loading</p>
					</div>
				</div>
			) : error ? (
				<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<GiDeadlyStrike size="3rem" color="#fff" />
						<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>
							An error occured while loading the products.
							<br />
							Please try again later.
						</p>
					</div>
				</div>
			) : products.length === 0 ? (
				<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
					<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
						<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>No products found</p>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{Array.isArray(products) && products.map((product) => <Item key={product.id} name={product.name} image={product.url_image} quantity={product.quantity.toString()} />)}
				</div>
			)}
		</>
	);
};

export default Home;
