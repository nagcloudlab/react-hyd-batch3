import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { createProductReview, fetchProductReviews } from '../services/productService';

const Review = lazy(() => import('./Review'));
const ReviewForm = lazy(() => import('./ReviewForm'));

function Product({
    product,
    isReviewFormOpen,
    onReviewFormOpen,
    onReviewFormClose,
}) {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [currentTab, setCurrentTab] = useState(1);
    const [reviews, setReviews] = useState([]);
    const [isReviewsLoading, setIsReviewsLoading] = useState(false);
    const [reviewsError, setReviewsError] = useState('');
    const [submitReviewError, setSubmitReviewError] = useState('');
    const reviewsTabRef = useRef(null);

    const isInCart = cart.some(cartLine => cartLine.id === product.id);
    const cartLine = cart.find(cartLine => cartLine.id === product.id);

    useEffect(() => {
        if (currentTab !== 3) return;

        const fetchReviews = async () => {
            try {
                setIsReviewsLoading(true);
                setReviewsError('');
                const data = await fetchProductReviews(product.id);
                setReviews(data);
            } catch (err) {
                setReviewsError(err instanceof Error ? err.message : 'Unable to load reviews.');
            } finally {
                setIsReviewsLoading(false);
            }
        };

        fetchReviews();
    }, [currentTab, product.id]);

    useEffect(() => {
        if (currentTab !== 3 || !reviewsTabRef.current) return;
        reviewsTabRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    }, [currentTab]);

    const handleTabChange = (tabIndex) => {
        setCurrentTab(tabIndex);
    }

    const handleTabClick = (e, tabIndex) => {
        e.preventDefault();
        handleTabChange(tabIndex);
    }


    const renderReviews = () => {
        return reviews.map(review => (
            <Review key={review.id} review={review} />
        ))
    }

    const handleNewReview = async (review) => {
        try {
            setSubmitReviewError('');
            const createdReview = await createProductReview(product.id, review);
            setReviews((prevReviews) => [...prevReviews, createdReview]);
        } catch (err) {
            setSubmitReviewError(err instanceof Error ? err.message : 'Unable to submit review.');
        }
    };

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
                    <div ref={reviewsTabRef} className="mt-3">
                        <Suspense fallback={<div className="alert alert-secondary">Loading reviews UI...</div>}>
                            <ReviewForm
                                isOpen={isReviewFormOpen}
                                onOpen={onReviewFormOpen}
                                onClose={onReviewFormClose}
                                onSubmit={handleNewReview}
                            />
                        </Suspense>
                        {submitReviewError && <div className="alert alert-warning">{submitReviewError}</div>}
                        {isReviewsLoading && <div className="alert alert-secondary">Loading reviews...</div>}
                        {reviewsError && <div className="alert alert-danger">{reviewsError}</div>}
                        <Suspense fallback={<div className="alert alert-secondary">Loading review cards...</div>}>
                            {renderReviews()}
                        </Suspense>
                    </div>
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
        dispatch(addToCart({ cartLine }));
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
                        <a onClick={(e) => handleTabClick(e, 1)} className={classNames('nav-link', { active: currentTab === 1 })} href="#">Description</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={(e) => handleTabClick(e, 2)} className={classNames('nav-link', { active: currentTab === 2 })} href="#">Specification</a>
                    </li>
                    <li className="nav-item">
                        <a onClick={(e) => handleTabClick(e, 3)} className={classNames('nav-link', { active: currentTab === 3 })} href="#">Reviews</a>
                    </li>
                </ul>
                {renderTabPanel()}
            </div>
        </div>
    );


}

export default Product;