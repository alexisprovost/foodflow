import { Pool, PoolClient, PoolConfig } from 'pg';

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

  private constructor() {
    this.retryDelay = 5000; // default delay of 1 second
    this.pool = new Pool(poolConfig);

    // Add event listener for connect events
    this.pool.on('connect', (client) => {
      console.log('PostgreSQL connected');
      this.createTableIfNotExists(client);
    });

    // Add event listener for error events
    this.pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      // Close any active clients and try to connect again with a delay
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

  public async query(text: string, params: any[] = []): Promise<any> {
    let client;
    try {
      client = await this.pool.connect();
      const result = await client.query(text, params);
      return result.rows;
    } catch (err) {
      console.error('Error executing query:', err);
      throw err;
    } finally {
      if (client) {
        client.release();
      }
    }
  }

  private async createTableIfNotExists(client: PoolClient) {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      ); 
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        barcode VARCHAR(255) NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        added_date TIMESTAMP NOT NULL,
        quantity INT NOT NULL,
        category INT NOT NULL,
        format VARCHAR(30) NOT NULL,
        url_image TEXT NOT NULL,
      );
    `;
   
    try {
      await client.query(query);
    } catch (err) {
      console.error('Error creating tables:', err);
    }
    
  }
}

export default Database.getInstance();

