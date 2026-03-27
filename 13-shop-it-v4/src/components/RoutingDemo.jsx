import { Link, Outlet } from 'react-router-dom';

function RoutingDemo() {
    return (
        <section className="card border-0 shadow-sm">
            <div className="card-body p-4">
                <h1 className="h3 mb-2">Routing Demo</h1>
                <p className="text-muted mb-3">
                    This route demonstrates nested and dynamic routing in React Router v6.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-4">
                    <Link to="electronics" className="btn btn-outline-primary btn-sm">Electronics</Link>
                    <Link to="fashion" className="btn btn-outline-primary btn-sm">Fashion</Link>
                    <Link to="books" className="btn btn-outline-primary btn-sm">Books</Link>
                </div>

                <Outlet />
            </div>
        </section>
    );
}

export default RoutingDemo;
