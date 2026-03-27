import { Link, Outlet, useParams } from 'react-router-dom';

function RoutingDemoCategory() {
    const { categoryId } = useParams();

    return (
        <div className="border rounded-3 p-3 bg-light-subtle">
            <h2 className="h5 mb-2">Category: {categoryId}</h2>
            <p className="text-muted mb-3">
                This is a dynamic segment using <code>:categoryId</code>.
            </p>

            <div className="d-flex flex-wrap gap-2 mb-3">
                <Link to="item/101" className="btn btn-sm btn-secondary">Item 101</Link>
                <Link to="item/202" className="btn btn-sm btn-secondary">Item 202</Link>
            </div>

            <Outlet />
        </div>
    );
}

export default RoutingDemoCategory;
