import { useContext, useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import Title from "../../components/Title";
import CartCheckoutItem from "../../components/Cart/CartCheckoutItem";
import { CartContext } from "../../hooks/CartProvider";

import { AuthContext } from "../../hooks/AuthProvider";

import axios from "axios";

import { ItemProps } from "../../components/StoreItem";
import { CartItemProps } from ".";

interface CheckoutProductProps {
	product: ItemProps;
	quantity: number;
}

interface FormState {
	products: CheckoutProductProps[];
	paymentMethod: string;
	shippingMethod: string;
	shippingDetails: string;
}

const Checkout = () => {
	useDocumentTitle("Checkout");
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const { getCartItems } = useContext(CartContext);
	const cartItems = getCartItems();
	const [balance, setBalance] = useState(0);
	const [products, setProducts] = useState<ItemProps[]>([]);

	const [consolidatedItems, setConsolidatedItems] = useState<CheckoutProductProps[]>([]);

	useEffect(() => {
		const newConsolidatedItems = products.map((product) => {
			return {
				product: product,
				quantity: cartItems[product.id],
			};
		});

		setConsolidatedItems(newConsolidatedItems);
	}, [products, cartItems]);

	useEffect(() => {
		setFormData((prevState) => ({ ...prevState, products: consolidatedItems }));
	}, [consolidatedItems]);

	let itemComp = consolidatedItems.map((cartItem: CheckoutProductProps) => {
		const { product, quantity } = cartItem;
		return (
			<li key={product.id}>
				<CartCheckoutItem item={product} quantity={quantity ?? 0} />
			</li>
		);
	});

	const [formData, setFormData] = useState<FormState>({
		products: [],
		paymentMethod: "balance",
		shippingMethod: "no-shipping",
		shippingDetails: "",
	});

	useEffect(() => {
		if (isAuthenticated) {
			const fetchBalance = async () => {
				try {
					const response = await axios.get("/api/1/wallet/balance", {
						headers: { Authorization: `Bearer ${accessToken}` },
					});
					setBalance(response.data.data.balance);
				} catch (error) {
					console.error("Error fetching balance:", error);
				}
			};

			fetchBalance();
		}
	}, [isAuthenticated, accessToken]);

	useEffect(() => {
		const fetchProducts = async () => {
			const itemIds = Object.keys(cartItems);
			const requests = itemIds.map((itemId) => axios.get(`/api/1/products/${itemId}`));
			try {
				const responses = await Promise.all(requests);
				const fetchedProducts = responses.map((response) => response.data.data);
				setProducts(fetchedProducts);
			} catch (error) {
				console.error(error);
			}
		};

		fetchProducts();
	}, [cartItems]);

	useEffect(() => {
		setFormData((prevState) => ({ ...prevState, products: consolidatedItems }));
	}, [consolidatedItems]);

	const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, paymentMethod: e.target.value }));
	};

	const handleShippingMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData((prevState) => ({ ...prevState, shippingMethod: e.target.value }));
	};

	const handleShippingDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormData((prevState) => ({ ...prevState, shippingDetails: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // prevent default form submission behavior
		/*axios
			.post("/api/form", formData) // send post request to server
			.then((response) => {
				console.log(response); // log response to console
				// do something else with response data
			})
			.catch((error) => {
				console.error(error); // log error to console
				// do something else with error data
			});*/

		console.log(formData);
	};

	let subtotal = consolidatedItems.reduce((acc, curr) => acc + (curr.product.price ? curr.product.price : 0) * curr.quantity, 0).toFixed(2);

	return (
		<div className="animate__animated animate__fadeIn animate__faster">
			<Title text="Checkout" />
			<div className="mt-8">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
						<div className="flex flex-col items-center">
							<div className="bg-secondary p-8 shadow-md rounded-3xl w-full">
								Checkout items
								<ul>{itemComp}</ul>
							</div>
							<div className="bg-secondary p-8 mt-8 shadow-md rounded-3xl w-full">
								Payment method
								<div className="flex flex-col items-center mt-4">
									<div className="w-full">
										<input type="radio" name="payment" id="payment-balance" className="mr-2" value="balance" defaultChecked onChange={handlePaymentMethodChange} />
										<label htmlFor="payment-balance">Balance (${balance})</label>
									</div>
									<div className="w-full">
										<input type="radio" name="payment" id="payment-credit" className="mr-2 mt-4" value="credit" onChange={handlePaymentMethodChange} />
										<label htmlFor="payment-credit">Credit Card (Visa, Mastercard, Amex)</label>
									</div>
									<div className="w-full">
										<input type="radio" name="payment" id="payment-crypto" className="mr-2 mt-4" value="crypto" onChange={handlePaymentMethodChange} />
										<label htmlFor="payment-crypto">Cryptocurrency via Coinbase Commerce</label>
									</div>
								</div>
							</div>
							<div className="bg-secondary p-8 mt-8 shadow-md rounded-3xl w-full">
								Shipping
								<div className="flex flex-col items-center mt-4">
									<div className="w-full">
										<input type="radio" name="shipping" id="no-shipping" value="no-shipping" className="mr-2" defaultChecked onChange={handleShippingMethodChange} />
										<label htmlFor="no-shipping">No Shipping</label>
									</div>
									<div className="w-full">
										<input type="radio" name="shipping" id="shipping" value="shipping" className="mr-2 mt-4" onChange={handleShippingMethodChange} />
										<label htmlFor="shipping">Shipping</label>
									</div>
									<div className="w-full">{formData.shippingMethod === "shipping" && <textarea name="shippingDetails" id="shippingDetails" className="mt-4 px-4 py-4 w-full bg-primary shadow rounded-3xl" rows={4} placeholder="Enter the office number where you want your order to be delivered" value={formData.shippingDetails} onChange={handleShippingDetailsChange} />}</div>
								</div>
							</div>
						</div>
						<div className="h-full md:h-auto">
							<div className="rounded-3xl shadow-md cursor-pointer bg-secondary flex flex-col items-center">
								<h2 className="text-xl w-full py-4 px-6 font-semibold">Total</h2>
								<ul className="w-full">
									<li className="text-lg font-normal py-4 shadow-inner px-6 hover:bg-black/25 rounded-b-3xl w-full">${subtotal}</li>
								</ul>
							</div>

							<button className="bg-green-500 w-full text-white font-semibold rounded-3xl shadow-md px-8 py-4 mt-8 transition-all hover:bg-green-600 disabled:bg-grey-600" disabled={itemComp.length === 0}>
								Place order
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Checkout;
