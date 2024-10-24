// src/inversify.config.ts
import { Container } from "inversify";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://CaroFood:${import.meta.env["MONGODB_SECRET"]}@cluster0.ud91x5w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const container = new Container();

container
  .bind<MongoClient>("MongoClient")
  .toDynamicValue(() => {
    return client;
  })
  .inSingletonScope();

export default container;
