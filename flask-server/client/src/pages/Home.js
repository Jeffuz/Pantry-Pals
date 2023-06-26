import React, { useEffect, useState } from 'react';
import { SearchBarComponent } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(() => {
        // Array of image URLs
        const imageUrls = [
            'https://wallpaperaccess.com/full/3086355.jpg',
            'https://wallpaperaccess.com/full/3086351.jpg',
        ];

        // Get the current date
        const currentDate = new Date(); // Example for testing data new Date(2023, 5, 26); 
        // Use the date to determine the index of the image to display
        const imageIndex = currentDate.getDate() % imageUrls.length;
        // Set the background image URL
        setBackgroundImage(imageUrls[imageIndex]);
    }, []);

    return (
        <div
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            {/* Log In Button */}
            <Link to="/login">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center absolute right-5 top-5">
                    Log In
                </button>
            </Link>

            <div className="static">
                <div className="static">
                    <p className="text-6xl text-gray-50 font-serif text-left">
                        Pantry <br /> Pal
                    </p>
                </div>
                <div className="inline-block">
                    <p className="text-1xl text-gray-50 font-serif">
                        Fresh Ideas, Straight from your Fridge
                    </p>
                </div>
            </div>

            {/* Search Bar */}
            <SearchBarComponent />
            {/* Log In Filter Search */}
            <Link to="/filter">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Filter Your Interest
                </button>
            </Link>
        </div>
    );
}
