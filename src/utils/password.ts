import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(5).toString("hex");
    const buffer = (await scryptAsync(password, salt, 10)) as Buffer;
    const hash = buffer.toString("hex");

    return `${hash}.${salt}`;
  }

  static async compare(plain: string, stored: string): Promise<boolean> {
    const [hash, salt] = stored.split(".");

    const buffer = (await scryptAsync(plain, salt, 10)) as Buffer;
    return buffer.toString("hex") === hash;
  }
}
