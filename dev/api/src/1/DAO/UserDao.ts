import db from "./Database";
import Utils from "../Controller/Utils";

/*
 * ============================================
 * Filename: UserDao.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: This file contains the logic for the user DAO. It is used to handle all requests related to users.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 * */

export interface User {
	id: number;
	firstname: string;
	name: string;
	email: string;
	date_of_birth: string;
	role: number;
	refresh_token: string;
	refresh_token_expires: string;
}

class UserDao {
	protected async getAllUsers() {
		const result = await db.query("SELECT * FROM users");
		return result;
	}

	public async getUserById(id: number) {
		const result = await db.query("SELECT id, firstname, name, email, date_of_birth, role FROM users WHERE id = $1", [id]);
		return result[0];
	}

	public async getRefreshTokenbyUserId(id: number) {
		const result = await db.query("SELECT id, refresh_token, refresh_token_expires FROM users WHERE id = $1", [id]);
		return result[0];
	}

	public async createUser(email: string, password: string) {
		const hashedPassword = await Utils.hash(password);

		const query = `
			INSERT INTO users (email, password)
			VALUES ($1, $2)
			RETURNING id, email;
		`;

		const result = await db.query(query, [email, hashedPassword]);
		return result[0];
	}

	public async updateUser(id: number, updateData: Partial<{ firstname: string; name: string; date_of_birth: string; currentpassword: string; newpassword: string }>) {
		let query = "UPDATE users SET ";
		const queryUpdates: string[] = [];
		const queryParams: any[] = [];

		Object.entries(updateData).forEach(([key, value]) => {
			if (key !== "currentpassword" && key !== "newpassword" && value !== undefined) {
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

		if (updateData.currentpassword && updateData.newpassword) {
			// get the password from the database
			const checkPasswordQuery = "SELECT password FROM users WHERE id = $1;";
			// call the query
			const resultcheckpassword = await db.query(checkPasswordQuery, [id]);
			// hash the password given by the user
			const hashedPassword = await Utils.hash(updateData.currentpassword);
			// compare the two passwords to see if they match
			if (await Utils.compareHash(updateData.currentpassword, resultcheckpassword[0].password)) {
				const hashedNewPassword = await Utils.hash(updateData.newpassword);
				const updatePasswordQuery = "UPDATE users SET password = $1 WHERE id = $2 RETURNING *;";
				const resultnewpassword = await db.query(updatePasswordQuery, [hashedNewPassword, id]);
			} else {
				throw new Error("Wrong password");
			}
		}
		return result[0];
	}

	public async getUserByRefreshToken(refreshToken: string) {
		const hashedToken = await Utils.hash(refreshToken);
		const query = `
		  SELECT id, firstname, name, email, date_of_birth, role
		  FROM users
		  WHERE refresh_token = $1;
		`;
		const result = await db.query(query, [hashedToken]);
		return result[0];
	}

	public async saveRefreshToken(userId: number, refreshToken: string, expiresIn: number) {
		const hashedToken = await Utils.hash(refreshToken);
		const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();
		const query = `
		  UPDATE users
		  SET refresh_token = $1, refresh_token_expires = $2
		  WHERE id = $3
		  RETURNING *;
		`;
		const result = await db.query(query, [hashedToken, expiresAt, userId]);
		return result[0];
	}

	public async getUserByEmail(email: string) {
		const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
		return result[0];
	}

	public async deleteUser(id: number) {
		const deleteOrganisationUsersQuery = "DELETE FROM organisation_users WHERE user_id = $1;";
		await db.query(deleteOrganisationUsersQuery, [id]);

		const deleteWalletQuery = "DELETE FROM wallet WHERE owner = $1;";
		await db.query(deleteWalletQuery, [id]);

		// Delete rows in the 'transaction' table with the given user ID
		const deleteTransactionQuery = "DELETE FROM transaction WHERE user_id = $1;";
		await db.query(deleteTransactionQuery, [id]);

		const deleteUserQuery = "DELETE FROM users WHERE id = $1 RETURNING *;";
		const result = await db.query(deleteUserQuery, [id]);

		return result[0];
	}
}

export default UserDao;
