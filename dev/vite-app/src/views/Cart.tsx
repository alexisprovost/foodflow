import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

const Cart = () => {
	useDocumentTitle("Cart");

	return (
		<>
			<Title text="Cart" />
		</>
	);
};

export default Cart;
