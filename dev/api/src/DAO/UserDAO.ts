import db from './Database';

class UserDao {
  protected async getAllUsers() {
    const result = await db.query('SELECT * FROM users');
    return result;
  }

  public async getUserById(id: number) {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return result[0];
  }

  public async createUser(name: string, email: string, password: string) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await db.query(query, [name, email, password]);
    return result[0];
  }

  public async updateUser(id: number, name: string, email: string, password: string) {
    const query = `
      UPDATE users
      SET name = $2, email = $3, password = $4
      WHERE id = $1
      RETURNING *;
    `;
    const result = await db.query(query, [id, name, email, password]);
    return result[0];
  }

  public async getUserByEmail(email: string) {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return result[0];
  }

  private async deleteUser(id: number) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
    const result = await db.query(query, [id]);
    return result[0];
  }
}

export default UserDao;
