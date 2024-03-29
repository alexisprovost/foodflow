/*
 * ============================================
 * Filename: WalletDAO.ts
 * Author(s): Thomas Pelletier
 * Description: This file contains the DAO for the wallet controller. It is used to handle the queries for WalletController.
 * Sources:
 * 		1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 * */
import db from "./Database";

interface Wallet {
	id: number;
	balance: number;
}

class WalletDao {
	public async getBalance(userId: number): Promise<number> {
		const query = "SELECT balance FROM wallet WHERE owner = $1;";
		const result = await db.query(query, [userId]);
		if (result.length === 0) {
			throw new Error(`User with id ${userId} has no wallet`);
		}
		return parseFloat(result[0].balance);
	}

	public async createWallet(userId: number): Promise<void> {
		const query = `INSERT INTO wallet (balance, owner) VALUES (0, $1)`;
		const values = [userId];

		try {
			await db.query(query, values);
		} catch (err) {
			console.error("Error creating wallet:", err);
			throw err;
		}
	}

	public async addMoney(userId: number, amount: number): Promise<number> {
		const query = "UPDATE wallet SET balance = balance + $1 WHERE owner = $2 RETURNING balance;";
		const result = await db.query(query, [amount, userId]);
		if (result.length === 0) {
			throw new Error(`User with id ${userId} has no wallet`);
		}
		return parseFloat(result[0].balance);
	}

	public async setBalance(userId: number, newBalance: number): Promise<number | null> {
		const query = "UPDATE wallet SET balance = $1 WHERE owner = $2 RETURNING balance;";
		const result = await db.query(query, [newBalance, userId]);
		if (result.length === 0) {
			return null;
		}
		return parseFloat(result[0].balance);
	}

	async withdrawMoney(userId: number, amount: number) {
		const query = `
      UPDATE wallet
      SET balance = balance - $1
      WHERE owner = $2
      RETURNING balance;
    `;
		const result = await db.query(query, [amount, userId]);

		if (result.length === 0) {
			throw new Error(`Failed to withdraw money from the wallet for user with id ${userId}`);
		}

		return parseFloat(result[0].balance);
	}

	public async tipMoney(fromUserId: number, toUserId: number, amount: number): Promise<void> {
		const fromUserBalance = await this.getBalance(fromUserId);
		if (fromUserBalance < amount) {
			throw new Error("Insufficient balance");
		}

		await db.query("BEGIN;");

		try {
			await this.withdrawMoney(fromUserId, amount);
			await this.addMoney(toUserId, amount);
			await db.query("COMMIT;");
		} catch (error) {
			await db.query("ROLLBACK;");
			throw error;
		}
	}
}

export default WalletDao;
