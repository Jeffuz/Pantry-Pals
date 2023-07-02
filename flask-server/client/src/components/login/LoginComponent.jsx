import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function setToken(userToken) {

}
function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

export default function LoginComponent() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
  const token = getToken();
  console.log("token", token);
  if(token) {
    console.log("logged in as", token);
  }
  else {
    console.log("Need to log in");
  }
  const display = event => {
    console.log(username, password);
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

    if(data.id != '') {
      console.log("Logged in", data.id);
      sessionStorage.setItem('token', data.id);

    }
  }

  return(
    <div id="Login-Wrapper">
      <h3>Login</h3>

      <input type="text" onChange={e => setUsername(e.target.value) }/>
      <br/>
      <input type="password" onChange={e => setPassword(e.target.value) }/>
      <br/>
      <button onClick={handleLogin}>Login</button>
    </div>      
    
  );
}