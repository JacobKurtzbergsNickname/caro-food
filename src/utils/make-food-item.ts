import type { FoodItemInput } from "src/types/FoodItem.client";

export function makeFoodItem(food: string, id: number): FoodItemInput {
  return {
    name: food,
    dateCreated: new Date(),
    sequentialId: id,
  };
}
