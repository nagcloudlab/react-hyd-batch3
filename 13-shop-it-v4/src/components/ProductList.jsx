

import { useEffect, useState } from 'react';
import Product from './Product';
import { fetchProducts } from '../services/productService';

function ProductList({ onBuy }) {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [openReviewProductId, setOpenReviewProductId] = useState(null);

    const loadProducts = async () => {
        try {
            setIsLoading(true);
            setError('');
            const data = await fetchProducts();
            setProducts(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unable to load products.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);


    const renderProducts = () => {
        return products.map(product => (
            <div className="list-group-item" key={product.id}>
                <Product
                    product={product}
                    onBuy={onBuy}
                    isReviewFormOpen={openReviewProductId === product.id}
                    onReviewFormOpen={() => setOpenReviewProductId(product.id)}
                    onReviewFormClose={() => setOpenReviewProductId(null)}
                />
            </div>
        ))
    }

    if (isLoading) {
        return <div className="alert alert-secondary">Loading products...</div>;
    }

    if (error) {
        return (
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
                <span>{error}</span>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={loadProducts}>Retry</button>
            </div>
        );
    }

    return (<div className="list-group">
        {renderProducts()}
    </div>
    );
}

export default ProductList;