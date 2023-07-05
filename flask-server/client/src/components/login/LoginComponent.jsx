import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

export default function LoginComponent() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = getToken();
  const navigate = useNavigate();

  // Debugging
  console.log("token", token);
  if(token) {
    console.log("logged in as", token);
  }
  else {
    console.log("Need to log in");
  }
  //End of Debug

  function clearSessionData() {
    sessionStorage.clear();
  }
  // Fetch data from database with username and password
  async function loginUser(credentials) {
    return fetch(`http://localhost:5000/login?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
   }

  const handleLogin = async(event) => {
    event.preventDefault();

    console.log(username, password);
    const token = await loginUser({
      username,
      password
    });
    const data = await token.json();

    // Data Received can set state
    console.log("token=", data);

    if(data.id !== '') { // Login Success
      console.log("Logged in", data.id);
      sessionStorage.setItem('token', data.id);
      // Return back to home / prior tab
      navigate(-1);
    }
    else {// Failed Login
      setErrorMessage("Incorrect Username or Password");
    }

  }

  return(
    <div class="flex p-11 mx-auto my-auto shadow-lg shadow-cyan-600/50 rounded-md">
      <div class="flex">
      </div>
      <div class="flex flex-col">
        <h1 class="text-3xl">Login</h1>
        <br/>
        <form>
          <label class="text-xl">Username:</label> 
          <br/>
          <input class="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="text" onChange={e => setUsername(e.target.value) }/> 
          <br/>
          <label class="text-xl">Password:</label> 
          <br/>
          <input class="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="password" onChange={e => setPassword(e.target.value) }/> 
          <br/>
          <label class="transition duration-200 text-lg text-red-900" onchange="shake" key={errorMessage}>{errorMessage}</label> {errorMessage !== null ? <br/> : ''}

          <button class="transition duration-200 delay-50 bg-gray-300 text-xl 
                        shadow-sm shadow-stone-500 rounded-lg px-2 
                        hover:bg-emerald-200 hover:shadow-lg
                        mt-2" 
          onClick={handleLogin}>Login</button>
    
        </form>        
      </div>
      <div>

      </div>
      <button onClick={clearSessionData}>Debug Remove SessionData</button>
    </div>      
  );
}