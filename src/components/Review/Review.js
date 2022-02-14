import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart } from '../../utilities/databaseManage';

const Review = () => {
    
    const [cart, setCart] = useState([])
    const [totalItems, setTotalItems] = useState(0);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        const total = cartProducts.reduce( (sum, product) => sum + product.quantity, 0)
        setTotalItems(total);
        setCart(cartProducts);
    }, [])

    return (
        <div>
            <h2>Cart items: {totalItems}</h2>
        </div>
    );
};

export default Review;