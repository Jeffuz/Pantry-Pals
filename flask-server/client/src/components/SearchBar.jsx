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
                    class="border-none bg-white px-5 py-1 pr-16 rounded text-sm focus:outline-none"
                    placeholder="Search"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-0.5 px-2 rounded inline-flex items-center" type="submit">Search</button>
                
            </form>
        </div>
    );
}
