import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger'
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner'
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: .5,
    cheese: .4,
    meat: 1.3,
    bacon: 2,
    pickles: 1.4,
    chillies: .5,
    tomatoes: 1.5,
};

class BurgerBuilder extends Component {
   
    
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            pickles: 0,
            chillies: 0,
            tomatoes: 0,
        },
        ingredients:null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false

    }

    componentDidMount () {
        axios.get('https://burger-e3005.firebaseio.com/Ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        });
    }
    updatePurchaseState (ingredients) {
        
         const sum = Object.keys(ingredients)
         .map(igKey => {
             return ingredients[igKey];
         })
         .reduce((sum, el) => {
             return sum + el;
         }, 0);
         this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
const oldCount = this.state.ingredients[type];
const updatedCounted = oldCount + 1;
const updatedIngredients = {
    ...this.state.ingredients
};
updatedIngredients[type] = updatedCounted;
const priceAddition = INGREDIENT_PRICES[type];
const oldPrice = this.state.totalPrice;
const newPrice =  oldPrice + priceAddition;
this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
this.updatePurchaseState(updatedIngredients);
}

removeIngredientHandler = (type) => {
const oldCount = this.state.ingredients[type];
if (oldCount <= 0) {
    return;
}
const updatedCounted = oldCount - 1;
const updatedIngredients = {
    ...this.state.ingredients
 };
 updatedIngredients[type] = updatedCounted;
 const priceDeduction = INGREDIENT_PRICES[type];
 const oldPrice = this.state.totalPrice;
 const newPrice =  oldPrice - priceDeduction;
 this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
 this.updatePurchaseState(updatedIngredients);
}   

purchaseHandler = () => {
    this.setState({purchasing: true});
}
purchaseCancelHandler = () => {
    this.setState({purchasing: false});
}

purchaseContinueHandler = () => {
    //alert('You Continue');
    // this.setState({loading: true})
    // const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     cutomer: {
    //         name: "tim",
    //         address: {
    //             city: "pigeon"
    //         }
    //     }
        
    // }
    
    // axios.post('/orders.json', order)
    // .then(response => {
    // this.setState({ loding: false, purchasing: false})
    
    // })
    
    // .catch( error => {
    //     this.setState({ loding: false, purchasing: false})
    // });
    this.props.history.push('/checkout')
}


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
            for (let key in disabledInfo) {
             disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let orderSummary = null;

        
        
       
       
        
        let burger = <Spinner/>

        if (this.state.ingredients) {
        burger = (

        <Aux>
            <Burger ingredients={this.state.ingredients}/>
        <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            disabled={disabledInfo} 
            price={this.state.totalPrice}/>);
        </Aux>

        );

        orderSummary =  <OrderSummary 
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}/>

        }

        if (this.state.loading ) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchseCancelhandler}>
               {orderSummary}
                </Modal>
                {burger}
                </Aux>
            
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);