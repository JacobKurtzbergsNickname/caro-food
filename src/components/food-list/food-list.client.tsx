import "src/styles/food-list.css";
import { formatDate } from "../../utils/formatDate.ts";
import { FaTrash } from "react-icons/fa";
import React, { useState } from "react";
import { makeFoodItem as m } from "../../utils/make-food-item.ts";
import { useLocalFood } from "src/context/food-provider.client";
import { EditButton } from "../edit-button/edit-button.tsx";
import RatingButtons from "../rating-buttons/rating-buttons.client.tsx";

function FoodList(): React.JSX.Element {
  const [currentItem, setCurrentItem] = useState<string>("");
  const { foodItems, addFoodItem, deleteFoodItem, editFoodItem } =
    useLocalFood();
  const size = foodItems.length;

  function handleAddFoodItem(): void {
    const newFoodItem = m(currentItem, size);
    addFoodItem(newFoodItem);
    setCurrentItem("");
  }

  return (
    <>
      <ul className="list-group">
        {foodItems.map((item, index) => (
          <li className="food-list" key={index}>
            <p className="no-margin">{`${item.name} wurde gegessen am ${formatDate(item.dateCreated)}`}</p>
            <div>
              <RatingButtons item={item} saveFunction={editFoodItem} />
              <EditButton item={item} saveFunction={editFoodItem} />
              <button
                className="btn btn-danger food-list-button"
                onClick={() => deleteFoodItem(item.localID)}
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
            onClick={() => handleAddFoodItem()}
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
