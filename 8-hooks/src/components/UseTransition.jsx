import { useState, useTransition } from "react";

function generateTodos() {
    const todos = [];
    for (let i = 0; i < 20000; i++) {
        todos.push({ id: i, text: `${i}-todo` });
    }
    return todos;
}

function UseTransition() {
    const [search, setSearch] = useState("");
    const [todos] = useState(generateTodos);
    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [isPending, startTransition] = useTransition();

    const handleSearch = (e) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);          // HIGH priority — update input immediately
        startTransition(() => {
            const filtered = todos.filter(todo => todo.text.includes(searchTerm));
            setFilteredTodos(filtered);  // LOW priority — can be deferred
        });
    }

    return (
        <div>
            <h2 className="text-secondary mb-3">useTransition Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Marks state updates as <strong>low priority</strong> so the UI stays responsive.
                The input stays snappy while the expensive filter runs in the background.
            </div>

            {/* How it works */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>How it works</strong>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered mb-0">
                        <thead className="table-light">
                            <tr><th>Update</th><th>Priority</th><th>Behavior</th></tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><code>setSearch(value)</code></td>
                                <td><span className="badge bg-danger">High</span></td>
                                <td>Input updates immediately</td>
                            </tr>
                            <tr>
                                <td><code>startTransition(() =&gt; setFilteredTodos(...))</code></td>
                                <td><span className="badge bg-secondary">Low</span></td>
                                <td>Filter can be interrupted / deferred</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo:</strong> Search through 20,000 todos
                </div>
                <div className="card-body">
                    <input
                        value={search}
                        onChange={handleSearch}
                        className="form-control form-control-lg"
                        placeholder="Type to search 20,000 todos..."
                    />

                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-muted">
                            Showing {filteredTodos.length.toLocaleString()} of {todos.length.toLocaleString()} todos
                        </span>
                        {isPending && (
                            <span className="badge bg-warning text-dark">
                                Filtering...
                            </span>
                        )}
                    </div>

                    <div style={{ maxHeight: '200px', overflow: 'auto' }} className="border rounded mt-2">
                        <ul className="list-group list-group-flush">
                            {filteredTodos.slice(0, 100).map(todo => (
                                <li className="list-group-item py-1" key={todo.id}>{todo.text}</li>
                            ))}
                            {filteredTodos.length > 100 && (
                                <li className="list-group-item py-1 text-muted">
                                    ... and {filteredTodos.length - 100} more
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="alert alert-warning">
                <strong>Key Insight:</strong> Without <code>useTransition</code>, typing in the search would feel laggy
                because React tries to filter 20K items and update the input at the same priority.
                With it, the input stays responsive while filtering happens in the background.
            </div>
        </div>
    );
}

export default UseTransition;
