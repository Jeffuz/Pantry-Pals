import React, { Component } from 'react';
import RecipeComponent from './RecipeComponent';

class RecipeSearchComponent extends Component {
  constructor(props) {
    super(props);
    // Pass objects into the recipe search component
    this.names = ["bob", "mom", "234"];

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
          return <RecipeComponent name={x}/>
        })}
      </div>
    );   
  }
}

export default RecipeSearchComponent;