import React from 'react';
import { Link } from 'react-router-dom';
import { FilterComponent } from "../components/RecipeFilter";


export default function Filter() {
    return (
        <div>
            <h1>
                <Link to="/">Pantry Pal</Link>
            </h1>
            <FilterComponent/>
        </div>
    );
}

