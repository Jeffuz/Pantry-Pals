import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function FilterComponent() {
    const [ingredients, setIngredients] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    function handleInputChange(event) {
        const { value } = event.target;
        setInputValue(value);
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            // Remove the trailing enter character and add the ingredient to the list
            const ingredient = inputValue.trim();
            if (ingredient !== '') {
                setIngredients(prevIngredients => [...prevIngredients, ingredient]);
            }

            // Reset the input value
            setInputValue('');
        }
    }

    function handleDeleteIngredient(index) {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    }

    function handleSearchRecipes() {
        navigate(`/filter_result?ingredients=${ingredients.join(',')}`);
    }


    return (
        <div>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter ingredients and press Enter"
            />

            <h3>Selected Ingredients:</h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>
                        {ingredient}
                        <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
                    </li>
                ))}
            </ul>

            {/* <div>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div> */}
            <button onClick={handleSearchRecipes}>Search Recipes</button>
        </div>
    );
}











