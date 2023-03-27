import Dao from ".";

class UserDao {
    private dao: Dao;

	constructor(dao: Dao) {
        this.dao = dao;
    }

    public async createUser(name: string, email: string, password: string): Promise<any> {
        return await this.dao.executeQuery('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    }

    public async getAllUsers(): Promise<any> {
        return await this.dao.executeQuery('SELECT * FROM users');
    }

    public async getUserById(id: number): Promise<any> {
        return await this.dao.executeQuery('SELECT * FROM users WHERE id = $1', [id]);
    }

    public async getUserByEmail(email: string): Promise<any> {
        return await this.dao.executeQuery('SELECT * FROM users WHERE email = $1', [email]);
    }
}

export default UserDao;
