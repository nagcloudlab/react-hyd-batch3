import { useState, useRef, useEffect } from "react"

function Person(name, age) {
    this.name = name
    this.age = age
}

function UseRef() {
    console.log("UseRef component rendered")
    const [count, setCount] = useState(0)
    const personRef = useRef(new Person("John", 30))
    personRef.current.age += 1

    const inputRef = useRef()
    const renderCountRef = useRef(0)

    renderCountRef.current += 1

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <div>
            <h2 className="text-info mb-3">useRef Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Creates a mutable reference that persists across renders
                without causing re-renders. Two main uses: <strong>DOM access</strong> and <strong>mutable values</strong>.
            </div>

            {/* Demo 1: DOM Reference */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 1:</strong> DOM Reference — <code>ref=&#123;inputRef&#125;</code>
                </div>
                <div className="card-body">
                    <input
                        ref={inputRef}
                        type="text"
                        className="form-control"
                        placeholder="I'm auto-focused on mount via useRef!"
                    />
                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Key Insight:</strong> <code>inputRef.current</code> gives direct access to the DOM element.
                            Used for focus, scroll, measurements, etc.</small>
                    </div>
                </div>
            </div>

            {/* Demo 2: Mutable Value */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 2:</strong> Mutable Value (no re-render)
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th>Person Name</th>
                                <td>{personRef.current.name}</td>
                            </tr>
                            <tr>
                                <th>Person Age (increments each render)</th>
                                <td><span className="badge bg-info">{personRef.current.age}</span></td>
                            </tr>
                            <tr>
                                <th>Render Count (tracked via ref)</th>
                                <td><span className="badge bg-secondary">{renderCountRef.current}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo 3: Trigger re-render */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 3:</strong> Re-render trigger (useState)
                </div>
                <div className="card-body">
                    <h4>Count: <span className="badge bg-primary">{count}</span></h4>
                    <button className="btn btn-primary mt-2" onClick={() => setCount(count + 1)}>
                        + Re-render
                    </button>
                    <p className="text-muted mt-2 mb-0">
                        Click to re-render — watch Person age and render count increase (they update via ref, not state).
                    </p>
                </div>
            </div>

            <div className="alert alert-danger">
                <strong>useState vs useRef:</strong> State changes trigger re-renders. Ref changes do NOT.
                Use refs for values you need to persist but don't want to display reactively.
            </div>
        </div>
    )
}

export default UseRef
