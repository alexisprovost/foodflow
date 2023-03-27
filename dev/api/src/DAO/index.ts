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

		this.pool.connect((err, client, release) => {
			if (err) {
				return console.error("Error acquiring client", err.stack);
			}
			client.query("SELECT NOW()", (err, result) => {
				release();
				if (err) {
					return console.error("Error executing query", err.stack);
				}
				console.log(result.rows);
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

	public async executeTransaction(
		queries: string[],
		params?: any[][]
	): Promise<void> {
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
