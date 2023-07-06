import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  return tokenString;
}

export default function LoginComponent() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const token = getToken();
  const navigate = useNavigate();

  // Debugging
  // console.log("token", token);
  // if(token) {
  //   console.log("logged in as", token);
  // }
  // else {
  //   console.log("Need to log in");
  // }
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

    console.log(email, password);
    const token = await loginUser({
      email,
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


  async function signupUser(credentials) {
    return fetch(`http://localhost:5000/signup?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
  }
  const handleSignup = async(event) => {
    event.preventDefault();
    console.log(email, password);
    // Check email and password fit requirements
    const emailCheck = /[\w]+\@[A-Za-z]+\.(.){3,}/g
    let isValidEmail = emailCheck.test(email);
    console.log(isValidEmail, "EmailValid");


    const passLengthCheck = /(.+){6,}/g
    const passSpecialCharacterCheck = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g
    const passUpperCaseCheck = /[A-Z]+/g
    console.log(passLengthCheck.test(password), "Length");
    console.log(passSpecialCharacterCheck.test(password), "Special Character");
    console.log(passUpperCaseCheck.test(password), "UpperCase");

    //==========================================
    const result = await signupUser({
      email,
      password
    });

    const jResult = await result.json();
    if(jResult.error === '') { // Success Sign up

    }
    else {
      setErrorMessage(jResult.error);
      // Display jResult.errormsg
      // Failed Sign up
    }
  }

  return(
    <div className="flex p-11 mx-auto my-auto shadow-lg shadow-emerald-600/50 rounded-md">
      {/* Sign Up Markup */}
      <div>
        <h1 className="text-3xl">Sign Up</h1>
        <form>
          <label className="text-xl">Email:</label> 
          <br/>
          <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="text" onChange={e => setEmail(e.target.value) }/> 
          <br/>
          <label className="text-xl">Password:</label> 
          <br/>
          <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="password" onChange={e => setPassword(e.target.value) }/> 
          <br/>
          <label className="transition duration-200 text-lg text-red-900" onchange="shake" key={errorMessage}>{errorMessage}</label> {errorMessage !== null ? <br/> : ''}

          <button className="transition duration-200 delay-50 bg-gray-300 text-xl 
                        shadow-sm shadow-stone-500 rounded-lg px-2 
                        hover:bg-emerald-200 hover:shadow-lg
                        mt-2" 
          onClick={handleSignup}>Login</button>
    
        </form> 
      </div>
      
      {/* Login Markup */}
      <div className="flex flex-col">
        <h1 className="text-3xl">Login</h1>
        <br/>
        <form>
          <label className="text-xl">Email:</label> 
          <br/>
          <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="text" onChange={e => setEmail(e.target.value) }/> 
          <br/>
          <label className="text-xl">Password:</label> 
          <br/>
          <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="password" onChange={e => setPassword(e.target.value) }/> 
          <br/>
          <label className="transition duration-200 text-lg text-red-900" onchange="shake" key={errorMessage}>{errorMessage}</label> {errorMessage !== null ? <br/> : ''}

          <button className="transition duration-200 delay-50 bg-gray-300 text-xl 
                        shadow-sm shadow-stone-500 rounded-lg px-2 
                        hover:bg-emerald-200 hover:shadow-lg
                        mt-2" 
          onClick={handleLogin}>Login</button>
    
        </form>        

      </div>
      <button onClick={clearSessionData}>Debug Remove SessionData</button>
    </div>      
  );
}