import React, { useEffect, useState }  from 'react';
import fakeData from '../../fakeData';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManage';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const products = first10;
    const [cart, setCart] = useState([]);

    useEffect( () =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find( pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const handleAddProduct = (product) => {
        let count;
        let newCart;
        const currentProduct = cart.find(pd => pd.key === product.key);
        if(currentProduct){
            count = currentProduct.quantity + 1;
            currentProduct.quantity = count; 
            const otherProducts = cart.filter(pd => pd.key !== product.key)
            newCart = [...otherProducts, product];
        }
        else{
            count = 1;
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
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
                    <Cart 
                        cart={cart}> 
                            <Link to="/review"> <button className='primary-button'>Review items</button> </Link>  
                    </Cart>
                </div>
            </div>
        </div>
    );
};

export default Shop;