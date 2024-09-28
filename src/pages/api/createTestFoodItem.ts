// src/pages/api/createFoodItem.ts
import type { APIRoute } from "astro";
import { fql, type Client } from "fauna";
import container from "~/inversify.config";
import type { FoodItem } from "~/types/FoodItem";
import { randomUUID } from "crypto";

declare var console: Console;

export const POST: APIRoute = async ({ request }) => {
  try {
    const faunaClient = container.get<Client>("FaunaClient");
    console.log("Request Body:", request);

    // Log request headers
    console.log("Request Headers:", [...request.headers.entries()]);

    // Read the request body as text
    const bodyText = await request.text();
    console.log("Request Body Text:", bodyText);

    // Parse the request body
    const requestBody = JSON.parse(bodyText);

    // Validate and construct the FoodItem object
    const newFoodItem: FoodItem = {
      uuid: randomUUID(),
      sequentialId: requestBody.sequentialId ?? 0, // Default to 0 if not provided
      name: requestBody.name ?? "Test Food Item", // Default name for testing
      dateCreated: new Date(), // Current date
    };

    // Construct the FQL query to insert the new item
    const createFoodItemQuery = fql<FoodItem>`
      FoodItems.create(${newFoodItem})
    `;

    // Execute the query
    const createdFoodItem =
      await faunaClient.query<FoodItem>(createFoodItemQuery);

    // Return the created item as JSON
    return new Response(JSON.stringify(createdFoodItem), {
      headers: { "Content-Type": "application/json" },
      status: 201, // 201 Created
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
