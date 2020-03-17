import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';

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
            <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
            <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
            <input className={classes.Input} type="text" name="street" placeholder="Street" />
            <input className={classes.Input} type="text" name="postcode" placeholder="Postcode" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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