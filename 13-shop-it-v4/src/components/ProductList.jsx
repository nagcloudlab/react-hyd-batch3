

import { useContext, useEffect, useState } from 'react';
import CartContext from '../contexts/CartContext';
import Product from './Product';

function ProductList({ onBuy }) {
    const { cart } = useContext(CartContext);

    const [products, setProducts] = useState([])

    useEffect(() => {
        // Fetch products from an API or other source
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/products');
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);


    const renderProducts = () => {
        return products.map(product => (
            <div className="list-group-item" key={product.id}>
                <Product product={product} onBuy={onBuy} />
            </div>
        ))
    }

    return (<div className="list-group">
        {renderProducts()}
    </div>
    );
}

export default ProductList;