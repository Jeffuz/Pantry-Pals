import React, { Component } from 'react';
import RecipeComponent from './RecipeComponent';

class RecipeSearchComponent extends Component {
  constructor(props) {
    super(props);
    // Pass objects into the recipe search component
    this.names = [["bob", "1 Water", "drink water"], ["123", "1 Soda", "drink water"], ["momo", "1 Milk", "drink water"]];

    this.maxDisplay = props.maxDisplay;
    this.recipeList = null;
    this.state = {
      recipes: null,
    }
  }

  render(){
    return(
      <div>
        {this.names.map(function(x){
          return <RecipeComponent name={x[0]} ingredients={x[1]} instructions={x[2]}/>
        })}
      </div>
    );   
  }
}

export default RecipeSearchComponent;