import db from "./Database";

interface Product {
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

	public async getAllProducts(): Promise<Product[]> {
		const query = `
			SELECT p.*, 
			COALESCE(
				(CASE
					WHEN json_typeof(json_agg(c.name ORDER BY c.name)) = 'null' THEN '[]'
					ELSE json_agg(c.name ORDER BY c.name) FILTER (WHERE c.name IS NOT NULL)
				END),
			'[]') AS categories,
				COALESCE((SELECT CAST(pr.value AS NUMERIC(7,2)) FROM price pr WHERE pr.product_id = p.id ORDER BY pr.effective_date DESC LIMIT 1), 0.00) AS price 
			FROM products p 
			LEFT JOIN category_products cp ON cp.id_product = p.id 
			LEFT JOIN category c ON cp.id_category = c.id 
			GROUP BY p.id;`;
		return this.fetchProducts(query);
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
				  COALESCE(CAST((SELECT pr.value FROM price pr WHERE pr.product_id = p.id ORDER BY pr.effective_date DESC LIMIT 1) AS NUMERIC(7,2)), 0.00) AS price 
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
		INSERT INTO price (product_id, value, effective_date)
		VALUES ($1, $2, NOW());
		`;
		await db.query(priceQuery, [productId, price]);

		//cast to number[] to avoid type error
		categoryIds = categoryIds as number[];

		if (categoryIds && Array.isArray(categoryIds) && categoryIds.length > 0) {
			console.log("categoryIds", categoryIds);
			const categoryProductQuery = `
    INSERT INTO category_products (category_id, product_id)
    VALUES ($1, $2);
  `;
			await Promise.all(categoryIds.map((categoryId) => db.query(categoryProductQuery, [categoryId, productId])));
		}

		const addedProduct = await this.getProductById(productId);
		return addedProduct;
	}

	public async updateProduct(id: number, name: string, barcode: string, added_date: string, quantity: number, categoryIds: number[], format: string, url_image: string) {
		const query = `
          UPDATE products
          SET name = $2, barcode = $3, added_date = $4, quantity = $5, format = $6, url_image = $7
          WHERE id = $1
          RETURNING *;
        `;
		const result = await db.query(query, [id, name, barcode, added_date, quantity, format, url_image]);
		const updatedProduct = this.mapProduct(result[0]);

		const deleteCategoryProductQuery = "DELETE FROM category_products WHERE product_id = $1;";
		await db.query(deleteCategoryProductQuery, [id]);

		if (categoryIds && categoryIds.length > 0) {
			const categoryProductQuery = `
			  INSERT INTO category_products (category_id, product_id)
			  VALUES ($1, $2);
			`;
			await Promise.all(categoryIds.map((categoryId) => db.query(categoryProductQuery, [categoryId, id])));
		}

		return updatedProduct;
	}

	public async getProductByBarcode(barcode: string) {
		const query = `
			SELECT p.*, 
				  COALESCE(json_agg(c.name ORDER BY c.name), '[]') AS categories, 
				  COALESCE(CAST((SELECT pr.value FROM price pr WHERE pr.product_id = p.id ORDER BY pr.effective_date DESC LIMIT 1) AS NUMERIC(7,2)), 0.00) AS price 
			FROM products p 
			LEFT JOIN category_products cp ON cp.product_id = p.id 
			LEFT JOIN categories c ON cp.category_id = c.id 
			WHERE p.barcode = $1 
			GROUP BY p.id;`;
		const products = await this.fetchProducts(query, [barcode]);
		if (products.length === 0) {
			throw new Error(`Product with barcode ${barcode} not found`);
		}
		return products[0];
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
