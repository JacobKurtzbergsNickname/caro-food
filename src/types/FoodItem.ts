export interface FoodItem {
  id: string;
  uuid: string;
  sequentialId: number;
  name: string;
  dateCreated: Date;
}

export type FoodItemInput = Omit<FoodItem, "uuid" | "id">;
