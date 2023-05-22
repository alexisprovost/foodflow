import { useState, useEffect, useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import StoreItem from "../components/StoreItem";
import axios from "axios";
import { GiDeadlyStrike } from "react-icons/gi";

import { Oval } from "react-loading-icons";

import { ItemProps } from "../components/StoreItem";
import { AuthContext } from "../hooks/AuthProvider";

const Home = () => {
	useDocumentTitle("Accueil");

	const { isAuthenticated } = useContext(AuthContext);

	const [products, setProducts] = useState<ItemProps[]>([]);
	const [suggestions, setSuggestions] = useState<ItemProps[]>([]);

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
				const formattedProducts: ItemProps[] = response.data.data.map((product: any) => ({
					id: product.id,
					name: product.name,
					url_image: product.url_image,
					barcode: product.barcode,
					quantity: product.quantity,
					price: product.price,
					added_date: product.added_date,
					categories: product.categories,
					format: product.format,
				}));
				setProducts(formattedProducts);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setError(true);
				setLoading(false);
			});
	};

	const getSuggestions = (apiUrl: string) => {
		setError(false);
		setLoading(true);

		axios
			.get(apiUrl)
			.then((response) => {
				const formattedProducts: ItemProps[] = response.data.data.map((product: any) => ({
					id: product.id,
					name: product.name,
					url_image: product.url_image,
					barcode: product.barcode,
					quantity: product.quantity,
					price: product.price,
					added_date: product.added_date,
					categories: product.categories,
					format: product.format,
				}));
				setSuggestions(formattedProducts);
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

	useEffect(() => {
		if (isAuthenticated) {
			getSuggestions("/api/1/suggestions");
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="FoodFlow" />
			<SearchBar onSearch={handleSearch} />

			{!isAuthenticated ? (
				<></>
			) : suggestions.length === 0 ? (
				<>
					<Title text="Suggestions" customSize="text-3xl" className="pb-8" />
					<div className="loading" style={{ display: "flex", justifyContent: "center", padding: "0 0 4rem 0" }}>
						<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
							<p style={{ color: "#fff", marginTop: "1rem", padding: "1rem 0 0 0", textAlign: "center" }}>No suggestions found</p>
						</div>
					</div>
				</>
			) : (
				<>
					<Title text="Suggestions" customSize="text-3xl" className="pb-8" />
					<div className="flex no-scrollbar overflow-scroll overflow-scrolling-touch mb-8 animate__animated animate__fadeIn animate__faster">
						{Array.isArray(suggestions) &&
							suggestions.map((product) => (
								<div key={product.id} className="w-auto min-w-[22rem] mx-8 first:ml-0 last:mr-0">
									<StoreItem {...product} />
								</div>
							))}
					</div>
				</>
			)}

			<Title text="Products" customSize="text-3xl" className="pb-8" />
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate__animated animate__fadeIn animate__faster">
					{Array.isArray(products) &&
						products.map((product) => (
							<div key={product.id}>
								<StoreItem {...product} />
							</div>
						))}
				</div>
			)}
		</div>
	);
};

export default Home;
