export interface FoodItem {
  _id: string;
  localID: number;
  name: string;
  dateCreated: Date;
}

export type FoodItemInput = Omit<FoodItem, "uuid">;

export type FoodItems = Array<FoodItem>;
export type FoodItemsInput = Array<FoodItemInput>;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export function prepare<T, K>(entity: T, transform: (input: T) => K): K {
  return transform(entity);
}
