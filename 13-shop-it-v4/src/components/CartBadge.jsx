
import { useContext, useMemo } from "react";
import CartContext from "../contexts/CartContext";


function CartBadge({ }) {
    const { cart } = useContext(CartContext);
    //const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
    return (
        <a href="#" className="btn btn-light d-inline-flex align-items-center fw-semibold position-relative">
            <i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
            </span>
        </a>
    );
}

export default CartBadge;