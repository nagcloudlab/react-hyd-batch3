import { useCallback, useContext, useMemo } from "react";
import CartContext from "../contexts/CartContext";
import './CartTable.css';

function CartTable({ }) {
    
    const { cart, dispatch } = useContext(CartContext);

    const grandTotal = useMemo(
        () => cart.reduce((total, cartLine) => total + cartLine.total, 0),
        [cart]
    );

    const handleRemove = useCallback((id) => {
        dispatch({ type: "REMOVE_FROM_CART", id });
    }, [dispatch]);

    const handleQuantityChange = useCallback((id, quantity) => {
        dispatch({ type: "CHANGE_QUANTITY", id, quantity });
    }, [dispatch]);

    const handleClearCart = useCallback((event) => {
        event?.preventDefault();
        event?.stopPropagation();

        const isConfirmed = window.confirm('Clear all items from cart?');
        if (!isConfirmed) return;

        dispatch({ type: "CLEAR_CART" });
    }, [dispatch]);

    if (cart.length === 0) {
        return (
            <div className="cart-empty-state">
                <div className="cart-empty-icon" aria-hidden="true">
                    <i className="fa fa-shopping-bag"></i>
                </div>
                <h4 className="mb-2">Your Cart Is Empty</h4>
                <p className="mb-0 text-muted">Add products to see them here.</p>
            </div>
        );
    }

    return (
        <section className="cart-table-shell">
            <div className="cart-table-header">
                <h3 className="mb-1">Your Cart</h3>
                <p className="mb-0">{cart.length} item(s) selected</p>
            </div>

            <div className="table-responsive cart-table-wrap">
                <table className="table cart-table mb-0">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map(cartLine => (
                            <tr key={cartLine.id}>
                                <td className="cart-product-name">{cartLine.name}</td>
                                <td className="cart-price">&#8377;{cartLine.price}</td>
                                <td>
                                    <div className="qty-control" role="group" aria-label={`Quantity controls for ${cartLine.name}`}>
                                        <button
                                            onClick={() => handleQuantityChange(cartLine.id, -1)}
                                            className="btn qty-btn"
                                            type="button"
                                        >
                                            <i className="fa fa-minus"></i>
                                        </button>
                                        <span className="qty-value">{cartLine.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(cartLine.id, 1)}
                                            className="btn qty-btn"
                                            type="button"
                                        >
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </td>
                                <td className="cart-line-total">&#8377;{cartLine.total}</td>
                                <td>
                                    <button
                                        onClick={() => handleRemove(cartLine.id)}
                                        className="btn btn-outline-danger btn-sm"
                                        type="button"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="cart-summary">
                <div>
                    <span className="cart-summary-label">Grand Total</span>
                    <h4 className="cart-summary-value mb-0">&#8377;{grandTotal}</h4>
                </div>
                <button
                    onClick={handleClearCart}
                    className="btn btn-warning cart-clear-btn"
                    type="button"
                    aria-label="Clear all cart items"
                >
                    Clear Cart
                </button>
            </div>
        </section>
    );
}

export default CartTable;