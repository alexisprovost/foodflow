/**
 * ============================================
 * Filename: ProductDAO.ts
 * Author(s): Thomas Pelletier, Alexis Provost
 * Description: This is the DAO for the product. It is used to handle all database queries related to products.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import db from "./Database";

export interface Product {
	id: number;
	name: string;
	url_image: string;
	barcode: string;
	added_date: Date;
	quantity: number;
	format: string;
	price: number;
	categories: string[];
}

class ProductDao {
	private mapProduct(singleProduct: any): Product {
		return {
			id: singleProduct.id,
			name: singleProduct.name,
			url_image: singleProduct.url_image,
			barcode: singleProduct.barcode,
			added_date: new Date(singleProduct.added_date),
			quantity: singleProduct.quantity,
			format: singleProduct.format,
			price: parseFloat(singleProduct.price),
			categories: singleProduct.categories,
		};
	}

	private async fetchProducts(query: string, queryParams?: any[]): Promise<any[]> {
		const queryResult = await db.query(query, queryParams);
		return queryResult.map(this.mapProduct);
	}
	async getPurchasedProducts(user_id: number): Promise<Product[]> {
		const query = `
		SELECT p.*, COALESCE(pr.value, 0) AS price
		FROM products p
		INNER JOIN product_transaction pt ON p.id = pt.id_product
		INNER JOIN transaction t ON t.id = pt.id_transaction
		LEFT JOIN price pr ON p.id = pr.id_product AND pr.effective_date = (SELECT MAX(effective_date) FROM price WHERE id_product = p.id)
		WHERE t.user_id = $1;
		`;

		try {
			const result = await db.query(query, [user_id]);
			const purchasedProducts = result.map(this.mapProduct);

			return purchasedProducts;
		} catch (err) {
			console.error("Error fetching purchased products:", err);
			throw err;
		}
	}

	public async getAllPurchasedProducts(): Promise<Product[]> {
		const query = `
		  SELECT p.*, 
		  COALESCE(
			  (CASE
				WHEN json_typeof(json_agg(c.name ORDER BY c.name)) = 'null' THEN '[]'
				ELSE json_agg(c.name ORDER BY c.name) FILTER (WHERE c.name IS NOT NULL)
			  END),
			'[]') AS categories,
		  COALESCE((SELECT CAST(pr.value AS NUMERIC(7,2)) FROM price pr WHERE pr.id_product = p.id ORDER BY pr.effective_date DESC LIMIT 1), 0.00) AS price 
		  FROM products p 
		  INNER JOIN product_transaction pt ON p.id = pt.id_product
		  INNER JOIN transaction t ON t.id = pt.id_transaction
		  LEFT JOIN category_products cp ON cp.id_product = p.id 
		  LEFT JOIN category c ON cp.id_category = c.id 
		  GROUP BY p.id 
		  ORDER BY p.name;
		`;
		return this.fetchProducts(query);
	}

	public async getAllProducts(itemsPerPage: number = 12, currentPage: number = 1, searchQuery: string = "", categoryFilter: string[] = [], minPrice: number = 0, maxPrice: number = Number.MAX_SAFE_INTEGER): Promise<Product[]> {
		const offset = (currentPage - 1) * itemsPerPage;
		const query = `
			SELECT p.*, 
			COALESCE(
				(CASE
					WHEN json_typeof(json_agg(c.name ORDER BY c.name)) = 'null' THEN '[]'
					ELSE json_agg(c.name ORDER BY c.name) FILTER (WHERE c.name IS NOT NULL)
				END),
			'[]') AS categories,
			COALESCE((SELECT CAST(pr.value AS NUMERIC(7,2)) FROM price pr WHERE pr.id_product = p.id ORDER BY pr.effective_date DESC LIMIT 1), 0.00) AS price 
			FROM products p 
			LEFT JOIN category_products cp ON cp.id_product = p.id 
			LEFT JOIN category c ON cp.id_category = c.id 
			LEFT JOIN unnest($6::text[]) AS filter_categories ON c.name = filter_categories
			WHERE (LOWER(p.name) LIKE LOWER($1) OR LOWER(p.barcode) LIKE LOWER($1))
			AND (ARRAY_LENGTH($6, 1) IS NULL OR c.name = filter_categories)
			GROUP BY p.id 
			HAVING COALESCE((SELECT CAST(pr.value AS NUMERIC(7,2)) FROM price pr WHERE pr.id_product = p.id ORDER BY pr.effective_date DESC LIMIT 1), 0.00) BETWEEN $4 AND $5
			ORDER BY p.name
			LIMIT $2 OFFSET $3;
		`;
		return this.fetchProducts(query, [`%${searchQuery}%`, itemsPerPage, offset, minPrice, maxPrice, categoryFilter]);
	}

	public async getProductById(id: number): Promise<Product> {
		const query = `
			SELECT p.*, 
			COALESCE(
				(CASE
					WHEN json_typeof(json_agg(c.name ORDER BY c.name)) = 'null' THEN '[]'
					ELSE json_agg(c.name ORDER BY c.name) FILTER (WHERE c.name IS NOT NULL)
				END),
			'[]') AS categories,	
			COALESCE(CAST((SELECT pr.value FROM price pr WHERE pr.id_product = p.id ORDER BY pr.effective_date DESC LIMIT 1) AS NUMERIC(7,2)), 0.00) AS price 
			FROM products p 
			LEFT JOIN category_products cp ON cp.id_product = p.id 
			LEFT JOIN category c ON cp.id_category = c.id 
			WHERE p.id = $1 
			GROUP BY p.id;`;
		const products = await this.fetchProducts(query, [id]);
		if (products.length === 0) {
			throw new Error(`Product with id ${id} not found`);
		}
		return products[0];
	}

	public async createProduct(name: string, url_image: string, barcode: string, quantity: number, format: string, price: number, categoryIds?: number[]) {
		const productQuery = `
			INSERT INTO products (name, url_image, barcode, quantity, format)
			VALUES ($1, $2, $3, $4, $5)
			RETURNING id;
		`;
		const productResult = await db.query(productQuery, [name, url_image, barcode, quantity, format]);
		const productId = productResult[0].id;

		const priceQuery = `
			INSERT INTO price (id_product, value, effective_date)
			VALUES ($1, $2, NOW());
		`;
		await db.query(priceQuery, [productId, price]);

		if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
			const categoryProductQuery = `
				INSERT INTO category_products (id_category, id_product)
				VALUES ($1, $2);
			`;
			await Promise.all(categoryIds.map((categoryId) => db.query(categoryProductQuery, [categoryId, productId])));
		}

		const addedProduct = await this.getProductById(productId);
		return addedProduct;
	}

	public async updateProduct(
		id: number,
		updateData: Partial<{
			name: string;
			barcode: string;
			quantity: number;
			categoryIds: number[];
			format: string;
			url_image: string;
			price: number;
		}>
	) {
		let query = "UPDATE products SET ";
		const queryUpdates: string[] = [];
		const queryParams: any[] = [];

		Object.entries(updateData).forEach(([key, value]) => {
			if (key !== "categoryIds" && key !== "price" && value !== undefined) {
				queryUpdates.push(`${key} = $${queryParams.length + 2}`);
				queryParams.push(value);
			}
		});

		if (queryUpdates.length === 0) {
			throw new Error("No valid properties to update");
		}

		query += queryUpdates.join(", ");
		query += " WHERE id = $1 RETURNING *;";
		queryParams.unshift(id);

		const result = await db.query(query, queryParams);

		let updatedCategories;
		if (updateData.categoryIds) {
			const deleteCategoryProductQuery = "DELETE FROM category_products WHERE id_product = $1;";
			await db.query(deleteCategoryProductQuery, [id]);

			if (updateData.categoryIds.length > 0) {
				const categoryProductQuery = `
					INSERT INTO category_products (id_category, id_product)
					VALUES ($1, $2)
					RETURNING id_category;
				`;
				const categoryResults = await Promise.all(updateData.categoryIds.map((categoryId) => db.query(categoryProductQuery, [categoryId, id])));
				updatedCategories = categoryResults.map((result) => result[0].id_category);
			}
		}

		let newPrice;
		if (updateData.price !== undefined) {
			const priceInsertQuery = `
				INSERT INTO price (id_product, effective_date, value)
				VALUES ($1, NOW(), $2)
				RETURNING value;
			`;
			const priceResult = await db.query(priceInsertQuery, [id, updateData.price]);
			newPrice = priceResult[0].value;
		}

		result[0].categories = updatedCategories || result[0].categories;
		result[0].price = newPrice || result[0].price;

		const updatedProduct = this.mapProduct(result[0]);

		return updatedProduct;
	}

	async getAvailableQuantity(productId: number): Promise<number> {
		const query = `
		  SELECT quantity
		  FROM products
		  WHERE id = $1;
		`;

		const result = await db.query(query, [productId]);

		if (result.length === 0) {
			throw new Error(`Product with ID: ${productId} not found.`);
		}

		return result[0].quantity;
	}

	public async getProductByBarcode(barcode: string) {
		const query = `
			SELECT p.*, 
				COALESCE(json_agg(c.name ORDER BY c.name), '[]') AS categories, 
				COALESCE(CAST((SELECT pr.value FROM price pr WHERE pr.id_product = p.id ORDER BY pr.effective_date DESC LIMIT 1) AS NUMERIC(7,2)), 0.00) AS price 
			FROM products p 
			LEFT JOIN category_products cp ON cp.id_category = p.id
			LEFT JOIN categories c ON cp.category_id = c.id
			WHERE p.barcode = $1 
			GROUP BY p.id;`;
		const products = await this.fetchProducts(query, [barcode]);
		if (products.length === 0) {
			throw new Error(`Product with barcode ${barcode} not found`);
		}
		return products[0];
	}

	async getLatestPrice(productId: number): Promise<number> {
		const priceQuery = `
            SELECT CAST(value AS NUMERIC(7,2)) AS price
            FROM price
            WHERE id_product = $1
            ORDER BY effective_date DESC
            LIMIT 1;
        `;

		const priceResult = await db.query(priceQuery, [productId]);

		if (priceResult.length === 0) {
			throw new Error(`Price for product_id ${productId} not found.`);
		}

		return parseFloat(priceResult[0].price);
	}

	public async deleteProduct(id: number) {
		const query = "DELETE FROM products WHERE id = $1 RETURNING *;";
		const result = await db.query(query, [id]);
		if (result.length === 0) {
			throw new Error(`Product with id ${id} not found`);
		}
		const deletedProduct = this.mapProduct(result[0]);
		return deletedProduct;
	}
}

export default ProductDao;
