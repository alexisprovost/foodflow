import db from './Database';
import Utils from '../Controller/1/Utils';

class ProductDao {

    public async getAllProducts() {
        const result = await db.query('SELECT * FROM product');
        return result;
      }
    
      public async getProductById(id: number) {
        const result = await db.query('SELECT * FROM product WHERE id = $1', [id]);
        return result[0];
      }
    
      public async createProduct(name: string, url_image: string, barcode: string, added_date: string, quantity: number, category: number, format: string) {
    
        const query = `
          INSERT INTO product (name, url_image, barcode, added_date, quantity, category, format)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;
        `;
        const result = await db.query(query, [name, url_image, barcode, added_date, quantity, category, format]);
        return result[0];
      }
    
      public async updateProduct(id: number, name: string, barcode: string, added_date: string, quantity: number, category: number, format: string, url_image: string) {
    
        const query = `
          UPDATE product
          SET name = $2, barcode = $3, added_date = $4, quantity = $5, category = $6, format = $7, url_image = $8
          WHERE id = $1
          RETURNING *;
        `;
        const result = await db.query(query, [id, name, barcode, added_date, quantity, category, format, url_image]);
        return result[0];
      }
    
      public async getUserByBarcode(barcode: string) {
        const result = await db.query('SELECT * FROM product WHERE barcode = $1', [barcode]);
        return result[0];
      }
    
      public async deleteProduct(id: number) {
        const query = 'DELETE FROM product WHERE id = $1 RETURNING *;';
        const result = await db.query(query, [id]);
        return result[0];
      }
    }
    
    export default ProductDao;








