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

	public async updateUser(id: number, name: string, email: string, password: string) {
		const hashedPassword = await Utils.hashPassword(password);

		const query = `
      UPDATE users
      SET name = $2, email = $3, password = $4
      WHERE id = $1
      RETURNING *;
    `;
		const result = await db.query(query, [id, name, email, hashedPassword]);
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
