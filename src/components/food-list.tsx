import "./food-list.css";
import { formatDate } from "../utils/formatDate.ts";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import type { FoodItem, FoodItemInput } from "~/types/FoodItem";
import { syncFoodItems } from "../utils/syncFoodItems.ts";

declare var window: Window;
declare var localStorage: Window["localStorage"];
declare var console: Console;

function FoodList(): React.JSX.Element {
  const [foodItems, setFoodItems] = useState<Array<FoodItemInput>>(() => {
    const savedItems = window.localStorage.getItem("foodItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [newFoodItem, setNewFoodItem] = useState<string>("");

  useEffect(() => {
    const itemsFromLocalStorage = localStorage.getItem("foodItems");
    const localFoodItems: FoodItem[] = itemsFromLocalStorage
      ? JSON.parse(itemsFromLocalStorage)
      : [];

    // Call the async function and handle the returned merged array
    syncFoodItems(localFoodItems)
      .then((mergedItems) => {
        // Update state with the merged array
        setFoodItems(mergedItems);
        mergedItems.forEach((item) => {
          console.log("Item:", item);
          Object.keys(item).forEach((key) => {
            if (key === "dateCreated") {
              console.log(item[key]);
            }
          });
        });
      })
      .catch((err) => {
        console.error("Error in synchronization:", err);
      });
  }, []);

  useEffect(() => {
    window.localStorage.setItem("foodItems", JSON.stringify(foodItems));
  }, [foodItems]);

  const deleteFoodItem = (index: number): void => {
    const newFoodItems = foodItems.filter((_, i) => i !== index);
    setFoodItems([...newFoodItems]);
  };

  const editFoodItem = (index: number): void => {
    const newName = window.prompt("Edit the food item", foodItems[index].name);
    if (newName) {
      const newFoodItems = [...foodItems];
      newFoodItems[index] = { ...newFoodItems[index], name: newName };
      setFoodItems(newFoodItems);
    }
  };

  const addNewFoodItem = (): void => {
    if (newFoodItem) {
      setFoodItems([
        ...foodItems,
        {
          name: newFoodItem,
          sequentialId: foodItems.length,
          dateCreated: new Date(),
        },
      ]);
      setNewFoodItem("");
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
            value={newFoodItem}
            onChange={(e) => setNewFoodItem(e.target.value)}
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
      <p className="current-value"> {newFoodItem} </p>
    </>
  );
}

export default FoodList;
