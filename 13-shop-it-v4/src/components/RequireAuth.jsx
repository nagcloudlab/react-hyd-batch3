import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function RequireAuth() {
    const { isAuthenticated } = useContext(AuthContext);
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default RequireAuth;