import React from 'react';
import { Link } from 'react-router-dom';
import { FilterComponent } from "../components/RecipeFilter";


export default function Filter() {
    return (
        <div>
            <h1>
                <Link to="/">Enter your ingredients here and press enter.</Link>
            </h1>
            <FilterComponent/>
        </div>
    );
}

