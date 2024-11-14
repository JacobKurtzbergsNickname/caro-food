import { getFoodItemsFromLS } from "src/utils";

export function saveJSON(): void {
  const foodItems = getFoodItemsFromLS();
  const dataStr = JSON.stringify(foodItems, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "food-items.json";
  link.click();

  URL.revokeObjectURL(url);
}
