import useDocumentTitle from "../hooks/useDocumentTitle";
import Title from "../components/Title";

const Cart = () => {
	useDocumentTitle("Cart");

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Cart" />
		</div>
	);
};

export default Cart;
