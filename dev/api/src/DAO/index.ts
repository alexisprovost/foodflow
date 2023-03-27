import { Pool } from "pg";

import UserDao from "./UserDAO";

class Dao {
	protected pool: Pool;
	public userDao: UserDao;

	constructor() {
		this.userDao = new UserDao(this);

		this.pool = new Pool({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			port: 5432,
		});

		const tryConnect = async () => {
			try {
				const client = await this.pool.connect();
				const result = await client.query("SELECT NOW()");
				console.log(result.rows);
			} catch (err: any) {
				console.error("Error acquiring client", err.stack);
				setTimeout(() => tryConnect(), 30000); // retry every 30 seconds
			}
		};

		tryConnect().then(() => {
			this.pool.connect(async (err, client, release) => {
				if (err) {
					return console.error("Error acquiring client", err.stack);
				}

				try {
					const result = await client.query(
						"SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users') as exists"
					);
					if (!result.rows[0].exists) {
						console.log("The 'users' table does not exist, creating...");
						await client.query(`
											CREATE TABLE users (
												id SERIAL PRIMARY KEY,
												name VARCHAR(255) NOT NULL, 
												email VARCHAR(255) NOT NULL UNIQUE,
												password VARCHAR(255) NOT NULL
											)
											`);
						console.log("The 'users' table has been created.");
					}
				} catch (err: any) {
					console.error("Error executing query", err.stack);
				} finally {
					release();
				}
			});
		});
	}

	public async executeQuery(query: string, params?: any[]): Promise<any> {
		const client = await this.pool.connect();
		try {
			const result = await client.query(query, params);
			return result.rows;
		} catch (err) {
			throw err;
		} finally {
			client.release();
		}
	}

	public async executeTransaction(queries: string[], params?: any[][]): Promise<void> {
		const client = await this.pool.connect();
		try {
			await client.query("BEGIN");
			for (let i = 0; i < queries.length; i++) {
				await client.query(queries[i], params ? params[i] : undefined);
			}
			await client.query("COMMIT");
		} catch (e) {
			await client.query("ROLLBACK");
			throw e;
		} finally {
			client.release();
		}
	}
}

export default Dao;
