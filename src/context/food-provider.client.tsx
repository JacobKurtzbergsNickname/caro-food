// src/contexts/FoodContext.client.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { FoodItemInput } from "src/types/FoodItem.client";
import { getFoodItemsFromLS, setFoodItemsToLS } from "src/utils";

// Define the shape of the context
interface FoodContextType {
  foodItems: FoodItemInput[];
  addFoodItem: (item: FoodItemInput) => void;
  deleteFoodItem: (id: number) => void;
  editFoodItem: (id: number, updatedItem: Partial<FoodItemInput>) => void;
}

// Create the context with a default value
export const FoodContext = createContext<FoodContextType | undefined>(
  undefined
);

// Provider component
interface FoodProviderProps {
  initialFoodItems: FoodItemInput[];
  children: ReactNode;
}

function toFoodItemInput(item: FoodItemInput, index: number): FoodItemInput {
  return {
    localID: item.localID ?? index,
    name: item.name ?? "",
    dateCreated: item.dateCreated ?? new Date(),
    rating: item.rating ?? ":|",
    _id: item._id ?? "",
  };
}

export const FoodProvider: React.FC<FoodProviderProps> = ({
  initialFoodItems,
  children,
}) => {
  const [foodItems, setFoodItems] = useState<FoodItemInput[]>(initialFoodItems);

  useEffect(() => {
    // Fetch data from localStorage
    setFoodItems(getFoodItemsFromLS().map(toFoodItemInput));
  }, [initialFoodItems]);

  useEffect(() => {
    // Send data to localStorage
    setFoodItemsToLS(foodItems);
  }, [foodItems]);

  function addFoodItem(item: FoodItemInput): void {
    setFoodItems((prev) => [...prev, item]);
  }

  function deleteFoodItem(id: number): void {
    setFoodItems((prev) => prev.filter((item) => item.localID !== id));
  }

  function editFoodItem(id: number, updatedItem: Partial<FoodItemInput>): void {
    setFoodItems((prev) =>
      prev.map((item) =>
        item.localID === id ? { ...item, ...updatedItem } : item
      )
    );
  }

  return (
    <FoodContext.Provider
      value={{ foodItems, addFoodItem, deleteFoodItem, editFoodItem }}
    >
      {children}
    </FoodContext.Provider>
  );
};

// Custom hook for consuming the context
export const useLocalFood = (): FoodContextType => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
