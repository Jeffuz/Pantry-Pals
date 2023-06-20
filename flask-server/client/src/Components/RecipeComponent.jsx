import React, { Component } from 'react';

class RecipeComponent extends Component {
  constructor(props) {
    super(props);

    this.name = props.name;
    this.ingredients = props.ingredients;
    this.instructions = props.instructions;

  }

  render(){
    return(
      <div>
        <p>This is a recipe {this.name}</p>
      </div>
    );
  }
}

export default RecipeComponent;