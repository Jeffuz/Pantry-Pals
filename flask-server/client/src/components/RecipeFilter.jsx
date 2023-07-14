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
            {/* <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Enter ingredients and press Enter"
            /> */}
            <div className='flex ml-3 space-x-4'>
                <input
                    className="transition duration-200 delay-100 bg-gray-200 hover:bg-gray-100 border-none w-96 px-14 py-2 pr-20 rounded text-sm focus:outline-none"
                    value={inputValue}
                    type="text"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="transition duration-200 delay-100 bg-gray-500 hover:bg-gray-300 text-gray-100  hover:text-gray-800 px-2 rounded inline-flex items-center" onClick={handleSearchRecipes}>
                    <p className="font-serif">
                        Search
                    </p>
                </button>
            </div>

            <h3>Selected Ingredients:</h3>
            <div class="ml-3 w-4/5 flex flex-wrap
                        content-start">
                {ingredients.map((ingredient, index) => (
                    <div class="pr-4 pb-4">
                        <button class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">
                            {ingredient}
                        </button>
                        <button onClick={() => handleDeleteIngredient(index)} 
                                class="bg-gray-300 hover:bg-red-200 text-gray-800 font-bold py-2 px-4 rounded-r">
                            Delete
                        </button>

                    </div>
                ))}
            </div>

            {/* <div>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            </div> */}
            {/* <button onClick={handleSearchRecipes}>Search Recipes</button> */}
        </div>
    );
}











