import React, { useEffect, useState } from "react";
import { FaRegHandSpock, FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";
import {
  Rating,
  type FoodItemInput,
  type Ratings,
} from "src/types/FoodItem.client";

const chosenRating = "btn btn-success food-list-button";
const otherRating = "btn btn-secondary food-list-button";

function getRatingClass(rating: Ratings): Array<string> {
  const thumbsUp = rating === Rating.Good ? chosenRating : otherRating;
  const thumbsDown = rating === Rating.Bad ? chosenRating : otherRating;
  const handSpock = rating === Rating.Neutral ? chosenRating : otherRating;

  return [thumbsUp, handSpock, thumbsDown];
}

interface RatingButtonsProps {
  item: FoodItemInput;
  saveFunction: (id: number, item: Partial<FoodItemInput>) => void;
}

function RatingButtons({
  item,
  saveFunction,
}: RatingButtonsProps): React.JSX.Element {
  const [currentRating, setCurrentRating] = useState(item.rating);
  const [thumbsUp, handSpock, thumbsDown] = getRatingClass(currentRating);

  useEffect(() => {
    saveFunction(item.localID, { ...item, rating: currentRating });
  }, [currentRating]);

  return (
    <>
      <button
        className={thumbsUp}
        onClick={() => setCurrentRating(Rating.Good)}
      >
        <FaRegThumbsUp />
      </button>
      <button
        className={handSpock}
        onClick={() => setCurrentRating(Rating.Neutral)}
      >
        <FaRegHandSpock />
      </button>
      <button
        className={thumbsDown}
        onClick={() => setCurrentRating(Rating.Bad)}
      >
        <FaRegThumbsDown />
      </button>
    </>
  );
}

export default RatingButtons;
