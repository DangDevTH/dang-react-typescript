import { Buffer } from "buffer";
import * as forge from "node-forge";
import Cookies from "js-cookie";

export const useDecrypt = (encryptedDataBase64: string) : { token: string } => {
    const key = forge.util.createBuffer(Buffer.from(import.meta.env.VITE_DB_KEY, "base64"));
    const iv = forge.util.createBuffer(Buffer.from(import.meta.env.VITE_DB_IV, "base64"));
  
    const decipher = forge.cipher.createDecipher("AES-CTR", key);
    decipher.start({ iv });
  
    const encryptedBuffer = forge.util.createBuffer(forge.util.decode64(encryptedDataBase64));

    decipher.update(encryptedBuffer);
  
    if (decipher.finish() &&  Cookies.get(import.meta.env.VITE_COOKIE_NAME)) {
      return { token: decipher.output.toString() };
    } else {
      return { token: '' };
    }
}
