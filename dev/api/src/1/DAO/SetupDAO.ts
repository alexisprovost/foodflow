import db from "./Database";

export const createDBTablesQuery = `
	CREATE TABLE "organisation" (
		"id" serial PRIMARY KEY,
		"name" VARCHAR(255) NOT NULL
	);
	CREATE TABLE "organisation_users" (
		"organisation_id" INT NULL,
		"user_id" INT NULL
	);
	CREATE TABLE "users" (
		"id" serial PRIMARY KEY,
		"firstname" VARCHAR(40) NULL,
		"name" VARCHAR(255) NULL,
		"email" VARCHAR(255) NOT NULL UNIQUE,
		"date_of_birth" DATE NULL,
		"password" VARCHAR(255) NOT NULL,
		"role" INT DEFAULT 0 NOT NULL,
		refresh_token VARCHAR(255) NULL,
		refresh_token_expires TIMESTAMP NULL
	);
	CREATE TABLE "wallet" (
		"id" serial PRIMARY KEY,
		"balance" NUMERIC(7,2) NULL,
		"owner" INT NULL
	);
	CREATE TABLE "transaction" (
		"id" serial PRIMARY KEY,
		"date" DATE NOT NULL,
		"user_id" INT NOT NULL,
		"organisation_id" INT NULL
	);
	CREATE TABLE "products" (
		"id" serial PRIMARY KEY,
		"barcode" VARCHAR(255) NOT NULL UNIQUE,
		"name" VARCHAR(255) NOT NULL,
		"added_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		"quantity" INT DEFAULT 1,
		"format" VARCHAR(30) NULL,
		"url_image" TEXT NULL,
		"organisation_id" INT NULL
	);
	CREATE TABLE "category" (
		"id" serial PRIMARY KEY,
		"name" VARCHAR(255) NOT NULL,
		"organisation_id" INT NULL
	);
	CREATE TABLE "category_products" (
		"id_category" INT NULL,
		"id_product" INT NULL
	);
	CREATE TABLE "price" (
		"id" serial PRIMARY KEY,
		"id_product" INT NOT NULL,
		"effective_date" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		"value" NUMERIC(7,2) NULL
	);
	CREATE TABLE "product_transaction" (
		"id_product" INT NULL,
		"quantity" INT NULL,
		"id_transaction" INT NULL
	);
	ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_product") REFERENCES "products" ("id");
	ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_transaction") REFERENCES "transaction" ("id");
	ALTER TABLE "wallet" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id");
	ALTER TABLE "transaction" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
	ALTER TABLE "price" ADD FOREIGN KEY ("id_product") REFERENCES "products" ("id");
	ALTER TABLE "category_products" ADD CONSTRAINT "fk_category_id" FOREIGN KEY ("id_category") REFERENCES "category" ("id");
	ALTER TABLE "category_products" ADD CONSTRAINT "fk_id_product" FOREIGN KEY ("id_product") REFERENCES "products" ("id");
	ALTER TABLE "products" ADD CONSTRAINT "fk_organisation_id" FOREIGN KEY ("organisation_id") REFERENCES "organisation" ("id");
	ALTER TABLE "category" ADD CONSTRAINT "fk_organisation_id" FOREIGN KEY ("organisation_id") REFERENCES "organisation" ("id");
	ALTER TABLE "organisation_users" ADD CONSTRAINT "fk_organisation_id" FOREIGN KEY ("organisation_id") REFERENCES "organisation" ("id");
	ALTER TABLE "organisation_users" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users" ("id");
`;

export const sampleProductsList = [
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
		category: "Snacks",
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

class SetupDAO {
	public async CreateTablesIfNotExist() {
		try {
			await db.query(createDBTablesQuery);
		} catch (err) {
			console.error("Error creating tables:", err);
		}
	}

	public async addSampleData() {
		const insertProductQuery = `
    INSERT INTO "products" (barcode, name, added_date, quantity, format, url_image)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
  `;

		const insertCategoryProductQuery = `
    INSERT INTO "category_products" (id_category, id_product)
    VALUES ($1, $2)
  `;

		const insertPriceQuery = `
    INSERT INTO "price" (id_product, effective_date, value)
    VALUES ($1, $2, $3)
  `;

		const insertCategoryQuery = `
    INSERT INTO "category" ("name")
    VALUES ($1)
	RETURNING id
  `;

		try {
			// insert each product, its price, and category (if it doesn't exist)
			for (const snack of sampleProductsList) {
				// insert category if it doesn't exist
				const categoryResult = await db.query('SELECT * FROM "category" WHERE name = $1', [snack.category]);
				let categoryId;
				if (categoryResult.length > 0) {
					categoryId = categoryResult[0].id;
				} else {
					const result = await db.query(insertCategoryQuery, [snack.category]);
					const ids = result.map((result: { id: any }) => result.id);
					categoryId = ids[0];
				}

				// insert product and price
				const productResult = await db.query(insertProductQuery, [snack.barcode, snack.name, snack.added_date, snack.quantity, snack.format, snack.url_image]);
				const productId = productResult.map((result: { id: any }) => result.id)[0];

				await db.query(insertCategoryProductQuery, [categoryId, productId]);

				await db.query(insertPriceQuery, [productId, new Date(), snack.price]);
			}
		} catch (err) {
			console.error("Error adding sample data:", err);
		}
	}
}

export default SetupDAO;
