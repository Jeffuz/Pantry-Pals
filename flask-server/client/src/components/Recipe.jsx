import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        // Make the API call to fetch the recipe details based on the provided title
        fetch(`http://localhost:5000/recipe/${encodeURIComponent(id)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the response contains the recipe details in the "recipe" field
                const recipeDetails = data.recipe;
                setRecipe(recipeDetails);
            })
            .catch(error => {
                // Handle any errors that occur during the API call
                console.error(error);
            });
    }, [id]);

    if (recipe === null) {
        return <p>Loading recipe details...</p>;
    }

    const { title, ingredients, instructions } = recipe;

    return (
        <div>
            <h1>{title}</h1>
            <h3>Ingredients:</h3>
            <ul>
                {ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h3>Instructions:</h3>
            <p>{instructions}</p>
        </div>
    );
}
