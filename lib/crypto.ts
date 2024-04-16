import CryptoJS from "crypto";

// req & res data 보안이 필요할 때
const KEY = process.env.CRYPTO_KEY ?? "";
const IV = process.env.CRYPTO_IV ?? "";
const ALGORITHM = "aes-256-cbc";

class CryPto {
  encrypt = (data: string) => {
    const CIPHER = CryptoJS.createCipheriv(ALGORITHM, KEY, IV);
    let encrypt = CIPHER.update(data, "utf8", "base64");
    encrypt += CIPHER.final("base64");
    return encrypt;
  };

  decrypt = (data: string): string => {
    const DECIPHER = CryptoJS.createDecipheriv(ALGORITHM, KEY, IV);
    let decrypt = DECIPHER.update(data, "base64", "utf8");
    decrypt += DECIPHER.final("utf8");
    return decrypt;
  };
}

export default new CryPto();
