import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BookmarkButton = (recipeName) => {
  const [isSaved, setIsSaved] = useState(false);

  const navigate = useNavigate();
  const bookmarkedColor = 'bg-emerald-500/50';
  
  // First render update check if user database has bookmarked
  useEffect(() => {
    const fetchBookmarks = async() => {
      let token = sessionStorage.getItem('token');
      if(token === null) // Not logged in 
        return;
      // Get user bookmarks and check if bookmark found in list
      const result = await handleServerGetBookmarks(token, recipeName);

      const jResult = await result.json();

      
      let isBookedmarked = jResult["BookmarkState"];
      if(isBookedmarked) {
        setIsSaved(true);
      }
      else
        setIsSaved(false);
    }
    console.log("loading");
    fetchBookmarks();
  }, []);

  //#region Handle Server calls for bookmarks
  async function handleServerGetBookmarks(token, recipeName) {
    return fetch(`http://localhost:5000/getBookmark?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": token,
        "recipeName": recipeName, 
      })
    })
  }

  // Update server bookmark
  async function handleServerSetBookmark(token, recipeName, isAddBookmark) {
    return fetch(`http://localhost:5000/setBookmark?`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "token": token,
        "recipeName": recipeName,
        "isAddBookmark": isAddBookmark, 
      })
    })
  }
  //#endregion


  const handleClick = async(event) => {
    let token = sessionStorage.getItem('token');
    if(token === null) {
      navigate("/login");
      return;
    }

    if(isSaved) {
      let response = await handleServerSetBookmark(token, recipeName, false)
      let result = await response.json();
      console.log(result);
      setIsSaved(false);
     }
    else {
      let response = await handleServerSetBookmark(token, recipeName, true)
      let result = await response.json();
      console.log(result);
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