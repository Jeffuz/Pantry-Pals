import React from 'react';
//import { Link } from 'react-router-dom';
import LoginComponent from "../components/login/LoginComponent";

export default function Login() {
    return (
        <div className="flex flex-col h-full w-full justify-center bg-orange-600/70">
            <div className="flex flex-col">
                {/* <h1>
                    <Link to="/">Pantry Pal</Link>
                </h1> */}

                <LoginComponent />
            </div>            
        </div>

    )
}