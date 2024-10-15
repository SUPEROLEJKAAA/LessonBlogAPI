import { Db, MongoClient } from "mongodb";
import { config } from "../config";

const mongoUri: string = config.mongoUri;
const client: MongoClient = new MongoClient(mongoUri);
export const dbConnection: Db = client.db("blogapi");

export async function connectToMongo(): Promise<boolean> {
  try {
    await client.connect();
    console.log("Connected to Mongo");
    return true;
  } catch (e) {
    await client.close();
    console.log(e);
    return false;
  }
}
