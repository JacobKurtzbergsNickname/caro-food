import type { FoodItem } from "~/types/FoodItem";

interface FaunaFoodItem {
  coll: string;
  id: string;
  ts: number;
  uuid: string;
  sequentialId: number;
  name: string;
  date: { isoString: string };
}

declare var console: Console;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isFaunaFoodItem(item: any): item is FaunaFoodItem {
  return (
    item &&
    Object.prototype.hasOwnProperty.call(item, "coll") &&
    Object.prototype.hasOwnProperty.call(item, "id") &&
    Object.prototype.hasOwnProperty.call(item, "ts") &&
    Object.prototype.hasOwnProperty.call(item, "name") &&
    Object.prototype.hasOwnProperty.call(item, "date")
  );
}

export function fromFaunaObjectToFoodItem(item: unknown): FoodItem {
  if (!isFaunaFoodItem(item)) {
    console.error("Invalid FaunaDB item:", item);
    return {} as FoodItem;
  }
  const foodItem: FoodItem = {
    id: item.id,
    uuid: item.uuid,
    sequentialId: item.sequentialId,
    name: item.name,
    dateCreated: new Date(item.date.isoString),
  };
  return foodItem;
}
