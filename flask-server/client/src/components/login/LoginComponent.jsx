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

  function clearSessionData()
  {
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
    <div id="Login-Wrapper">
      <h3>Login</h3>
      <form>
        <label for="uname">Username:</label> <br/>
        <input id="uname" type="text" onChange={e => setUsername(e.target.value) }/> <br/>
        <label for="pname">Password:</label> <br/>
        <input id="pname" type="password" onChange={e => setPassword(e.target.value) }/> <br/>
        <label id="errorMessage">{errorMessage}</label> {errorMessage !== null ? <br/> : ''}
        <button onClick={handleLogin}>Login</button>
      </form>
      <button onClick={clearSessionData}>Debug Remove SessionData</button>
    </div>      
  );
}