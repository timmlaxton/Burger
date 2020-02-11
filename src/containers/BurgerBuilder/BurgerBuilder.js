import React, { Component } from "react";

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
    sald: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 2
};

class BurgerBuilder extends Component {
   
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalprice: 4

    }

    addIngredientHandler = (type) => {
const oldCount = this.state.ingredients[type];
const updatedCounted = oldCount + 1;
const updatedIngredients = {
    ...this.state.ingredients
};
updatedIngredients[type] = updatedCounted;
const priceAddition = INGREDIENT_PRICES[type];
const oldprice = this.state.totalprice;
const newPrice =  oldprice + priceAddition;
this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {

    }

    render () {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;