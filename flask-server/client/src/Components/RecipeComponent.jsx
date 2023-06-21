import React, { Component } from 'react';

class RecipeComponent extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.ingredients = props.ingredients;
    this.instructions = props.instructions;
    //this.image
  }
  displayIngredients() {

  }
  render(){
    return(
      <div>
        <p>This is a recipe {this.name}</p>
        <p>This is ingredients {this.ingredients}</p>
        <p>This is instructions {this.instructions}</p>
        <p>-----End of Recipe-----</p>
      </div>
    );
  } 
}

export default RecipeComponent;