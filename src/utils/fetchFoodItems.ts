// src/utils/fetchFoodItems.ts
import type { FoodItem } from "../types/FoodItem.ts";
import { fromFaunaObjectToFoodItem } from "./fromFaunaObjectToFoodItem.ts";

declare var fetch: Window["fetch"];
declare var console: Console;

export async function fetchFoodItems(): Promise<FoodItem[]> {
  try {
    const response = await fetch("/api/getAllFoodItems");
    const data = await response.json();

    // Adjust the data extraction based on your API response structure
    const items = data.data?.data || [];
    // Here, we need to transform the data to match the FoodItem type
    const foodItems: FoodItem[] = items.map((item: unknown) =>
      fromFaunaObjectToFoodItem(item)
    );
    console.log("Food items:", foodItems);
    return foodItems;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  }
}
