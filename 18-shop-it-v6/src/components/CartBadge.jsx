
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartBadge() {
    const cart = useSelector((state) => state.cart);
    const cartCount = useMemo(() => cart.reduce((total, item) => total + item.quantity, 0), [cart]);
    return (
        <Link to="/cart" className="btn btn-light d-inline-flex align-items-center fw-semibold position-relative">
            <i className="fa fa-shopping-cart me-2" aria-hidden="true"></i>
            Cart
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
            </span>
        </Link>
    );
}

export default CartBadge;