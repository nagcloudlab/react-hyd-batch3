import { useState, useMemo } from "react"

function generateNumbers() {
    return new Array(10000).fill(0).map((_, i) => i + 1)
}

function UseMemo() {
    console.log("UseMemo rendered")
    const [count, setCount] = useState(0)
    const [category, setCategory] = useState("odd")
    const [numbers] = useState(generateNumbers)

    const filteredNumbers = useMemo(() => {
        console.log("Filtering numbers...")
        return numbers.filter(num => category === "odd" ? num % 2 !== 0 : num % 2 === 0)
    }, [category, numbers])

    return (
        <div>
            <h2 className="text-danger mb-3">useMemo Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Caches the <strong>result</strong> of an expensive computation.
                Re-computes only when dependencies change — skips recalculation on unrelated re-renders.
            </div>

            {/* Demo: Expensive Filter */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo:</strong> Filtering 10,000 numbers — cached with <code>useMemo</code>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card border-primary mb-3">
                                <div className="card-body text-center">
                                    <h5>Unrelated State</h5>
                                    <h3><span className="badge bg-primary">{count}</span></h3>
                                    <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
                                        + Increment
                                    </button>
                                    <p className="text-muted mt-2 mb-0">
                                        <small>Changing this does NOT re-filter</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card border-danger mb-3">
                                <div className="card-body text-center">
                                    <h5>Filter Category</h5>
                                    <h3><span className="badge bg-danger">{category}</span></h3>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => setCategory(category === "odd" ? "even" : "odd")}
                                    >
                                        Toggle Category
                                    </button>
                                    <p className="text-muted mt-2 mb-0">
                                        <small>This triggers re-computation</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="alert alert-success">
                        <strong>Result:</strong> {filteredNumbers.length.toLocaleString()} {category} numbers
                        (check console — "Filtering numbers..." only logs when category changes)
                    </div>

                    <div style={{ maxHeight: '150px', overflow: 'auto' }} className="border rounded p-2">
                        {filteredNumbers.slice(0, 100).map(num => (
                            <span key={num} className="badge bg-light text-dark me-1 mb-1">{num}</span>
                        ))}
                        {filteredNumbers.length > 100 && <span className="text-muted">... and {filteredNumbers.length - 100} more</span>}
                    </div>
                </div>
            </div>

            <div className="alert alert-warning">
                <strong>When to use:</strong> Only for genuinely expensive computations.
                Don't wrap everything in <code>useMemo</code> — the memoization itself has a cost!
            </div>
        </div>
    )
}

export default UseMemo
