import React, { useContext } from 'react'
import { useState } from 'react';

const BookmarkButton = (recipeName) => {
  const [isSaved, setIsSaved] = useState(false);

  
  const bookmarkedColor = 'bg-emerald-500/50';

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

  // Get user bookmarks and check if bookmark found in list
  async function handleServerGetBookmark(recipeName) {
    return fetch(`http://localhost:5000/bookmark?`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
  }

  const handleClick = (event) => {
    if(isSaved) {
      setIsSaved(false);
      let result = handleServerSetBookmark(recipeName, false)
     }
    else {
      setIsSaved(true);
      
     }


  }

  return(
    <div>
      <button className={"transition delay-50 p-2 shadow-lg shadow-red-500 pointer-events-auto active:shadow-blue-500 " + ( isSaved ? 'bg-stone-100' : bookmarkedColor )} onClick={handleClick}>BookmarkButton</button>
    </div>
  )
}

export default BookmarkButton;