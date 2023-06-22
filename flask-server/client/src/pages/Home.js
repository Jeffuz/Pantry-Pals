import { SearchBarComponent } from '../components/SearchBar';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>Pantry Pal</h1>
            <h3>Fresh Ideas, Straight from your Fridge</h3>
            {/* Search Bar */}
            <SearchBarComponent />

            {/* Log In Button */}
            <Link to="/login">
                <button>Log In</button>
            </Link>
        </>
    )
}