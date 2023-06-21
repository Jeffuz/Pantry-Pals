import './App.css';
import { SearchBar } from './SearchBar';
import RecipeComponent from './Components/RecipeComponent';
import RecipeSearchComponent from './Components/RecipeSearchComponent';
function App() {

  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar />
      <RecipeComponent/>
      <RecipeSearchComponent/>
    </div>
  );
}

export default App;
