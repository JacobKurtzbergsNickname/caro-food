// src/pages/api/food-data.ts
import type { APIRoute } from "astro";
import { getDatabase } from "../../lib/mongo-db.server";

declare var console: Console;

interface FoodItem {
  name: string;
  dateCreated: Date;
}

export const GET: APIRoute = async () => {
  try {
    const db = await getDatabase();
    const foodItems = await db
      .collection<FoodItem>("foodItems")
      .find({})
      .toArray();

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
      console.error("MongoDB Query Error:", error);
    } else {
      errorMessage = String(error);
    }
    return new Response(`The error is ${errorMessage}`, {
      status: 500,
    });
  }
};
