import React, { useEffect, useState } from 'react';
import { SearchBarComponent } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    const [backgroundImage, setBackgroundImage] = useState('');
    
    useEffect(() => {
        // Array of image URLs
        const imageUrls = [
            'https://wallpaperaccess.com/full/2006082.jpg',
            'https://wallpaperaccess.com/full/5558768.jpg',
            'https://wallpaperaccess.com/full/5558767.jpg',
        ];

        // Get the current date
        const currentDate = new Date(); // Example for testing data new Date(2023, 5, 26); 
        // Use the date to determine the index of the image to display
        const imageIndex = currentDate.getDate() % imageUrls.length;
        // Set the background image URL
        setBackgroundImage(imageUrls[imageIndex]);
    }, []);

    return (
        <div className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Log In Button */}
            <Link to="/login">
                <button className="transition duration-200 delay-100 bg-gray-300 hover:bg-gray-500 text-gray-800  hover:text-gray-100 font-bold py-1 px-4 rounded inline-flex items-center absolute right-5 top-5">
                    <p className="font-serif">
                        Log In
                    </p>
                </button>
            </Link>

            <div className="ml-10 absolute top-14">
                <div className="mt-14">
                    <p className="text-8xl text-gray-50 font-serif text-left">
                        Pantry

                    </p>
                    <div className="mt-5 flex space-x-4">
                        <p className="text-8xl text-gray-50 font-serif text-left">
                            Pals
                        </p>
                        <p className="text-2xl text-gray-50 font-serif mt-7">
                            Fresh Ideas, <br /> Straight from your Fridge.
                        </p>
                    </div>
                </div>

                <div className="mt-5 flex space-x-4">
                    {/* Search Bar */}
                    <SearchBarComponent />
                    {/* Log In Filter Search */}
                    <Link to="/filter">
                        <button className="transition duration-200 delay-100 bg-gray-500 hover:bg-gray-300  hover:text-gray-800  text-gray-100 py-1.5 px-4 rounded inline-flex items-center">
                            <p className="font-serif">
                                Filter Your Interests
                            </p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
