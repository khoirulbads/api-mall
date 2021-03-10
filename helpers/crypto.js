const { secret } = require("../config");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Cryptr = require("cryptr");

module.exports = {
  // Encrypt hashPassword pengguna aplikasi
  createBcrypt: async (text) => {
    const result = await bcrypt.hashSync(text, await bcrypt.genSalt());
    return result;
  },
  // DIGUNAKAN UNTUK ENKRIPSI PINCODE
  createHmac: (string) => {
    const hash = crypto
      .createHmac("sha256", secret.hmac)
      .update(string)
      .digest("hex");

    return hash;
  },
  hmacWithPass: ({ string, pass }) => {
    const hash = crypto.createHmac("sha256", pass).update(string).digest("hex");

    return hash;
  },
  createHash: (text) => {
    let salt_saved = new Buffer.from(secret.hash, "base64").toString();
    return crypto.createHmac("sha1", salt_saved).update(text).digest("hex");
  },
  enkripSaldo: (text) => {
    // DIGUNAKAN UNTUK ENKRIPSI SALDO
    const password = secret.saldo;
    const key = crypto.scryptSync(password, "salt", 24);
    const algorithm = "aes-192-cbc";
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    return encrypted;
  },
  dekripSaldo: (string) => {
    const password = secret.saldo;
    const key = crypto.scryptSync(password, "salt", 24);
    const algorithm = "aes-192-cbc";
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(string, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  },
  encrypt: (string) => {
    const cryptr = new Cryptr(secret.supplier);
    return cryptr.encrypt(string);
  },
  decrypt: (string) => {
    const cryptr = new Cryptr(secret.supplier);
    return cryptr.decrypt(string);
  },
  sha256: (string) => crypto.createHash("sha256").update(string).digest("hex"),

  sha1: (string) => crypto.createHash("sha1").update(string).digest("hex"),
  md5: (string) => crypto.createHash("md5").update(string).digest("hex"),
};
