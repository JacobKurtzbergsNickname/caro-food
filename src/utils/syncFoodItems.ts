// src/utils/syncFoodItems.ts

import { fetchFoodItems } from "./fetchFoodItems.ts";
import type { FoodItem } from "../types/FoodItem";

declare var fetch: Window["fetch"];
declare var console: Console;

export async function syncFoodItems(
  localFoodItems: FoodItem[]
): Promise<FoodItem[]> {
  try {
    // Fetch food items from FaunaDB
    const faunaItems = await fetchFoodItems();
    console.log("Fauna items:", faunaItems);

    // Extract names of items from FaunaDB
    const faunaItemNames = faunaItems.map((item) => item.name);
    console.log("Fauna item names:", faunaItemNames);

    // Identify new items not present in FaunaDB
    const newItems = localFoodItems.filter(
      (item) => !faunaItemNames.includes(item.name)
    );

    // For each new item, send a POST request to create it in FaunaDB
    for (const item of newItems) {
      try {
        const response = await fetch("/api/createFoodItem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });

        const responseData = await response.json();
        console.log("Response from createFoodItem:", responseData);
      } catch (error) {
        console.error("Error creating food item:", error);
        // Optionally, handle individual item errors without stopping the loop
      }
    }

    console.log("Synchronization complete.");

    // Fetch the updated list from FaunaDB
    const updatedFaunaItems = await fetchFoodItems();
    console.log("Updated Fauna items:", updatedFaunaItems);

    return updatedFaunaItems;
  } catch (error) {
    console.error("Error in syncFoodItems:", error);
    throw error; // Re-throw the error so that the caller can handle it
  }
}
