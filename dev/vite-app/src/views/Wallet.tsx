import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

const Wallet = () => {
	useDocumentTitle("Wallet");

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Wallet" />
		</div>
	);
};

export default Wallet;
