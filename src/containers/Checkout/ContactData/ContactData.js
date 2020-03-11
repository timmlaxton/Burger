import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postCode: ""
        }
    }

    render () {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contacts details</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="text" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postcode" placeholder="Postcode" />
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        );
    }
}

export default ContactData;