import React, { useEffect, useState } from 'react';
import './food-list.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { format } from '../utils/dateType';

interface FoodItem {
    name: string;
    dateCreated: Date;
}

function FoodList(): JSX.Element {
    const [foodItems, setFoodItems] = useState<Array<FoodItem>>(() => {
        const savedItems = window.localStorage.getItem('foodItems');
        return savedItems ? JSON.parse(savedItems) : [];
    });
    const [newFoodItem, setNewFoodItem] = useState<string>('');

    useEffect(() => {
        window.localStorage.setItem('foodItems', JSON.stringify(foodItems));
    }, [foodItems]);

    const deleteFoodItem = (index: number) => {
        const newFoodItems = foodItems.filter((item, i) => i !== index);
        setFoodItems(newFoodItems);
    };

    const editFoodItem = (index: number) => {
    };

    return (
        <>
            <ul className="list-group">
                {foodItems.map((item, index) => (
                    <li 
                        className="food-list"
                        key={index}>
                        <p className="no-margin">{`${item.name} wurde gegessen am ${format(item.dateCreated)}`}</p>
                        <div>
                            <button 
                                className="btn btn-primary food-list-button"
                                onClick={() => editFoodItem(index)}>
                                    <FaEdit />
                            </button>
                            <button 
                                className="btn btn-danger food-list-button"
                                onClick={() => deleteFoodItem(index)}>
                                    <FaTrash />
                            </button>
                        </div>
                    </li>
                ))}
                <li className="food-list">
                    <input 
                        type="text"
                        value={newFoodItem}
                        onChange={e => setNewFoodItem(e.target.value)}
                        placeholder="Add a new food item"
                        className="form-control"
                    />
                    <button 
                        className="btn btn-success food-list-button"
                        onClick={() => {
                            if (newFoodItem) {
                                setFoodItems([...foodItems, { name: newFoodItem, dateCreated: new Date() }]);
                                setNewFoodItem('');
                            }
                        }}>
                        Add
                    </button>
                </li>
            </ul>
            <p className="current-value"> {newFoodItem} </p>
        </>

    );
}

export default FoodList;