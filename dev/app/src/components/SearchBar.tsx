import React, { useState, useEffect } from "react";

interface SearchBarProps {
	onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const [query, setQuery] = useState<string>("");

	useEffect(() => {
		const timerId = setTimeout(() => {
			onSearch(query);
		}, 500);

		return () => {
			clearTimeout(timerId);
		};
	}, [query, onSearch]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(event.target.value);
	};

	return (
		<form>
			<input className="w-full bg-navBg rounded-[2rem] px-8 py-4 my-8 border-none focus:border-none focus:outline-none active:border-none selected:border-none" type="text" value={query} onChange={handleChange} placeholder="Search" />
		</form>
	);
};

export default SearchBar;
