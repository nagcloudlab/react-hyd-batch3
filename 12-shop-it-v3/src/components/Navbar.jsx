import CartBadge from "./CartBadge";



function Navbar({ title = "Unknown" }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded-3 px-3 py-2 shadow-sm">
            <div className="container-fluid px-0">
                <a className="navbar-brand fw-bold" href="#">{title}</a>
                <ul className="navbar-nav d-flex flex-row gap-3 ms-2">
                    {/* <li className="nav-item">
                        <a className="nav-link active" href="#">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Products</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Cart</a>
                    </li> */}
                </ul>
                <div className="ms-auto">
                    <CartBadge />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;