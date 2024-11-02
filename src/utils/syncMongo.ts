import type { MongoClient } from "mongodb";
import container from "~/inversify.config";

export const toMongo = <T extends Document>(items: Array<T>): Array<T> => {
  const mongodb = container.get<MongoClient>("MongoClient");
  mongodb.connect();
  mongodb.db("CaroFood").collection("FoodItems").insertMany(items);
  return items;
};
export const fromMongo = <T>(): Array<T> => {
  return [];
};
