import { Pool, PoolConfig } from "pg";
import { createDBTablesQuery } from "./SetupDAO";

/*
 * ============================================
 * Filename: Database.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: this files contains the database class which is used to connect to the database and execute queries. It is a singleton. it also contains the pool configuration.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */

const poolConfig: PoolConfig = {
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
};

class Database {
	private static instance: Database;
	private pool: Pool;
	private retryDelay: number;
	private createTablesTry: number = 0;

	private constructor() {
		this.retryDelay = 5000;
		this.pool = new Pool(poolConfig);

		// Add event listener for successful connections
		this.pool.on("connect", (client) => {
			//Connected to the db
		});

		// Add event listener for errors
		this.pool.on("error", (err) => {
			console.error("Unexpected error on idle client", err);
			// Destroy the client
			setTimeout(() => {
				this.pool = new Pool(poolConfig);
			}, this.retryDelay);
		});
	}

	public static getInstance(): Database {
		if (!Database.instance) {
			Database.instance = new Database();
		}
		return Database.instance;
	}

	public setRetryDelay(delay: number) {
		this.retryDelay = delay;
	}

	private async createTables(): Promise<void> {
		try {
			await this.query(createDBTablesQuery);
			console.log("Tables created");
		} catch (err) {
			if (this.createTablesTry < 3) {
				this.createTablesTry++;
				console.log("Error creating tables, retrying...");
				setTimeout(async () => {
					await this.createTables();
				}, this.retryDelay);
			} else {
				console.error("Error creating tables:", err);
			}
		}
	}

	public async query(text: string, params: any[] = []): Promise<any> {
		let client;
		const tablesCreated = /relation\s+"[^"]+"\s+does\s+not\s+exist/g;

		try {
			client = await this.pool.connect();
			const result = await client.query(text, params);
			return result.rows;
		} catch (err) {
			if (tablesCreated.test((err as Error).message.toString())) {
				// If the error is due to a missing table, create the table and try again
				this.createTables();
			}

			console.error((err as Error).message);
		} finally {
			if (client) {
				client.release();
			}
		}
	}
}

export default Database.getInstance();
