import React from 'react';
import { useLocation } from 'react-router-dom';

export function RecipeResults() {
  const location = useLocation();
  const { searchResults } = location.state || {};

  return (
    <div>
      {searchResults && searchResults.length > 0 ? (
        <div>
          {searchResults.map((recipe, index) => (
            <div key={index}>
              <p>{recipe.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No recipes found</p>
      )}
    </div>
  );
}
