import type { FoodItemInput } from "src/types/FoodItem.client";

declare const localStorage: Storage;

export const toLS = <T>(key: string, items: Array<T>): Array<T> => {
  const local = localStorage.getItem(key);
  const parsed: Array<T> = local ? JSON.parse(local) : [];
  const newItems: Array<T> = [...parsed, ...items];
  localStorage.setItem(key, JSON.stringify(newItems));
  return newItems;
};

export const fromLS = <T>(key: string): Array<T> => {
  const local = localStorage.getItem(key);
  return local ? JSON.parse(local) : [];
};

export function getFoodItemsFromLS(): FoodItemInput[] {
  return fromLS<FoodItemInput>("foodItems");
}

export function setFoodItemsToLS(items: FoodItemInput[]): void {
  items = items.map((item, index) => ({ ...item, localID: index }));
  if (items.length === 0) {
    localStorage.removeItem("foodItems");
    return;
  }
  localStorage.setItem("foodItems", JSON.stringify(items));
}
