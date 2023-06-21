import './App.css';

//import RecipeComponent from './components/RecipeComponent';
// import RecipeSearchComponent from './components/RecipeSearchComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RecipeResult from './pages/RecipeResult'
import NoPage from './pages/NoPage'

function App() {

  return (
    <div>
          
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
