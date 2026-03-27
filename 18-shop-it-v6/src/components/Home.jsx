

import { Link } from 'react-router-dom';

function Home() {
    return (
        <section className="simple-hero rounded-4 p-4 p-md-5 my-3 text-center">
            <div className="mx-auto" style={{ maxWidth: '680px' }}>
                <h1 className="display-5 fw-bold text-white mb-3">Welcome to Shop IT</h1>
                <p className="lead text-white-50 mb-4">
                    Find the products you need with a simple and smooth shopping experience.
                </p>
                <Link to="/products" className="btn btn-light btn-lg fw-semibold px-4">
                    Start Shopping
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

export default Home;