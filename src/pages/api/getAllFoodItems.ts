import type { APIRoute } from "astro";
import { fql, type Client } from "fauna";
import container from "~/inversify.config";

interface FoodItem {
  name: string;
  date: Date;
}

declare var console: Console;

export const GET: APIRoute = async () => {
  try {
    const faunaClient = container.get<Client>("FaunaClient");
    const foodItemsQuery = fql<Array<FoodItem>>`FoodItems.all()`;
    const allFoodItems =
      await faunaClient.query<Array<FoodItem>>(foodItemsQuery);
    return new Response(JSON.stringify(allFoodItems), {
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
