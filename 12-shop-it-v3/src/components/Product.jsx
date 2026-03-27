import { useState } from 'react'
import classNames from 'classnames';
import Review from './Review';

import { useContext } from 'react';
import CartContext from '../contexts/CartContext';

function Product({ product, onBuy }) {
    const { cart, dispatch } = useContext(CartContext);

    const [currentTab, setCurrentTab] = useState(1);
    const reviews = [
        {
            id: 1,
            name: 'John Doe',
            rating: 5,
            comment: 'This is a great product',
            date: '2026-03-25'
        },
        {
            id: 2,
            name: 'Jane Doe',
            rating: 4,
            comment: 'This is a good product',
            date: '2026-03-24'
        }
    ]

    const isInCart = cart.some(cartLine => cartLine.id === product.id);
    const cartLine = cart.find(cartLine => cartLine.id === product.id);

    const handleTabChange = (tabIndex) => {
        setCurrentTab(tabIndex);
    }

    const renderReviews = () => {
        return reviews.map(review => (
            <Review key={review.id} review={review} />
        ))
    }

    const renderTabPanel = () => {
        switch (currentTab) {
            case 1:
                return <div className="mt-3">{product.description}</div>
            case 2:
                return (
                    <div className="mt-3">
                        <ul>
                            <li>RAM: 16GB</li>
                            <li>Storage: 512GB SSD</li>
                            <li>Processor: Intel i7</li>
                        </ul>
                    </div>
                )
            case 3:
                return (
                    <>
                        {renderReviews()}
                    </>
                )
            default:
                return null;
        }
    }

    const handleBuy = () => {
        const cartLine = {
            id: product.id,
            name: product.name,
            price: product.price
        }
        dispatch({ type: "ADD_TO_CART", cartLine });
    }

    return (
        <div className="row">
            <div className="col-4">
                <img src={product.imageUrl} className="img-fluid" />
            </div>
            <div className="col-8">
                <div>{product.name}</div>
                <div>&#8377;{product.price}</div>
                <button disabled={isInCart} onClick={() => handleBuy()} className="btn btn-primary">Add to Cart</button>
                <br />
                {isInCart && 'Item in cart'},
                {isInCart && `quantity: ${cartLine.quantity}`}
                <ul className="mt-3 nav nav-tabs">
                    <li className="nav-item">
                        <a onClick={() => handleTabChange(1)} className={classNames('nav-link', { active: currentTab === 1 })} href="#">Description</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => handleTabChange(2)} className={classNames('nav-link', { active: currentTab === 2 })} href="#">Specification</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={() => handleTabChange(3)} className={classNames('nav-link', { active: currentTab === 3 })} href="#">Reviews</a>
                    </li>
                </ul>
                {renderTabPanel()}
            </div>
        </div>
    );


}

export default Product;