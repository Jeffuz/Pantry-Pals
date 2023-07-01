import React from 'react';
import { Link } from 'react-router-dom';
import LoginComponent from "../components/login/LoginComponent";

export default function Login() {
    return (
        <div>
            <h1>
                <Link to="/">Pantry Pal</Link>
            </h1>
            <LoginComponent />
        </div>
    )
}