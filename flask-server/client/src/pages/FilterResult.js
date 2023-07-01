import React from 'react';
import { Link } from 'react-router-dom';
import { FilterResults } from "../components/RecipeFilterResults";

export default function FilterResult() {
    return (
        <div>
            <h1>
                <Link to="/">Pantry Pal</Link>
            </h1>
            <FilterResults/>
        </div>
    );
}
