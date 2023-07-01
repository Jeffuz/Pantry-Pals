import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';


export function FilterResults() {
    const location = useLocation();
    const [recipeTitles, setRecipeTitles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Retrieve the ingredients from the URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const ingredients = searchParams.get('ingredients');

        setIsLoading(true);

        // Make the API call to fetch the filtered recipes for the current page
        fetch(`http://localhost:5000/filter?ingredients=${ingredients}&page=${currentPage}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch filtered recipes');
                }
                return response.json();
            })
            .then(data => {
                // Assuming the response contains an array of recipes in the "recipe" field
                const filteredRecipes = data.recipe || []; // Handle empty or undefined response
                const titles = filteredRecipes.map(recipe => recipe.title);
                setRecipeTitles(titles);
                setTotalPages(data.totalPages || 1);
                setIsLoading(false);
            })
            .catch(error => {
                // Handle any errors that occur during the API call
                console.error(error);
                setIsLoading(false);
            });
    }, [location.search, currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div>
            <h3>Filtered Recipe Titles:</h3>
            {isLoading ? (
                <p>Looking into our pantry...</p>
            ) : recipeTitles.length === 0 ? (
                <p>No recipes found</p>
            ) : (
                <div>
                    <ul>
                        {recipeTitles.map((title, index) => (
                            <li key={index}>
                                <Link to={`/recipe/${encodeURIComponent(title)}`}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                    <div>
                        {currentPage > 1 && (
                            <button onClick={handlePreviousPage}>Previous</button>
                        )}
                        {currentPage < totalPages && (
                            <button onClick={handleNextPage}>Next</button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
