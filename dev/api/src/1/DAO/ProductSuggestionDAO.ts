import type { Product } from "./ProductDAO";
import ProductDao from "./ProductDAO";
type SuggestedProduct = Product & { distance: number };

class ProductSuggestionDAO {
	private productDao = new ProductDao();

	async getSuggestions(user_id: number, numberOfSuggestions: number = 15): Promise<SuggestedProduct[]> {
		let purchasedProducts = await this.productDao.getPurchasedProducts(user_id);

		// If the user has not purchased any products, select all transactions instead of only the user's transactions
		if (!purchasedProducts.length) {
			purchasedProducts = await this.productDao.getAllPurchasedProducts();
		}

		const allProducts = await this.productDao.getAllProducts();

		const suggestions: SuggestedProduct[] = [];

		for (const product of allProducts) {
			let totalDistance = 0;

			for (const purchasedProduct of purchasedProducts) {
				const distance = this.getEuclideanDistance(product, purchasedProduct);
				totalDistance += distance;
			}

			const averageDistance = totalDistance / purchasedProducts.length;

			suggestions.push({
				...product,
				distance: averageDistance,
			});
		}

		suggestions.sort((a, b) => a.distance - b.distance);

		return suggestions.slice(0, numberOfSuggestions);
	}

	private getEuclideanDistance(productA: Product, productB: Product): number {
		let sumOfSquares = 0;

		const featuresToCompare = ["price"];

		for (const feature of featuresToCompare) {
			const valueA = productA[feature as keyof Product] as number;
			const valueB = productB[feature as keyof Product] as number;

			// Check that both values are numbers before calculating the difference
			if (typeof valueA === "number" && typeof valueB === "number") {
				const difference = valueA - valueB;
				sumOfSquares += difference * difference;
			}
		}

		return Math.sqrt(sumOfSquares);
	}
}

export default ProductSuggestionDAO;
