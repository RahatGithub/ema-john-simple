import React, { useState }  from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart } from '../../utilities/databaseManage';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        const sameItems = newCart.filter(pd => pd.key === product.key);
        const count = sameItems.length;
        addToDatabaseCart(product.key, count);
    }

    return (
        <div>
            <div className="shop-container">
                <div className="product-container">
                    
                    {
                        products.map(product => 
                        <Product 
                            key={product.key} 
                            showAddToCart={true}
                            product={product} 
                            handleAddProduct={handleAddProduct}>   
                        </Product>)
                    }

                </div>
                <div className="cart-container">
                    <Cart cart={cart}></Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;