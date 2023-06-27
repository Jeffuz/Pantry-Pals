import React from 'react';
import { useLocation } from 'react-router-dom';

export function RecipeFilterResults() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const ingredients = searchParams.get('ingredients');
    const ingredientList = ingredients ? ingredients.split(',') : [];

    return (
        <div>
            <h1>Recipe Filter Results</h1>
            {ingredientList.length > 0 ? (
                <ul>
                    {ingredientList.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            ) : (
                <p>No ingredients selected</p>
            )}
        </div>
    );
}
