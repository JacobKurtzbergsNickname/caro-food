import type { APIRoute } from "astro";
import { fql, Client } from "fauna";
import container from "~/inversify.config";
import type { FoodItem } from "~/types/FoodItem";

declare var console: Console;

export const POST: APIRoute = async ({ request }) => {
  try {
    const faunaClient = container.get<Client>("FaunaClient");
    const requestBody = await request.json();
    const newFoodItem: Omit<FoodItem, "uuid"> = {
      name: requestBody.name,
      sequentialId: requestBody.sequentialId,
      dateCreated: new Date(),
    };

    // Construct and execute the FQL query to insert the new item
    const createdFoodItem = await faunaClient.query<FoodItem>(
      fql<FoodItem>`FoodItems.create(${newFoodItem})`
    );

    // Return the created item as JSON
    return new Response(JSON.stringify(createdFoodItem), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    } else {
      console.error("Unknown error");
      return new Response(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
      });
    }
  }
};
