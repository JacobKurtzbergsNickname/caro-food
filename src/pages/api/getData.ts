import type { APIRoute } from "astro";
import { fql, type Client } from "fauna";
import container from "~/inversify.config";

declare var console: Console;
export const GET: APIRoute = async () => {
  try {
    const client = container.get<Client>("FaunaClient");
    const testQuery = fql`
      1 + 1
    `;
    const result = await client.query<number>(testQuery);
    console.log("Test Query Result:", result); // Should log 2

    const foodCollection = "FoodItems";

    // Query to check if the collection exists
    const collectionExistsQuery = fql<boolean>`
      Collection.exists("${foodCollection}")
    `;

    const collectionExists = await client.query<boolean>(collectionExistsQuery);
    console.log("Collection Exists:", collectionExists);

    return new Response(JSON.stringify("result"), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
    });
  }
};
