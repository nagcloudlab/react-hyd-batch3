import { useId } from 'react';

function FormInstance({ title }) {
    const emailId = useId();
    const passwordId = useId();
    return (
        <div className="card mb-3">
            <div className="card-header bg-light">
                <strong>{title}</strong> — IDs: <code>{emailId}</code>, <code>{passwordId}</code>
            </div>
            <div className="card-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor={emailId} className="form-label">Email address</label>
                        <input type="email" className="form-control" id={emailId} aria-describedby={`${emailId}-help`} />
                        <div id={`${emailId}-help`} className="form-text">We'll never share your email.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor={passwordId} className="form-label">Password</label>
                        <input type="password" className="form-control" id={passwordId} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

function UseId() {
    return (
        <div>
            <h2 className="text-secondary mb-3">useId Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Generates unique, stable IDs for accessibility attributes
                (<code>htmlFor</code>, <code>aria-describedby</code>). Safe for SSR — same IDs on server and client.
            </div>

            {/* Why useId */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Why not just use <code>Math.random()</code>?</strong>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered mb-0">
                        <thead className="table-light">
                            <tr><th>Approach</th><th>SSR Safe</th><th>Stable across renders</th><th>Unique per instance</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><code>Math.random()</code></td><td>No</td><td>No</td><td>Yes</td></tr>
                            <tr><td>Hardcoded <code>"email-1"</code></td><td>Yes</td><td>Yes</td><td>No (conflicts!)</td></tr>
                            <tr className="table-success"><td><code>useId()</code></td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo: Multiple instances */}
            <h5 className="mt-4 mb-3">Same component rendered twice — each gets unique IDs:</h5>
            <FormInstance title="Form Instance 1" />
            <FormInstance title="Form Instance 2" />

            <div className="alert alert-warning">
                <strong>Key Insight:</strong> Each <code>&lt;FormInstance /&gt;</code> generates its own unique IDs.
                No conflicts, no manual tracking — React handles it. Inspect the DOM to see the generated IDs!
            </div>
        </div>
    );
}

export default UseId;
