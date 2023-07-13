import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PASSWORDLENGTH = '6';
const NUMBEROFCAPITALLETTERS = '1';


// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   return tokenString;
// }

export default function LoginComponent() {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isDisplayPass, setIsDisplayPass] = useState(false);
  //const token = getToken();
  const navigate = useNavigate();

  const [isMatchingPassword, setIsMatchingPassword] = useState(false);
  // Debugging
  // console.log("token", token);
  // if(token) {
  //   console.log("logged in as", token);
  // }
  // else {
  //   console.log("Need to log in");
  // }
  //End of Debug

  // function clearSessionData() {
  //   sessionStorage.clear();
  // }
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
  
  const handleCheckBox = (event) => {
    if(event.target.checked)
      setIsDisplayPass(true);
    else
      setIsDisplayPass(false);
  }
  const checkMatch = (event) => {
    let retypedPass = event.target.value;
    if(retypedPass === password) {
      setIsMatchingPassword(true); 
    }
    else  
      setIsMatchingPassword(false);

  }
  const changeMode = (event) => {
    (isLoginMode ? setIsLoginMode(false) : setIsLoginMode(true));
    setIsDisplayPass(false);
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
    else // Failed Login
      setErrorMessage("Incorrect Username or Password");

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
    // Check email and password fit requirements
    const emailCheck = /[\w]+@[A-Za-z]+\.(.){3,}/g
    const passLengthCheck = /(.+){6,}/g
    const passSpecialCharacterCheck = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]+/g
    const passUpperCaseCheck = /[A-Z]+/g

    let isValidEmail = emailCheck.test(email);
    let isPLength = passLengthCheck.test(password);
    let isPSpecial = passSpecialCharacterCheck.test(password);
    let isPUpper = passUpperCaseCheck.test(password);

    
    // Condition Check if valid
    if(!isValidEmail){
      setErrorMessage("Email is Invalid");
      return;
    }
    if(!isPLength)
      setErrorMessage("Password needs to be " + PASSWORDLENGTH + " or more characters long");
    if(!isPSpecial)
      setErrorMessage("Password needs at least " + NUMBEROFCAPITALLETTERS + " special character");
    if(!isPUpper)
      setErrorMessage("Passwords needs at least " + NUMBEROFCAPITALLETTERS + " uppercase letter");
    if(!isMatchingPassword)
      setErrorMessage("Passwords do not match");

    if(!isPLength || !isPSpecial || !isPUpper || !isMatchingPassword)
      return;

    //==========================================
    const result = await signupUser({
      email,
      password
    });

    const jResult = await result.json();
    if(jResult.error === '') { // Success Sign up
        navigate(-1);
    }
    else
      setErrorMessage(jResult.error);
  }

  return(
    <div className="flex justify-center place-self-center h-screen w-1/2">
      {/* Sign Up Markup */}
      {!isLoginMode ? (
          <div className="transform duration-1000 delay-50 p-11 mx-4 mt-56 my-auto shadow-lg shadow-emerald-600/50 bg-slate-300 rounded-3xl my-rotate-y-180">
          <h1 className="text-3xl">Sign Up</h1>
          <br/>
          <form>
            <label className="text-xl">Email:</label> 
            <br/>
            <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="text" onChange={e => setEmail(e.target.value) }/> 
            <br/>
            <label className="text-xl">Password:</label> 
            <br/>
            <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type={isDisplayPass ? "text" : "password" } onChange={e => setPassword(e.target.value) }/>
            <br/>
            <label className="text-xl">Confirm Password:</label> 
            <br/>
            <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type={isDisplayPass ? "text" : "password" } onChange={checkMatch}/>  
            <br/>
            <input type="checkbox" onClick={handleCheckBox}></input> <label>Show Password</label>
            <br/>
            <label className="transition duration-200 text-lg text-red-900" onchange="shake" key={errorMessage}>{errorMessage}</label> {errorMessage !== null ? <br/> : ''}

            <button className="transition duration-200 delay-50 bg-gray-300 text-xl 
                          shadow-sm shadow-stone-500 rounded-lg px-2 
                          hover:bg-emerald-200 hover:shadow-lg
                          mt-2" 
            onClick={handleSignup}>Login</button>
      
          </form> 
        </div>
      ) : (
        <div className="p-11 h-96 mx-4 my-auto shadow-lg shadow-emerald-600/50 bg-slate-300 rounded-3xl ">
          <button onClick={changeMode}>Switch Mode</button>
        </div>
      )}
      
      
      {/* Login Markup */}
      {!isLoginMode ? (
          <div className="p-11 h-96 mx-4 my-auto shadow-lg shadow-emerald-600/50 bg-slate-300 rounded-3xl ">
          <button onClick={changeMode}>Switch Mode</button>
        </div>
      ) : (
        <div class="transition duration-1000 delay-50 my-rotate-y-180
        p-11 min-h-1/6 mx-4 my-auto shadow-lg shadow-emerald-600/50 bg-slate-300 rounded-3xl">
          <h1 className="text-3xl">Login</h1>
          <br/>
          <form>
            <label className="text-xl">Email:</label> 
            <br/>
            <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type="text" onChange={e => setEmail(e.target.value) }/> 
            <br/>
            <label className="text-xl">Password:</label> 
            <br/>
            <input className="text-lg p-1 my-1 shadow-sm shadow-stone-300 rounded-lg" type={isDisplayPass ? "text" : "password" } onChange={e => setPassword(e.target.value) }/> 
            <br/>
            <input type="checkbox" onClick={handleCheckBox}></input> <label>Show Password</label>
            <br/>
            <label className="transition duration-200 text-lg text-red-900" onchange="shake" key={errorMessage}>{errorMessage}</label> {errorMessage !== null ? <br/> : ''}

            <button className="transition duration-200 delay-50 bg-gray-300 text-xl 
                          shadow-sm shadow-stone-500 rounded-lg px-2 
                          hover:bg-emerald-200 hover:shadow-lg
                          mt-2" 
            onClick={handleLogin}>Login</button>
          </form>        
        </div>
      )}
      
      {/* <button onClick={clearSessionData}>Debug Remove SessionData</button> */}
    </div>      
  );
}