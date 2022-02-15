import React from 'react';

const ReviewItem = (props) => {
    const {name, price, quantity, key} = props.product;
    const reviewStyle = {
        borderBottom: '1px solid lightgray', 
        margin: '20px',
        padding: '20px'
    }
    return (
        <div style={reviewStyle} className='review-item'>
            <h4 className='product-name'>{name}</h4>
            <h4>${price}</h4>
            <h4>Qty: {quantity}</h4>
            <button className='primary-button' onClick={() => props.removeProduct(key)}>Remove</button>
        </div>
    );
};

export default ReviewItem;