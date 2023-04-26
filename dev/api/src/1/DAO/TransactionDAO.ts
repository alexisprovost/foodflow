import db from "./Database";
import type { Product } from "./ProductDAO";

interface ProductTransaction {
  product: Product;
  quantity: number;
}

interface Transaction {
  id: number;
  date: string;
  products: ProductTransaction[];
  user_id: number;
}

class TransactionDAO {


  async createTransaction(transaction: Transaction): Promise<Transaction> {
    const { date, user_id, products } = transaction;
    const transactionQuery = `
      INSERT INTO transaction (date, user_id)
      VALUES ($1, $2)
      RETURNING id;
    `;

    const transactionResult = await db.query(transactionQuery, [date, user_id]);
    const transactionId = transactionResult[0].id;

    const productTransactionQuery = `
      INSERT INTO product_transaction (id_product, quantity, id_transaction)
      VALUES ($1, $2, $3);
    `;

    await Promise.all(
      products.map((productTransaction) =>
        db.query(productTransactionQuery, [
          productTransaction.product.id,
          productTransaction.quantity,
          transactionId,
        ])
      )
    );

    return {
      id: transactionId,
      date,
      products,
      user_id,
    };
  }

  async getTransactionById(id: number): Promise<Transaction> {
    const transactionQuery = `
      SELECT * FROM transaction WHERE id = $1;
    `;

    const transactionResult = await db.query(transactionQuery, [id]);

    if (transactionResult.length === 0) {
      throw new Error(`Transaction with id ${id} not found`);
    }

    const productTransactionQuery = `
      SELECT p.*, pt.quantity
      FROM product_transaction pt
      JOIN products p ON pt.id_product = p.id
      WHERE pt.id_transaction = $1;
    `;

    const productsResult = await db.query(productTransactionQuery, [id]);

    const products: ProductTransaction[] = productsResult.map((row : any) => ({
      product: {
        id: row.id,
        name: row.name,
        url_image: row.url_image,
        barcode: row.barcode,
        added_date: new Date(row.added_date),
        quantity: row.quantity,
        format: row.format,
        price: parseFloat(row.price),
        categories: row.categories,
      },
      quantity: row.quantity,
    }));

    return {
      id,
      date: transactionResult[0].date,
      products,
      user_id: transactionResult[0].user_id,
    };
  }

  async getTransactionsByUserId(user_id: number): Promise<Transaction[]> {
    const transactionQuery = `
      SELECT * FROM transaction WHERE user_id = $1;
    `;
  
    const transactionResult = await db.query(transactionQuery, [user_id]);
  
    const transactions: Transaction[] = await Promise.all(
      transactionResult.map(async (row: any) => {
        const productsResult = await db.query(
          `
          SELECT p.*, pt.quantity, pr.price
          FROM product_transaction pt
          JOIN products p ON pt.id_product = p.id
          JOIN LATERAL (
            SELECT value as price
            FROM price
            WHERE id_product = p.id
            ORDER BY effective_date DESC
            LIMIT 1
          ) pr ON true
          WHERE pt.id_transaction = $1;
        `,
          [row.id]
        );
  
        const products: ProductTransaction[] = productsResult.map((row: any) => ({
          product: {
            id: row.id,
            name: row.name,
            url_image: row.url_image,
            barcode: row.barcode,
            added_date: new Date(row.added_date),
            quantity: row.quantity,
            format: row.format,
            price: parseFloat(row.price),
            categories: row.categories,
          },
          quantity: row.quantity,
        }));
  
        return {
          id: row.id,
          date: row.date,
          products,
          user_id: row.user_id,
        };
      })
    );
  
    return transactions;
  }
  
  async deleteTransaction(id: number): Promise<void> {
    const deleteProductTransactionQuery = `
      DELETE FROM product_transaction
      WHERE id_transaction = $1;
    `;
    await db.query(deleteProductTransactionQuery, [id]);

    const deleteTransactionQuery = `
      DELETE FROM transaction
      WHERE id = $1;
    `;
    const deleteResult = await db.query(deleteTransactionQuery, [id]);

    if (deleteResult.rowCount === 0) {
      throw new Error(`Transaction with id ${id} not found`);
    }
  }
}

export default TransactionDAO;





