import db from "./Database";

class ProductDao {
	public async getAllProducts() {
		const result = await db.query(
			"SELECT p.*, COALESCE(json_agg(c.name ORDER BY c.name), '[]') AS categories, COALESCE(json_agg(pr.value ORDER BY pr.effective_date DESC), '[]') AS prices FROM products p LEFT JOIN category_products cp ON cp.id_product = p.id LEFT JOIN category c ON cp.id_category = c.id LEFT JOIN price pr ON pr.product_barcode = p.id GROUP BY p.id;"
		);
		return result;
	}

	public async getProductById(id: number) {
		const result = await db.query("SELECT * FROM products WHERE id = $1", [id]);
		return result[0];
	}

	public async createProduct(
		name: string,
		url_image: string,
		barcode: string,
		added_date: string,
		quantity: number,
		format: string,
		value: number,
		effective_date: string,
		categoryIds?: number[]
	) {
		const query = `
		  INSERT INTO products (name, url_image, barcode, added_date, quantity, format)
		  VALUES ($1, $2, $3, $4, $5, $6)
		  RETURNING id;
		`;
		const resultProduct = await db.query(query, [name, url_image, barcode, added_date, quantity, format]);
		const productId = resultProduct[0].id;

		const priceQuery = `
		  INSERT INTO price (product_barcode, value, effective_date)
		  VALUES ($1, $2, $3);
		`;
		await db.query(priceQuery, [productId, value, effective_date]);

		if (categoryIds && categoryIds.length > 0) {
			const categoryQueries = categoryIds.map((categoryId) => {
				return `
			  INSERT INTO category_products (id_category, id_product)
			  VALUES ($1, $2);
			`;
			});

			await Promise.all(categoryQueries.map((query, index) => db.query(query, [categoryIds[index], productId])));
		}

		// return result[0];
		const addedProduct = {
			id: productId,
			name: name,
			url_image: url_image,
			barcode: barcode,
			added_date: added_date,
			quantity: quantity,
			format: format,
			price: {
				value: value,
				effective_date: effective_date,
			},
		};

		return addedProduct;
	}

	public async updateProduct(id: number, name: string, barcode: string, added_date: string, quantity: number, category: number, format: string, url_image: string) {
		const query = `
          UPDATE products
          SET name = $2, barcode = $3, added_date = $4, quantity = $5, category = $6, format = $7, url_image = $8
          WHERE id = $1
          RETURNING *;
        `;
		const result = await db.query(query, [id, name, barcode, added_date, quantity, category, format, url_image]);
		return result[0];
	}

	public async getUserByBarcode(barcode: string) {
		const result = await db.query("SELECT * FROM products WHERE barcode = $1", [barcode]);
		return result[0];
	}

	public async deleteProduct(id: number) {
		const query = "DELETE FROM products WHERE id = $1 RETURNING *;";
		const result = await db.query(query, [id]);
		return result[0];
	}
}

export default ProductDao;
