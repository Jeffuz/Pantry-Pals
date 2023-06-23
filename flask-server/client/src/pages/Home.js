//import { SearchBarComponent } from '../Components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div>
            <h1>Pantry Pal</h1>
            <h3>Fresh Ideas, Straight from your Fridge</h3>
            {/* Search Bar */}
            {/* <SearchBarComponent /> */}
            {/* Log In Filter Search */}
            <Link to="/filter">
                <button>Filter Your Interest</button>
            </Link>

            {/* Log In Button */}
            <Link to="/login">
                <button>Log In</button>
            </Link>
        </div>
    )
}