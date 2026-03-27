import CartBadge from "./CartBadge";
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

import {
    Link,
    useNavigate,
} from "react-router-dom";


function Navbar({ title = "Unknown" }) {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded-3 px-3 py-2 shadow-sm">
            <div className="container-fluid px-0">
                <a className="navbar-brand fw-bold" href="/">{title}</a>
                <ul className="navbar-nav d-flex flex-row gap-3 ms-2">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products">Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders">Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/routing-demo">Routing Demo</Link>
                    </li>
                    <li className="nav-item">
                        {isAuthenticated ? (
                            <button type="button" className="btn btn-link nav-link p-0" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link className="nav-link" to="/login">Login</Link>
                        )}
                    </li>
                </ul>
                <div className="ms-auto">
                    <CartBadge />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;