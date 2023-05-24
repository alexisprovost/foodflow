import { useState, useEffect, useContext } from "react";
import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";
import SearchBar from "../components/SearchBar";
import StoreItem from "../components/StoreItem";
import WarningHolder from "../components/Home/WarningHolder";
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
	const [suggestionsLoading, setSuggestionsLoading] = useState(true);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const fetchApiData = async (apiUrl: string, setSearchFunction: Function, params = {}) => {
		setError(false);
		setLoading(true);
		try {
			const response = await axios.get(apiUrl, { params });
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
			setSearchFunction(formattedProducts);
			setLoading(false);
		} catch (error) {
			console.log(error);
			setError(true);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchApiData("/api/1/products", setProducts, { searchQuery });
	}, [searchQuery]);

	useEffect(() => {
		if (isAuthenticated) {
			fetchApiData("/api/1/suggestions", setSuggestions);
		}
	}, [isAuthenticated]);

	const renderSuggestions = (itemList: ItemProps[]) => {
		return (
			<div className="flex no-scrollbar overflow-scroll overflow-scrolling-touch mb-8 animate__animated animate__fadeIn animate__faster">
				{Array.isArray(suggestions) &&
					suggestions.map((product) => (
						<div key={product.id} className="w-auto min-w-[22rem] mx-8 first:ml-0 last:mr-0">
							<StoreItem {...product} />
						</div>
					))}
			</div>
		);
	};

	const renderItem = (itemList: ItemProps[]) => {
		return (
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate__animated animate__fadeIn animate__faster">
				{itemList.map((item) => (
					<div key={item.id}>
						<StoreItem {...item} />
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="FoodFlow" />
			<SearchBar onSearch={setSearchQuery} />

			{!isAuthenticated || searchQuery.length > 0 ? (
				<></>
			) : suggestions.length === 0 ? (
				<>
					<Title text="Suggestions" customSize="text-3xl" className="pb-8" />
					<WarningHolder>No suggestions found</WarningHolder>
				</>
			) : suggestions.length === 0 ? (
				<>
					<Title text="Suggestions" customSize="text-3xl" className="pb-8" />
					<WarningHolder>No suggestions found</WarningHolder>
				</>
			) : (
				<>
					<Title text="Suggestions" customSize="text-3xl" className="pb-8" />
					{renderSuggestions(suggestions)}
				</>
			)}

			<Title text="Products" customSize="text-3xl" className="pb-8" />
			{loading ? (
				<WarningHolder>
					<>
						<div className="flex justify-center items-center">
							<Oval strokeWidth="4" stroke="#fff" />
						</div>
						<div className="text-white mt-4 text-center">Loading</div>
					</>
				</WarningHolder>
			) : error ? (
				<WarningHolder>
					<>
						An error occured while loading the products.
						<br />
						Please try again later.
					</>
				</WarningHolder>
			) : products.length === 0 ? (
				<WarningHolder>No products found</WarningHolder>
			) : (
				renderItem(products)
			)}
		</div>
	);
};

export default Home;
