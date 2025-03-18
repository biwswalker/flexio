import CryptoJS from 'crypto-js';

export function encryption(encryptext: string) {
  const text = CryptoJS.AES.encrypt(encryptext, process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString();
  return text || '';
}

export function decryption(decryptext: string) {
  const text = CryptoJS.AES.decrypt(decryptext, process.env.NEXT_PUBLIC_AES_SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  return text || '';
}
