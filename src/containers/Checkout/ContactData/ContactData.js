import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postCode: ""
        },
        loading: false
    }
    orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true})
    const order = {
        ingredients:this.props.ingredients,
        price: this.props.price,
        cutomer: {
            name: "tim",
            address: {
                city: "pigeon"
            }
        }
        
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

    render () {
        let form = (
            <form>
            <Input  inputtype="input"  type="text" name="name" placeholder="Your Name" />
            <Input  inputtype="input" type="text" name="email" placeholder="Your Email" />
            <Input  inputtype="input" type="text" name="street" placeholder="Street" />
            <Input  inputtype="input" type="text" name="postcode" placeholder="Postcode" />
            <Button inputtype="input" btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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