import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = (recipeName) => {
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();

  const bookmarkedColor = 'bg-emerald-500/50';
  
  // First render update check if user database has bookmarked
  useEffect(() => {
    let token = sessionStorage.getItem('token');
    console.log(token);
    if(token === '') // Not logged in 
      return;
    // Get user bookmarks and check if bookmark found in list
    async function handleServerGetBookmarks() {
      console.log(token)
      return fetch(`http://localhost:5000/bookmark/${token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    }
  });

  //console.log(recipeName, "name");
  // Update server bookmark
  async function handleServerSetBookmark(recipeName, newBookmarkState) {
    console.log( {
      "RecipeName": recipeName,
      "newBookmarkState": newBookmarkState, 
    });
    return fetch(`http://localhost:5000/bookmark?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        "RecipeName": recipeName,
        "newBookmarkState": newBookmarkState, 
      }
    })
  }



  const handleClick = (event) => {
    let token = sessionStorage.getItem('token');
    if(token === null) {
      navigate("/login");
      return;
    }
    if(isSaved) {
      setIsSaved(false);
      let result = handleServerSetBookmark(recipeName, false)
      console.log(result);
     }
    else {
      setIsSaved(true);
      
     }


  }

  return(
    <div>
      <button className={"transition delay-50 p-2 shadow-lg shadow-red-500 pointer-events-auto active:shadow-blue-500 " + ( isSaved ? bookmarkedColor : 'bg-stone-100')} onClick={handleClick}>BookmarkButton</button>
    </div>
  )
}

export default BookmarkButton;