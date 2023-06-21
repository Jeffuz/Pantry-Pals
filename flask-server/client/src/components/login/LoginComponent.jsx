import React, { useState } from 'react';

export default function LoginComponent() {

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  
  const display = event => {
    console.log(username, password);
  }
  return(
    <div id="Login-Wrapper">
      <h3>Login</h3>

      <input type="text" onChange={e => setUsername(e.target.value) }/>
      <br/>
      <input type="password" onChange={e => setPassword(e.target.value) }/>
      <br/>
      <button onClick={display}>Login</button>
    </div>      
    
  );
}