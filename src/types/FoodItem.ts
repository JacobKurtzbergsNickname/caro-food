import type { ObjectId } from "mongodb";

export interface FoodItem {
  sequentialId: number;
  name: string;
  dateCreated: Date;
}

export type FoodItemInput = Omit<FoodItem, "uuid">;
export interface FoodItemMongo extends FoodItem {
  _id?: ObjectId;
}

export type FoodItems = Array<FoodItem>;
export type FoodItemsInput = Array<FoodItemInput>;
export type FoodItemsMongo = Array<FoodItemMongo>;

export type UUID = `${string}-${string}-${string}-${string}-${string}`;

export function prepare<T, K>(entity: T, transform: (input: T) => K): K {
  return transform(entity);
}

export function mongoTransform<T>(item: T): T & { _id?: ObjectId } {
  const { ...rest } = item;

  const mongoObject = { ...rest, _id: null };
  return mongoObject as T & { _id?: ObjectId };
}

export function toFoodItemMongo(item: FoodItemInput): FoodItemMongo {
  return mongoTransform(item);
}

export function toFoodItemsMongo(items: FoodItemsInput): FoodItemsMongo {
  return items.map((item) => toFoodItemMongo(item));
}
