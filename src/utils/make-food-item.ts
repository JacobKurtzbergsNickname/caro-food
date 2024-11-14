import type { FoodItemInput } from "src/types/FoodItem.client";

export function makeFoodItem(food: string, id: number): FoodItemInput {
  return {
    _id: "",
    name: food,
    dateCreated: new Date(),
    localID: id,
    rating: ":|",
  };
}
