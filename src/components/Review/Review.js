import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManage';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
// import checkoutImage from '../../images/giphy.gif';
import checkoutImage from '../../images/checkoutImg.png';

const Review = () => {
    
    const [cart, setCart] = useState([])
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        processOrder();
        setOrderPlaced(true);
    }

    let imageAfterCheckout;
    if(orderPlaced){
        imageAfterCheckout = <img src={checkoutImage} style={{width: '920px'}} alt="" />
    }

    return (
        <div className='review-container'>
            <div className="product-container">
                {
                    cart.map(pd => 
                        <ReviewItem 
                            key={pd.key} 
                            removeProduct={removeProduct}
                            product={pd}>
                        </ReviewItem>)
                }
                {
                    imageAfterCheckout
                }
            </div>
            <div className="cart-container">
                <Cart 
                    cart={cart}>
                        <button onClick={handlePlaceOrder} className='primary-button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;