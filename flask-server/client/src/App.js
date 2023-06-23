import './App.css';

import RecipeSearchComponent from './Components/RecipeSearchComponent';
import LoginComponent from './Components/login/LoginComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import RecipeResult from './pages/RecipeResult'
import NoPage from './pages/NoPage'

function App() {

  return (
    <div>
      <LoginComponent/>
    
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
