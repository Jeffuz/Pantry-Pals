import React, { Component } from 'react';

// Display Recipe Data boxes to preview
class RecipeComponent extends Component {
  constructor(props) {
    super(props);

    this.recipeObject = props.recipeObject;

    this.name = props.name;
    this.ingredients = props.ingredients;
    // this.instructions = this.recipeObject.instructions;
    //this.image
  }
  displayIngredients() {

  }
  render(){
    return(
      <div>
        <p>This is a recipe {this.name}</p>
        <p>This is ingredients {this.ingredients}</p>
        <p>-----End of Recipe Preview-----</p>
      </div>
    );
  } 
}

export default RecipeComponent;