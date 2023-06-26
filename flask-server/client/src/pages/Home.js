import { SearchBarComponent } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div class="h-screen
        bg-[url(https://wallpaperaccess.com/full/3086351.jpg)] 
        bg-cover bg-center">

            {/* Log In Button */}
            <Link to="/login">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded inline-flex items-center
                absolute right-5 top-5">
                    Log In
                </button>
            </Link>

            <div class="static">
                <div class="static">
                    <p className="text-6xl text-gray-50 font-serif text-left">
                        Pantry <br /> Pal
                    </p>
                </div>
                <div class="inline-block">
                    <p className="text-1xl text-gray-50 font-serif">Fresh Ideas, Straight from your Fridge</p>
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


    )
}