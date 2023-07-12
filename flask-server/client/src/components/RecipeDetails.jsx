import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';

export function RecipeDetails() {
    const { id } = useParams(); // Access the recipe ID from the URL parameter
    const [recipe, setRecipe] = useState(null); // State to store the recipe data
    console.log(id);
    
    useEffect(() => {
        // Fetch the recipe data from the backend API
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/recipe/${id}`);
                const data = await response.json();
                setRecipe(data.recipe); // Store the fetched recipe data in state
            } catch (error) {
                console.log(error);
            }
        };

        fetchRecipe();
    }, [id]);

    const renderInstructions = () => {
        if (recipe && recipe.instructions) {
            const sentences = recipe.instructions.split('.'); // Split instructions into sentences
            return (
                <ul>
                    {sentences
                        .filter((sentence) => sentence.trim() !== '') // Exclude empty or false sentences
                        .map((sentence, index) => (
                            <li key={index}>{sentence}</li>
                        ))}
                </ul>
            );
        }
        return null;
    };

    return (
        <div>
            {recipe ? ( // Check if recipe data exists
                <div>
                    <h2>{recipe.title}</h2>

                    <p>Ingredients:</p>
                    <ul>
                        {recipe.ingredients && recipe.ingredients.length > 0 ? ( // Check if ingredients exist and not empty
                            recipe.ingredients
                                .filter((ingredient) => ingredient.trim() !== '') // Exclude empty or false ingredients
                                .map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))
                        ) : (
                            <li>No ingredients found</li> // Display a message if no ingredients found
                        )}
                    </ul>

                    <p>Instructions:</p>
                    {renderInstructions()}
                    <BookmarkButton recipeName={recipe.title}/>
                </div>
            ) : (
                <p>Loading recipe...</p> // Display a loading message while fetching the recipe
            )}
        </div>
    );
}
