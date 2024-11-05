import "src/styles/food-list.css";
import { formatDate } from "../../utils/formatDate.ts";
import { FaEdit, FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { type FoodItemInput } from "../../types/FoodItem.client.ts";
import { makeFoodItem as m } from "../../utils/make-food-item.ts";

declare const alert: (message: string) => void;

interface FoodListProps {
  existingItems?: Array<FoodItemInput>;
}

function FoodList({ existingItems }: FoodListProps): React.JSX.Element {
  const [currentItem, setCurrentItem] = useState<string>("");
  const [foodItems, setFoodItems] = useState<Array<FoodItemInput>>(
    existingItems || []
  );
  const size = foodItems.length;

  const addNewFoodItem = (): void => {
    if (currentItem) {
      const newFoodItem = m(currentItem, size);
      setFoodItems((currentItems) => [...currentItems, newFoodItem]);
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
                onClick={() => alert("Edit")}
              >
                <FaEdit />
              </button>
              <button
                className="btn btn-danger food-list-button"
                onClick={() => alert("Delete")}
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
