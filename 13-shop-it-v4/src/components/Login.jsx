import { useContext, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

function Login() {
    const { isAuthenticated, login } = useContext(AuthContext);
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/orders';

    if (isAuthenticated) {
        return <Navigate to={from} replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const success = login(form.username, form.password);
        if (!success) {
            setError('Invalid credentials. Use admin / 1234');
            return;
        }

        navigate(from, { replace: true });
    };

    return (
        <section className="card shadow-sm border-0 mx-auto" style={{ maxWidth: '460px' }}>
            <div className="card-body p-4">
                <h1 className="h3 mb-3">Login</h1>
                <p className="text-muted">Use dummy credentials: admin / 1234</p>

                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            className="form-control"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <div className="alert alert-danger py-2">{error}</div>}

                    <button type="submit" className="btn btn-primary w-100">Sign In</button>
                </form>
            </div>
        </section>
    );
}

export default Login;