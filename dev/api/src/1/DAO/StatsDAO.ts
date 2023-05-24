/*
 * ============================================
 * Filename: StatsDAO.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: This file contains the Dao for the stats. It is used to handle all queries related to stats.
 * Sources:
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */
import db from "./Database";

interface ProductStats {
	name: string;
	total_quantity: number;
	total_sales: number;
}

class StatsDAO {
	async getTopThreeProducts(): Promise<ProductStats[]> {
		const query = `
            SELECT p.name, SUM(pt.quantity) as total_quantity, SUM(pt.quantity * pr.value) as total_sales
            FROM product_transaction pt
            JOIN products p ON pt.id_product = p.id
            JOIN transaction t ON pt.id_transaction = t.id
            JOIN LATERAL (
                SELECT value
                FROM price
                WHERE id_product = p.id AND effective_date <= t.date
                ORDER BY effective_date DESC
                LIMIT 1
            ) pr ON true
            GROUP BY p.name
            ORDER BY total_quantity DESC
            LIMIT 3;
        `;

		const result = await db.query(query);
		return result;
	}

	async getBottomThreeProducts(): Promise<ProductStats[]> {
		const query = `
            SELECT p.name, SUM(pt.quantity) as total_quantity, SUM(pt.quantity * pr.value) as total_sales
            FROM product_transaction pt
            JOIN products p ON pt.id_product = p.id
            JOIN transaction t ON pt.id_transaction = t.id
            JOIN LATERAL (
                SELECT value
                FROM price
                WHERE id_product = p.id AND effective_date <= t.date
                ORDER BY effective_date DESC
                LIMIT 1
            ) pr ON true
            GROUP BY p.name
            ORDER BY total_quantity ASC
            LIMIT 3;
        `;

		const result = await db.query(query);
		return result;
	}

	async getTotalSales(): Promise<number> {
		const query = `
            SELECT SUM(pt.quantity * pr.value) as total_sales
            FROM product_transaction pt
            JOIN products p ON pt.id_product = p.id
            JOIN transaction t ON pt.id_transaction = t.id
            JOIN LATERAL (
                SELECT value
                FROM price
                WHERE id_product = p.id AND effective_date <= t.date
                ORDER BY effective_date DESC
                LIMIT 1
            ) pr ON true;
        `;

		const result = await db.query(query);
		return result[0].total_sales;
	}
}

export default StatsDAO;
