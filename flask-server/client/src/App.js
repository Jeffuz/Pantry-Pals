import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RecipeResult from './pages/RecipeResult'
import Recipe from './pages/Recipe'
import Filter from './pages/Filter'
import NoPage from './pages/NoPage'
import FilterResult from './pages/FilterResult';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/recipe_result" element={<RecipeResult />} />
          <Route path="/recipe/:id" element={<Recipe />} />
          <Route path="/filter_result" element={<FilterResult />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
