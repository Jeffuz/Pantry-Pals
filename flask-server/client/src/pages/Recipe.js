import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeDetails } from '../components/RecipeDetails';

export default function Recipe() {
    return (
        <div>
            <h1>
                <Link to="/">Pantry Pal</Link>
            </h1>
            <RecipeDetails />
        </div>
    );
}


