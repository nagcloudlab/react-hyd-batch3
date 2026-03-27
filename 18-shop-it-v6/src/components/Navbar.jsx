import CartBadge from "./CartBadge";
import { useDispatch, useSelector } from 'react-redux';
import { logout as logoutAction } from '../store/slices/authSlice';

import {
    Link,
    useNavigate,
} from "react-router-dom";

const routePrefetchers = {
    '/': () => import('./Home.jsx'),
    '/products': () => import('./ProductList.jsx'),
    '/cart': () => import('./CartTable.jsx'),
    '/orders': () => Promise.all([import('./RequireAuth.jsx'), import('./Orders.jsx')]),
    '/routing-demo': () => import('./RoutingDemo.jsx'),
    '/login': () => import('./Login.jsx'),
};

const prefetchedRoutes = new Set();


function Navbar({ title = "Unknown" }) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const prefetchRoute = (path) => {
        if (prefetchedRoutes.has(path)) return;

        const prefetcher = routePrefetchers[path];
        if (!prefetcher) return;

        prefetchedRoutes.add(path);
        void prefetcher();
    };

    const prefetchLinkProps = (path) => ({
        onMouseEnter: () => prefetchRoute(path),
        onFocus: () => prefetchRoute(path),
    });

    const handleLogout = () => {
        dispatch(logoutAction());
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded-3 px-3 py-2 shadow-sm">
            <div className="container-fluid px-0">
                <a className="navbar-brand fw-bold" href="/">{title}</a>
                <ul className="navbar-nav d-flex flex-row gap-3 ms-2">
                    <li className="nav-item">
                        <Link className="nav-link active" to="/" {...prefetchLinkProps('/')}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/products" {...prefetchLinkProps('/products')}>Products</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart" {...prefetchLinkProps('/cart')}>Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/orders" {...prefetchLinkProps('/orders')}>Orders</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/routing-demo" {...prefetchLinkProps('/routing-demo')}>Routing Demo</Link>
                    </li>
                    <li className="nav-item">
                        {isAuthenticated ? (
                            <button type="button" className="btn btn-link nav-link p-0" onClick={handleLogout}>
                                Logout
                            </button>
                        ) : (
                            <Link className="nav-link" to="/login" {...prefetchLinkProps('/login')}>Login</Link>
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