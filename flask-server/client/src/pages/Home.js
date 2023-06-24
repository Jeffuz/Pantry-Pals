import { SearchBarComponent } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div class="h-screen bg-lime-900">
            {/* <div class="h-screen bg-gradient-to-r from-cyan-500 to-blue-500"></div> */}

            <div class="items-center">
                <p className="text-6xl text-gray-50 font-serif text-right">
                    Pantry <br /> Pal
                </p>
                <p className="text-1xl text-gray-50 font-serif">Fresh Ideas, Straight from your Fridge</p>
            </div>
            {/* Search Bar */}
            <SearchBarComponent />
            {/* Log In Filter Search */}
            <Link to="/filter">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Filter Your Interest
                </button>
            </Link>

            {/* Log In Button */}
            <Link to="/login">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                    Log In
                    </button>
            </Link>
        </div>
    )
}