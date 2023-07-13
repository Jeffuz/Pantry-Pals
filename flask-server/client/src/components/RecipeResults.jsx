import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import BookmarkButton from './BookmarkButton';

export function RecipeResults() {
    const location = useLocation();
    const { searchResults } = location.state || {};
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 50;

    // Calculate the index range of recipes to display on the current page
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = searchResults.slice(indexOfFirstRecipe, indexOfLastRecipe);

    // Function to handle next page navigation
    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Function to handle previous page navigation
    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    // Scroll to the top when navigating to the next page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage]);

    return (
        <div>
            <h1>Recipe Results</h1>
            {currentRecipes.length > 0 ? (
                <div>
                    {currentRecipes.map((recipe, index) => (
                        <div className="flex">
                            <Link key={index} to={`/recipe/${encodeURIComponent(recipe.title)}`}>
                                <div>
                                    <h3>{recipe.title}</h3>
                                </div>
                            </Link>
                            <BookmarkButton recipeName={recipe.title}/>
                        </div>
                    ))}
                    
                    <div>
                        {currentPage > 1 && (
                            <button onClick={prevPage}>Previous</button>
                        )}
                        {currentRecipes.length === recipesPerPage && (
                            <button onClick={nextPage}>Next</button>
                        )}
                    </div>
                </div>
            ) : (
                <p>No recipes found</p>
            )}
        </div>
    );
}
