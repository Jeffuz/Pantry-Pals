import React, { useState, useEffect } from 'react';

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const resultsPerPage = 20; // Number of results to display per page

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/recipe?title=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to retrieve search results');
      }
      const data = await response.json();
      setSearchResults(data.recipe);
      setCurrentPage(1); // Reset current page to 1 when new search results are received
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Scroll to the top of the page when the current page changes
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Calculate the index range of the recipes to display for the current page
  const indexOfLastRecipe = currentPage * resultsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - resultsPerPage;
  const currentRecipes = searchResults.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // Handle next page button click
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Handle previous page button click
  const previousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        {currentRecipes.map((recipe, index) => (
          <div key={index}>
            <h3>{recipe.title}</h3>
            <p>Ingredients:</p>
            <ul>
              {recipe.ingredients.map((ingredient, i) => (
                ingredient.trim() !== '' && <li key={i}>{ingredient}</li>
              ))}
            </ul>
            <p>Instructions: {recipe.instructions}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div>
        {searchResults.length > resultsPerPage && (
          <div>
            <button onClick={previousPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            
            <button
              onClick={nextPage}
              disabled={indexOfLastRecipe >= searchResults.length}
            >
              Next Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
