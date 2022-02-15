import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const {cart} = props // Equivalent to, const cart = props.cart
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const product = cart[i]
        total += product.price*product.quantity;
    }
    // Alternative approach for calculating total price:
    // const total = cart.reduce( (total, product) => total + product.price, 0)
    let shipping = 0;
    if(total > 100){
        shipping = 5.45;
    }
    else if(total > 0){
        shipping = 12.99;
    }
    const tax = (total/10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    return (
        <div>
            <h3>Cart Summary</h3>
            <h4>Items Ordered: {cart.length}</h4>
            <h4><small>Shipping cost: ${shipping}</small></h4>
            <h4><small>Tax: ${tax}</small></h4>
            <h4>Total: ${grandTotal}</h4>
            {
                props.children
            }
        </div>
    );
};

export default Cart;