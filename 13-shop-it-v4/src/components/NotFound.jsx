
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <section className="simple-hero rounded-4 p-4 p-md-5 my-3 text-center">
            <div className="mx-auto" style={{ maxWidth: '680px' }}>
                <h1 className="display-5 fw-bold text-white mb-3">404 - Page Not Found</h1>
                <p className="lead text-white-50 mb-4">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link to="/" className="btn btn-light btn-lg fw-semibold px-4">
                    Go to Home
                </Link>
            </div>

            <style>{`
                .simple-hero {
                    background: linear-gradient(135deg, #0b3b66 0%, #1f7a8c 100%);
                    min-height: 54vh;
                    display: grid;
                    place-items: center;
                }

                @media (max-width: 576px) {
                    .simple-hero h1 {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </section>
    );
}

export default NotFound;