import type { APIRoute } from "astro";
import type { MongoClient } from "mongodb";
import container from "~/inversify.config";

interface FoodItem {
  name: string;
  date: Date;
}

declare var console: Console;

export const GET: APIRoute = async () => {
  try {
    const mongoClient = container.get<MongoClient>("MongoClient");
    await mongoClient.connect();
    const database = mongoClient.db("CaroFood");
    const foodItems = database.collection<FoodItem>("foodItems");
    return new Response(JSON.stringify(foodItems), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("FaunaDB Query Error:", error);
    } else {
      errorMessage = String(error);
    }
    return new Response(`The error is ${errorMessage}`, {
      status: 500,
    });
  }
};
