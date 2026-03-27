import { useState, useCallback, memo } from "react"

const ExpensiveChild = memo(function ExpensiveChild({ onIncrement, label }) {
    console.log(`ExpensiveChild [${label}] rendered`)
    return (
        <button className="btn btn-outline-primary" onClick={onIncrement}>
            {label}
        </button>
    )
})

function UseCallback() {
    console.log("UseCallback component rendered")

    const [count, setCount] = useState(0)
    const [otherState, setOtherState] = useState(0)

    // Without useCallback — new function every render
    const handleIncrementNormal = () => {
        setCount(prevCount => prevCount + 1)
    }

    // With useCallback — same function reference across renders
    const handleIncrementCallback = useCallback(() => {
        setCount(prevCount => prevCount + 1)
    }, [])

    return (
        <div>
            <h2 className="text-danger mb-3">useCallback Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Caches a <strong>function reference</strong> between renders.
                Useful when passing callbacks to memoized child components (<code>React.memo</code>).
            </div>

            {/* Comparison */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>useMemo vs useCallback</strong>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered mb-0">
                        <thead className="table-light">
                            <tr><th>Hook</th><th>Caches</th><th>Returns</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><code>useMemo(fn, deps)</code></td><td>Result of fn()</td><td>Cached value</td></tr>
                            <tr><td><code>useCallback(fn, deps)</code></td><td>fn itself</td><td>Cached function</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo:</strong> Check console — which child re-renders?
                </div>
                <div className="card-body">
                    <h4>Count: <span className="badge bg-primary">{count}</span></h4>
                    <h4>Other State: <span className="badge bg-secondary">{otherState}</span></h4>

                    <div className="d-flex gap-2 my-3">
                        <ExpensiveChild onIncrement={handleIncrementNormal} label="Without useCallback" />
                        <ExpensiveChild onIncrement={handleIncrementCallback} label="With useCallback" />
                    </div>

                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setOtherState(otherState + 1)}
                    >
                        Change Other State (triggers parent re-render)
                    </button>

                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Check Console:</strong> When you click "Change Other State", only the
                            "Without useCallback" child re-renders because its function reference changes every render.
                            The "With useCallback" child is skipped by <code>React.memo</code>.</small>
                    </div>
                </div>
            </div>

            <div className="alert alert-danger">
                <strong>Rule of thumb:</strong> <code>useCallback</code> is only useful when combined with <code>React.memo</code>
                on child components. Without memo, caching the function has no benefit.
            </div>
        </div>
    )
}

export default UseCallback
