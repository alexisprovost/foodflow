import db from "./Database";
import Utils from "../Controller/Utils";

class UserDao {
	protected async getAllUsers() {
		const result = await db.query("SELECT * FROM users");
		return result;
	}

	public async getUserById(id: number) {
		const result = await db.query("SELECT id, firstname, name, email, date_of_birth, role FROM users WHERE id = $1", [id]);
		return result[0];
	}

	public async createUser(email: string, password: string) {
		const hashedPassword = await Utils.hashPassword(password);

		const query = `
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;
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
			const hashedPassword = await Utils.hashPassword(updateData.currentpassword);
			// compare the two passwords to see if they match
			if (await Utils.comparePassword(updateData.currentpassword, resultcheckpassword[0].password)) {
				console.log ("hashednewPassword", updateData.newpassword)
				const hashedNewPassword = await Utils.hashPassword(updateData.newpassword);
				const updatePasswordQuery = "UPDATE users SET password = $1 WHERE id = $2 RETURNING *;";
				const resultnewpassword = await db.query(updatePasswordQuery, [hashedNewPassword, id]);
			}
			else {
				throw new Error("Wrong password");
			}	
		}
		return result[0];

	}

	public async getUserByEmail(email: string) {
		const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
		return result[0];
	}

	private async deleteUser(id: number) {
		const query = "DELETE FROM users WHERE id = $1 RETURNING *;";
		const result = await db.query(query, [id]);
		return result[0];
	}
}

export default UserDao;
