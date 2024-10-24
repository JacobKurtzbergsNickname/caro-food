import type { MongoClient } from "mongodb";
import container from "~/inversify.config";
import type { FoodItem } from "~/types/FoodItem";

declare const console: Console;

export const syncFoodItems = async (
  clientFoodItems: Array<FoodItem>
): Promise<Array<FoodItem>> => {
  try {
    const mongoClient = container.get<MongoClient>("MongoClient");
    const database = mongoClient.db("CaroFood");
    const foodItemsCollection = database.collection<FoodItem>("foodItems");
    const serverFoodItems = await foodItemsCollection.find().toArray();
    const mergedFoodItems = [...clientFoodItems, ...serverFoodItems];
    await foodItemsCollection.deleteMany({});
    const result = await foodItemsCollection.insertMany(mergedFoodItems);
    return result.acknowledged ? mergedFoodItems : clientFoodItems;
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("MongoDB Query Error:", error);
    } else {
      errorMessage = String(error);
    }
    throw new Error(errorMessage);
  }
};
