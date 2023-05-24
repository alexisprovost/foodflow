import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { useContext, useEffect, useState, Fragment } from "react";
import { AuthContext } from "../../hooks/AuthProvider";
import Title from "../../components/Title";

interface ProductsProps {
	id?: number;
	name?: string;
	barcode?: string;
	quantity?: number;
	format?: string;
	price?: number;
	url_image?: string;
}

const Products = () => {
	const { isAuthenticated, accessToken } = useContext(AuthContext);
	const [products, setProducts] = useState<ProductsProps[]>([]);
	const [newProduct, setNewProduct] = useState<ProductsProps | null>(null);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentProduct, setCurrentProduct] = useState<ProductsProps>();

	const closeModal = () => {
		setIsModalOpen(false);
		setCurrentProduct(undefined);
		setNewProduct(null);
	};

	const openModal = (product: ProductsProps) => {
		setIsModalOpen(true);
		setCurrentProduct(product);
		setNewProduct(product);
	};

	const fetchProducts = async () => {
		try {
			const response = await axios.get("/api/1/products", {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			if (response.data.status === "success") {
				setProducts(response.data.data);
			}
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	const handleCreate = async (product: ProductsProps) => {
		try {
			await axios.post("/api/1/products", product, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			fetchProducts();
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	const handleEdit = async (product: ProductsProps) => {
		try {
			const updateData = {
				name: product.name,
				barcode: product.barcode,
				quantity: product.quantity,
				format: product.format,
				price: product.price,
				url_image: product.url_image,
			};

			await axios.put(`/api/1/products/${product.id}`, updateData, {
				headers: { Authorization: `Bearer ${accessToken}` },
			});
			fetchProducts();
		} catch (error) {
			console.log("There was an error: ", error);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			fetchProducts();
		}
	}, [isAuthenticated]);

	return (
		<div className="animate__animated animate__fadeIn animate__faster  p-6">
			<Title text="Products" />
			<div className="flex items-center justify-end mb-4">
				<button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={() => openModal({})}>
					Add Product
				</button>
			</div>
			<div className="overflow-x-auto">
				<table className="table-auto border-collapse w-full bg-secondary">
					<thead>
						<tr className="rounded-lg text-sm font-medium text-white text-left bg-secondary/50">
							<th className="px-4 py-2">ID</th>
							<th className="px-4 py-2">Name</th>
							<th className="px-4 py-2">Price</th>
							<th className="px-4 py-2">Quantity</th>
							<th className="px-4 py-2">Format</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody className="text-sm font-normal text-white">
						{products.map((product) => (
							<tr className="bg-secondary border-none text-white py-10" key={product.id}>
								<td className="px-4 py-4">{product.id}</td>
								<td className="px-4 py-4">{product.name}</td>
								<td className="px-4 py-4">{product.price}</td>
								<td className="px-4 py-4">{product.quantity}</td>
								<td className="px-4 py-4">{product.format}</td>
								<td className="px-4 py-4">
									<button className="text-blue-500 hover:text-blue-600 mr-4" onClick={() => openModal(product)}>
										Edit
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
							<Dialog.Overlay className="fixed inset-0" />
						</Transition.Child>

						<span className="inline-block h-screen align-middle" aria-hidden="true">
							&#8203;
						</span>
						<Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
							<div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-primary shadow-xl rounded-2xl">
								<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
									{currentProduct && currentProduct.id ? "Edit Product" : "Add Product"}
								</Dialog.Title>

								<div className="mt-2">
									<input type="text" placeholder="Product name" value={newProduct?.name || ""} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
									<input type="text" placeholder="Product barcode" value={newProduct?.barcode || ""} onChange={(e) => setNewProduct({ ...newProduct, barcode: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
									<input type="text" placeholder="Product quantity" value={newProduct?.quantity || ""} onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
									<input type="text" placeholder="Product format" value={newProduct?.format || ""} onChange={(e) => setNewProduct({ ...newProduct, format: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
									<input type="text" placeholder="Product price" value={newProduct?.price || ""} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
									<input type="text" placeholder="Product image" value={newProduct?.url_image || ""} onChange={(e) => setNewProduct({ ...newProduct, url_image: e.target.value })} className="border-2 bg-secondary border-none text-white rounded p-2 mb-2 w-full" />
								</div>

								<div className="mt-4 text-right">
									<button
										type="button"
										className="px-4 py-2 text-sm font-medium text-black bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={() => {
											if (newProduct) {
												if (currentProduct && currentProduct.id) {
													handleEdit(newProduct);
												} else {
													handleCreate(newProduct);
												}
											}
											closeModal();
										}}
									>
										Save
									</button>
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default Products;
