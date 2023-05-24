import bcrypt from "bcryptjs";

/**
 * ============================================
 * Filename: Utils.ts
 * Author(s): Alexis Provost, Thomas Pelletier
 * Description: this file contains the utils class which contains utility functions. Those are mainly to hash and compare passwords.
 * Sources: 
 * 1. ChatGPT: https://chat.openai.com/?model=gpt-4
 * ============================================
 */

class Utils {
  static async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async compareHash(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  }
}

export default Utils;
