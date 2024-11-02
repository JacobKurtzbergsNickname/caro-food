import "./food-list.css";
import { formatDate } from "../utils/formatDate.ts";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
  toFoodItemsMongo,
  prepare,
  type FoodItemInput,
  type FoodItemsInput,
  type FoodItemsMongo,
} from "../types/FoodItem.ts";
import { fromLS, toLS } from "../utils/syncLS.ts";

declare const console: Console;
declare const setInterval: (callback: () => void, ms: number) => number;
declare const clearInterval: (intervalId: number) => void;

const FOOD_ITEMS = "foodItems";

const makeFoodItem = (food: string, id: number): FoodItemInput => {
  return {
    name: food,
    dateCreated: new Date(),
    sequentialId: id,
  };
};

function FoodList(): React.JSX.Element {
  const [currentItem, setCurrentItem] = useState<string>("");
  const [foodItems, setFoodItems] = useState<Array<FoodItemInput>>([]);

  // Initial load of the food items in local storage
  useEffect(() => {
    setFoodItems((currentItems) =>
      toLS<FoodItemInput>(FOOD_ITEMS, currentItems)
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const localItems = fromLS<FoodItemInput>(FOOD_ITEMS);
      if (localItems.length > 0) {
        const mongo = prepare<FoodItemsInput, FoodItemsMongo>(
          localItems,
          toFoodItemsMongo
        );
        console.log({ mongo });
      }
    }, 6000);
    return (): void => clearInterval(interval);
  }, []);

  const deleteFoodItem = (index: number): void => {
    console.log("deleteFoodItem", index);
  };

  const editFoodItem = (index: number): void => {
    console.log("editFoodItem", index);
  };

  const addNewFoodItem = (): void => {
    if (currentItem) {
      setFoodItems((items) =>
        toLS<FoodItemInput>(FOOD_ITEMS, [
          ...items,
          makeFoodItem(currentItem, foodItems.length),
        ])
      );

      setCurrentItem("");
    }
  };

  return (
    <>
      <ul className="list-group">
        {foodItems.map((item, index) => (
          <li className="food-list" key={index}>
            <p className="no-margin">{`${item.name} wurde gegessen am ${formatDate(item.dateCreated)}`}</p>
            <div>
              <button
                className="btn btn-primary food-list-button"
                onClick={() => editFoodItem(index)}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-danger food-list-button"
                onClick={() => deleteFoodItem(index)}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
        <li className="food-list">
          <input
            type="text"
            value={currentItem}
            onChange={(e) => setCurrentItem(e.target.value)}
            placeholder="Add a new food item"
            className="form-control"
          />
          <button
            className="btn btn-success food-list-button"
            onClick={() => addNewFoodItem()}
          >
            Add
          </button>
        </li>
      </ul>
      <p className="current-value"> {currentItem} </p>
    </>
  );
}

export default FoodList;
