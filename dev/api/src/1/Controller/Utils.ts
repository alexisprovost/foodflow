import bcrypt from "bcryptjs";

class Utils {
  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async comparePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  }
}

export default Utils;
