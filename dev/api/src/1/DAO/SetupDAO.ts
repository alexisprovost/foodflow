import db from "./Database";

class SetupDAO {
	public async CreateTablesIfNotExist() {
		const query = `
        CREATE TABLE "users" (
            "id" serial PRIMARY KEY,
            "firstname" VARCHAR(40),
            "name" VARCHAR(255),
            "email" VARCHAR(255) NOT NULL UNIQUE,
            "date_of_birth" DATE,
            "password" VARCHAR(255) NOT NULL,
            "role" INT DEFAULT 0 NOT NULL
          );
          
          CREATE TABLE "wallet" (
            "id" serial PRIMARY KEY,
            "balance" INT,
            "owner" INT
          );
          
          CREATE TABLE "transaction" (
            "id" serial PRIMARY KEY,
            "date" DATE NOT NULL,
            "user_id" INT NOT NULL
          );
          
          CREATE TABLE "products" (
            "id" serial PRIMARY KEY,
            "barcode" INT NOT NULL UNIQUE,
            "name" VARCHAR(255) NOT NULL,
            "added_date" TIMESTAMP,
            "quantity" INT DEFAULT 1,
            "category" INT,
            "format" VARCHAR(30),
            "url_image" TEXT
          );
          
          CREATE TABLE "category" (
            "id" serial PRIMARY KEY,
            "name" VARCHAR(255) NOT NULL
          );
          
          CREATE TABLE "price" (
            "id" serial PRIMARY KEY,
            "product_barcode" INT NOT NULL,
            "effective_date" DATE DEFAULT CURRENT_DATE,
            "value" NUMERIC(7,2)
          );
          
          CREATE TABLE "product_transaction" (
            "id_product" INT,
            "id_transaction" INT
          );
          
          ALTER TABLE "products" ADD FOREIGN KEY ("category") REFERENCES "category" ("id");
          
          ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_product") REFERENCES "products" ("id");
          
          ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_transaction") REFERENCES "transaction" ("id");
          
          ALTER TABLE "wallet" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id");
          
          ALTER TABLE "transaction" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
          
          ALTER TABLE "price" ADD FOREIGN KEY ("product_barcode") REFERENCES "products" ("id");
      `;

		try {
			await db.query(query);
		} catch (err) {
			console.error("Error creating tables:", err);
		}
	}

	public async addSampleData() {
		const snacks = [
			{
				barcode: 1,
				name: "Lipton Peach Iced Tea",
				added_date: new Date(),
				quantity: 10,
				category: "Beverages",
				format: "1L",
				url_image: "https://img.sshort.net/i/E5Jq.png",
				price: 1.99,
			},
			{
				barcode: 2,
				name: "Doritos Cool Ranch",
				added_date: new Date(),
				quantity: 20,
				category: "Chips",
				format: "150g",
				url_image: "https://img.sshort.net/i/ErIz.webp",
				price: 2.49,
			},
			{
				barcode: 3,
				name: "Gatorade",
				added_date: new Date(),
				quantity: 5,
				category: "Beverages",
				format: "500ml",
				url_image: "https://img.sshort.net/i/EFon.png",
				price: 3.99,
			},
			{
				barcode: 4,
				name: "Coca-Cola",
				added_date: new Date(),
				quantity: 10,
				category: "Beverages",
				format: "330ml",
				url_image: "https://img.sshort.net/i/EmKA.png",
				price: 1.99,
			},
			{
				barcode: 5,
				name: "Cheetos",
				added_date: new Date(),
				quantity: 15,
				category: "Chips",
				format: "200g",
				url_image: "https://img.sshort.net/i/Exxr.png",
				price: 2.99,
			},
			{
				barcode: 6,
				name: "Snickers",
				added_date: new Date(),
				quantity: 12,
				category: "Candy",
				format: "55g",
				url_image: "https://img.sshort.net/i/E4ME.png",
				price: 1.49,
			},
			{
				barcode: 7,
				name: "KitKat",
				added_date: new Date(),
				quantity: 8,
				category: "Candy",
				format: "45g",
				url_image: "https://img.sshort.net/i/E9Nf.png",
				price: 1.29,
			},
			{
				barcode: 8,
				name: "Twix",
				added_date: new Date(),
				quantity: 7,
				category: "Candy",
				format: "50g",
				url_image: "https://img.sshort.net/i/EDjt.png",
				price: 1.39,
			},
			{
				barcode: 9,
				name: "Planters Trail Mix",
				added_date: new Date(),
				quantity: 4,
				category: "snackss",
				format: "170g",
				url_image: "https://img.sshort.net/i/EJ2k.png",
				price: 4.99,
			},
			{
				barcode: 10,
				name: "Oreo",
				added_date: new Date(),
				quantity: 9,
				category: "Cookies",
				format: "154g",
				url_image: "https://img.sshort.net/i/EHL2.png",
				price: 2.99,
			},
			{
				barcode: 11,
				name: "Clif Almond Fudge",
				added_date: new Date(),
				quantity: 6,
				category: "Protein Bars",
				format: "68g",
				url_image: "https://img.sshort.net/i/EVRI.png",
				price: 2.79,
			},
			{
				barcode: 12,
				name: "Lays Chips",
				added_date: new Date(),
				quantity: 18,
				category: "Chips",
				format: "200g",
				url_image: "https://img.sshort.net/i/EkJ8.png",
				price: 2.49,
			},
		];

		const insertProductQuery = `
        INSERT INTO "products" (barcode, name, added_date, quantity, category, format, url_image)
        VALUES ($1, $2, $3, $4, (SELECT id FROM "category" WHERE name = $5), $6, $7)
      `;

		const insertPriceQuery = `
        INSERT INTO "price" (product_barcode, effective_date, value)
        VALUES ($1, $2, $3)
      `;

		const insertCategoryQuery = `
        INSERT INTO "category" (name)
        VALUES ($1)
      `;

		try {
			// insert each product, its price, and category (if it doesn't exist)
			for (const snack of snacks) {
				// insert category if it doesn't exist
				// const categoryResult = await db.query('SELECT * FROM "category" WHERE name = $1', [snack.category]);
				// let categoryId;
				// if (categoryResult.rowCount === 0) {
				// 	const result = await db.query(insertCategoryQuery, [snack.category]);
				// 	categoryId = result.rows[0].id;
				// } else {
				// 	categoryId = categoryResult.rows[0].id;
				// }

				// insert product and price
				await db.query(insertProductQuery, [snack.barcode, snack.name, snack.added_date, snack.quantity, snack.category, snack.format, snack.url_image]);

				await db.query(insertPriceQuery, [snack.barcode, new Date(), snack.price]);
			}
		} catch (err) {
			console.error("Error adding sample data:", err);
		}
	}
}

export default SetupDAO;
