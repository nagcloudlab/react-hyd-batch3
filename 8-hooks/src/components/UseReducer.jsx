import { useReducer } from "react";
import cartReducer from '../reducers/cart'

function UserReducer() {
    console.log('UserReducer comp rendered');

    const [cart, dispatch] = useReducer(cartReducer, [
        { id: 1, name: 'iPhone 14 Pro', price: 120000, qty: 1 },
        { id: 2, name: 'OnePlus 11R', price: 45000, qty: 1 },
        { id: 3, name: 'Google Pixel 7 Pro', price: 70000, qty: 1 }
    ]);

    const handleClearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    const handleAddToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { id: Date.now(), name: 'Samsung Galaxy S23 Ultra', price: 90000, qty: 1 }
        });
    }

    const handleRemoveFromCart = (id) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

    return (
        <div>
            <h2 className="text-primary mb-3">useReducer Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Manages complex state logic using a reducer function (like Redux pattern).
                Best when state transitions depend on action types.
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-success" onClick={handleAddToCart}>
                    + Add Samsung S23
                </button>
                <button className="btn btn-danger" onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>

            {/* Cart Table */}
            <div className="card">
                <div className="card-header bg-light d-flex justify-content-between">
                    <strong>Cart Items ({cart.length})</strong>
                    <span className="badge bg-primary fs-6">Total: ₹{total.toLocaleString()}</span>
                </div>
                <div className="card-body p-0">
                    {cart.length === 0 ? (
                        <div className="text-center text-muted py-4">Cart is empty</div>
                    ) : (
                        <table className="table table-hover mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>₹{item.price.toLocaleString()}</td>
                                        <td>{item.qty}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => handleRemoveFromCart(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="alert alert-warning mt-3">
                <strong>Pattern:</strong> <code>dispatch({'{ type, payload }'})</code> → <code>reducer(state, action)</code> → new state.
                The reducer is a pure function — no side effects!
            </div>
        </div>
    )
}

export default UserReducer
