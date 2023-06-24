import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export function SearchBarComponent() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Handle Search Submit
    const handleSearchSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/recipe?title=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Failed to retrieve search results');
            }
            const data = await response.json();
            navigate('/recipe_result', { state: { searchResults: data.recipe } });
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <form onSubmit={handleSearchSubmit} autoComplete="off">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button type="submit">Search</button>
                <button type="submit" class="absolute right-0 top-0 mt-5 mr-4"></button>
            </form>
        </div>
    );
}
