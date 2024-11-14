import React from "react";
import { FoodProvider } from "src/context/food-provider.client";
import type { FoodItemInput } from "src/types/FoodItem.client";
import FoodList from "./food-list.client";

interface FoodListContainerProps {
  items: Array<FoodItemInput>;
}

function FoodListContainer({
  items,
}: FoodListContainerProps): React.JSX.Element {
  return (
    <FoodProvider initialFoodItems={items}>
      <FoodList />
    </FoodProvider>
  );
}

export default FoodListContainer;
