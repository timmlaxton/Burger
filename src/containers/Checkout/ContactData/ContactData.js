import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Name'
        },
        value: ''
    },

        street: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Street'
        },
        value: ''
    },

    
        Postcode: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'Postcode'
        },
        value: ''
    },

    
        City: {
        elementType: 'input',
        elementConfig: {
            type: 'text',
            placeholder: 'City'
        },
        value: ''
    },

    
        Email: {
        elementType: 'input',
        elementConfig: {
            type: 'email',
            placeholder: 'Email'
        },
        value: ''
 }

},
  
    loading: false
        

}
    orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
        ingredients:this.props.ingredients,
        price: this.props.price,
        orderData: formData
       
    }
    
    axios.post('/orders.json', order)
    .then(response => {
    this.setState({ loding: false  });
    this.props.history.push('/');
    })
    
    .catch( error => {
        this.setState({ loding: false})
    });        

    
}

inputChangedHandler = (event, inputIdentifier) => {
const updatedOrderForm = {
    ...this.state.orderForm
};
const updatedFormElement = {
...updatedOrderForm[inputIdentifier]
};
 updatedFormElement.value = event.target.value;
 updatedOrderForm[inputIdentifier] = updatedFormElement;
 this.setState({orderForm: updatedOrderForm});
}



    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
        formElementsArray.push({
            id:key,
            config:this.state.orderForm[key]
        });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
                <Input
                key={formElement.id} 
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))}
            
            <Button inputtype="input" btnType="Success">ORDER</Button>
        </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contacts details</h4>
                {form}
                
            </div>
        );
    }
}

export default ContactData;