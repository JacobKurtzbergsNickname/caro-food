// src/lib/db.server.ts
import { MongoClient, type MongoClientOptions, Db } from "mongodb";

// Declare the global scope interface for TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const uri: string = import.meta.env["MONGODB_URI"];
const options: MongoClientOptions = {};

// Initialize client and clientPromise
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Reuse the client across hot reloads in development
if (!globalThis._mongoClientPromise) {
  client = new MongoClient(uri, options);
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

// Export the client promise
export default clientPromise;

// Optional: Helper function to get the database instance
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db(import.meta.env["DB_NAME"]);
}
