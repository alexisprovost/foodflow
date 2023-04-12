import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

const Wallet = () => {
	useDocumentTitle("Wallet");

	return (
		<>
			<Title text="Wallet" />
		</>
	);
};

export default Wallet;
