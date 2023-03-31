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
          
          CREATE TABLE "product" (
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
          
          ALTER TABLE "product" ADD FOREIGN KEY ("category") REFERENCES "category" ("id");
          
          ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_product") REFERENCES "product" ("id");
          
          ALTER TABLE "product_transaction" ADD FOREIGN KEY ("id_transaction") REFERENCES "transaction" ("id");
          
          ALTER TABLE "wallet" ADD FOREIGN KEY ("owner") REFERENCES "users" ("id");
          
          ALTER TABLE "transaction" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
          
          ALTER TABLE "price" ADD FOREIGN KEY ("product_barcode") REFERENCES "product" ("id");
      `;

		try {
			await db.query(query);
		} catch (err) {
			console.error("Error creating tables:", err);
		}
	}
}

export default SetupDAO;
