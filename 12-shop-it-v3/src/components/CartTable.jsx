import { useContext, useCallback, use } from "react";
import CartContext from "../contexts/CartContext";

function CartTable({ }) {
    const { cart, dispatch } = useContext(CartContext);
    if (cart.length === 0) {
        return <div className="alert alert-info">No items in cart</div>
    }
    const handleRemove = useCallback((id) => {
        dispatch({ type: "REMOVE_FROM_CART", id });
    }, []);
    const handleQuantityChange = useCallback((id, quantity) => {
        dispatch({ type: "CHANGE_QUANTITY", id, quantity });
    }, []);
    const handleClearCart = useCallback(() => {
        dispatch({ type: "CLEAR_CART" });
    }, []);
    return (
        <table className="table">
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
                        <td>{cartLine.name}</td>
                        <td>&#8377;{cartLine.price}</td>
                        <td>
                            <div className="d-flex">
                                <button onClick={() => handleQuantityChange(cartLine.id, -1)} className="btn btn-primary">
                                    <i className="fa fa-minus"></i>
                                </button>
                                <span className="mx-2">{cartLine.quantity}</span>
                                <button onClick={() => handleQuantityChange(cartLine.id, 1)} className="btn btn-primary">
                                    <i className="fa fa-plus"></i>
                                </button>
                            </div>
                        </td>
                        <td>&#8377;{cartLine.total}</td>
                        <td>
                            <button onClick={() => handleRemove(cartLine.id)} className="btn btn-danger">Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3">Total</td>
                    <td>&#8377;{cart.reduce((total, cartLine) => total + cartLine.total, 0)}</td>
                    <td>
                        <button onClick={handleClearCart} className="btn btn-warning">clear cart</button>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

export default CartTable;