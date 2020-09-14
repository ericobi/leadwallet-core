import rp from "request-promise";
import { Environment } from "../../env";

const options = {
 simple: false,
 json: true,
 resolveWithFullResponse: true,
 headers: {
  "Content-Type": "application/json",
  "X-API-Key": Environment.CRYPTO_API_KEY
 }
};

const ltcPath = "/v1/bc/ltc/mainnet"
const LTCROOT = Environment.CRYPTO_API + ltcPath;

export class LTC {
 static async createAddress(): Promise<{ payload: any; statusCode: number }> {
  const response = await rp.post(LTCROOT + "/address", { ...options });
  return Promise.resolve({
   statusCode: response.statusCode,
   payload: response.body.payload
  });
 }

 static async getAddressDetails(address: string): Promise<{ payload: any; statusCode: number}> {
  const response = await rp.get(LTCROOT + "/address/" + address, { ...options });
  return Promise.resolve({
   statusCode: response.statusCode,
   payload: response.body.payload
  });
 }

 static async sendToken(
  inputs: { address: string; value: number; }[],
  outputs: { address: string; value: number; }[],
  fee: { address: string; value: number; }[]
 ): Promise<{ payload: any; statusCode: number }> {
  const response = await rp.post(LTCROOT + "/txs/create", {
   ...options,
   body: { inputs, outputs, fee }
  });
  return Promise.resolve({
   statusCode: response.statusCode,
   payload: response.body.payload
  });
 }

 static async signTransaction(hex: string, wifs: Array<string>): Promise<{ payload: any; statusCode: number; }> {
  const response = await rp.post(LTCROOT + "/txs/sign", {
   ...options,
   body: { hex, wifs }
  });
  return Promise.resolve({
   statusCode: response.statusCode,
   payload: response.body.payload
  });
 }

 static async broadcastTransaction(hex: string): Promise<{ payload: any; statusCode: number; }> {
  const response = await rp.post(LTCROOT + "/txs/send", {
   ...options,
   body: { hex }
  });
  return Promise.resolve({
   statusCode: response.statusCode,
   payload: response.body.payload
  });
 }
}
