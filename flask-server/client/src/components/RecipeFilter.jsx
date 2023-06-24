import React, { useState } from 'react';

export function FilterComponent() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleInputChange(event) {
    const { value } = event.target;
    setInputValue(value);

    if (value.endsWith(' ')) {
      // Remove the trailing space and add the ingredient to the list
      const ingredient = value.trim();
      if (ingredient !== '') {
        setIngredients(prevIngredients => [...prevIngredients, ingredient]);
      }

      // Reset the input value
      setInputValue('');
    }
  }

  function handleDeleteIngredient(index) {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter ingredients" />
      
      <h3>Selected Ingredients:</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient}
            <button onClick={() => handleDeleteIngredient(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* <div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}