import { base58btc } from "multiformats/bases/base58";
import { bytesToHex, hexToBytes, utf8ToBytes } from "@noble/hashes/utils";
import { base32 } from "multiformats/bases/base32";
import { base64, base64url } from "multiformats/bases/base64";

export default abstract class Multibase {
  abstract toBytes(): Uint8Array;

  static decodeString(data: string): Uint8Array {
    let bytes: Uint8Array;
    if (data[0] === "z") {
      bytes = base58btc.decode(data);
    } else if (data[0] === "f") {
      bytes = Uint8Array.from(hexToBytes(data.substring(1)));
    } else if (data[0] === "b") {
      let str = data.substring(1).toUpperCase();
      while (str.length % 4 !== 0) {
        str += "=";
      }
      bytes = base32.decode(str);
    } else if (data[0] === "u") {
      let str = data.substring(1);
      while (str.length % 4 !== 0) {
        str += "=";
      }
      bytes = base64url.decode(str);
    } else if (data[0] === ":") {
      bytes = utf8ToBytes(data);
    } else {
      throw new Error(`Multibase encoding ${data[0]} not supported`);
    }

    return bytes;
  }

  toHex(): string {
    return `f${bytesToHex(this.toBytes())}`;
  }

  toBase32(): string {
    return `b${base32.encode(this.toBytes()).replace(/=/g, "").toLowerCase()}`;
  }

  toBase64Url(): string {
    return `u${base64.encode(this.toBytes())}`;
  }

  toBase58(): string {
    return `z${base58btc.encode(this.toBytes())}`;
  }

  toString(): string {
    return this.toBase58();
  }
}
