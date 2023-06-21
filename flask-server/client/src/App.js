import './App.css';

import RecipeComponent from './Components/RecipeComponent';
import RecipeSearchComponent from './Components/RecipeSearchComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RecipeResult from './pages/RecipeResult'
import NoPage from './pages/NoPage'

function App() {

  return (
    <div>
      <h1>Recipe Search</h1>
      <SearchBar />
      <RecipeSearchComponent/>
    
    
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home />} />
          <Route path="/login" element = {<Login />} />
          <Route path="/recipe_result" element = {<RecipeResult />} />
          <Route path="*" element = {<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
