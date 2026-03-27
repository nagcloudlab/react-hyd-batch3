import { useEffect, useState } from "react";

function UseEffect(props) {
    console.log("Component rendered");
    let { foo } = props;

    const [count, setCount] = useState(0);
    const [light, setLight] = useState("off");
    const [timeNow, setTimeNow] = useState(new Date().toLocaleTimeString());

    // Effect 1: Runs on every render (no dependency array)
    useEffect(() => {
        document.title = `Count: ${count}`;
    });

    // Effect 2: Runs only once on mount (empty dependency array)
    useEffect(() => {
        console.log("Mounted! Runs only once.");
    }, []);

    // Effect 3: Runs when 'light' changes
    useEffect(() => {
        console.log("Light changed to:", light);
    }, [light]);

    // Effect 4: Runs when prop 'foo' changes
    useEffect(() => {
        console.log("Prop 'foo' changed:", foo);
    }, [foo]);

    // Effect 5: Cleanup example — interval with cleanup
    useEffect(() => {
        console.log("effect-5")
        if (light === "off") {
            setTimeNow("Light is off")
            return;
        }
        const intervalId = setInterval(() => {
            console.log("Tick..")
            setTimeNow(new Date().toLocaleTimeString())
        }, 1000)
        return () => {
            console.log("effect-5-cleanup")
            clearInterval(intervalId);
        }
    }, [light])

    // Effect 6: Data fetching
    const [resourceType, setResourceType] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        if (!resourceType) return;
        console.log("Fetching data for resource type: ", resourceType);
        fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))
    }, [resourceType])

    return (
        <div>
            <h2 className="text-warning mb-3">useEffect Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Handles side effects — data fetching, subscriptions, DOM updates, timers.
                Runs <strong>after</strong> the component renders (after paint).
            </div>

            {/* Dependency Array Cheatsheet */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Dependency Array Cheatsheet</strong>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered mb-0">
                        <thead className="table-light">
                            <tr><th>Syntax</th><th>When it runs</th></tr>
                        </thead>
                        <tbody>
                            <tr><td><code>useEffect(fn)</code></td><td>Every render</td></tr>
                            <tr><td><code>useEffect(fn, [])</code></td><td>Only on mount</td></tr>
                            <tr><td><code>useEffect(fn, [dep])</code></td><td>When <code>dep</code> changes</td></tr>
                            <tr><td><code>return () =&gt; cleanup</code></td><td>Before next effect / unmount</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo 1: Data Fetching */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 1:</strong> Data Fetching — <code>useEffect(fn, [resourceType])</code>
                </div>
                <div className="card-body">
                    <div className="d-flex gap-2 mb-3">
                        {['posts', 'users', 'comments'].map(type => (
                            <button
                                key={type}
                                className={`btn ${resourceType === type ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => setResourceType(type)}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        ))}
                    </div>
                    {resourceType && (
                        <div className="alert alert-light border" style={{ maxHeight: '200px', overflow: 'auto' }}>
                            <strong>Fetched {items.length} {resourceType}</strong>
                            <pre className="mb-0 mt-2" style={{ fontSize: '0.8rem' }}>
                                {JSON.stringify(items.slice(0, 3), null, 2)}
                                {items.length > 3 && `\n... and ${items.length - 3} more`}
                            </pre>
                        </div>
                    )}
                </div>
            </div>

            {/* Demo 2: Document Title */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 2:</strong> Document Title — <code>useEffect(fn)</code> (every render)
                </div>
                <div className="card-body">
                    <h4>Count: <span className="badge bg-primary">{count}</span></h4>
                    <button className="btn btn-outline-primary mt-2" onClick={() => setCount(count + 1)}>
                        Increment (check browser tab title)
                    </button>
                </div>
            </div>

            {/* Demo 3: Timer with Cleanup */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 3:</strong> Timer with Cleanup — <code>return () =&gt; clearInterval(id)</code>
                </div>
                <div className="card-body">
                    <div className="d-flex align-items-center gap-3">
                        <button
                            className={`btn ${light === 'on' ? 'btn-warning' : 'btn-dark'}`}
                            onClick={() => setLight(light === "off" ? "on" : "off")}
                        >
                            Light: {light.toUpperCase()}
                        </button>
                        <h4 className="mb-0">
                            <span className="badge bg-secondary">{timeNow}</span>
                        </h4>
                    </div>
                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Cleanup:</strong> When light turns off, the cleanup function runs <code>clearInterval()</code>
                            to prevent memory leaks.</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UseEffect;
