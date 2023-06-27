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
                <div class='flex space-x-4'>
                    <input
                        class="transition duration-200 delay-100 bg-gray-200 hover:bg-gray-100 border-none w-96 px-14 py-2 pr-20 rounded text-sm focus:outline-none"
                        placeholder="Enter You Food here!"
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <button className="transition duration-200 delay-100 bg-gray-500 hover:bg-gray-300 text-gray-100  hover:text-gray-800 px-2 rounded inline-flex items-center" type="submit">
                        <p className="font-serif">
                            Search
                        </p>
                    </button>

                </div>
            </form>
        </div>
    );
}
