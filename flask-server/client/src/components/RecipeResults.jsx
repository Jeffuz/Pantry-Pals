import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export function RecipeResults() {
    const location = useLocation();
    const { searchResults } = location.state || {};

    return (
        <div>
            <h1>Recipe Results</h1>
            {searchResults && searchResults.length > 0 ? (
                <div>
                    {searchResults.map((recipe, index) => (
                        <Link key={index} to={`/recipe/${encodeURIComponent(recipe.title)}`}>
                            <div>
                                <h3>{recipe.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No recipes found</p>
            )}
        </div>
    );
}
