import React from 'react';
import { Link } from 'react-router-dom';
import { RecipeResults } from "../components/RecipeResults"


export default function RecipeResult() {
    return (
        <>
            <h1>
                <Link to="/">Pantry Pal</Link>
            </h1>
            <RecipeResults />
        </>
    )
}