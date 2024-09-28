// src/inversify.config.ts
import { Client } from "fauna";
import { Container } from "inversify";

const container = new Container();

container
  .bind<Client>("FaunaClient")
  .toDynamicValue(() => {
    return new Client({ secret: import.meta.env["FAUNADB_SECRET"] });
  })
  .inSingletonScope();

export default container;
