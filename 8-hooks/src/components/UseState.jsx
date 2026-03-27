
import { useState } from 'react'

function fetchTodos() {
    console.log('fetching todos...')
    return [
        'Todo 1',
        'Todo 2',
        'Todo 3'
    ]
}

function UseState() {

    console.log('UseState component rendered')
    const [count, setCount] = useState(0)
    const [todos, setTodos] = useState(() => {
        console.log('Initializing todos state')
        return fetchTodos()
    })
    const [user, setUser] = useState({
        name: 'John Doe',
        age: 30
    })

    // Golden-Rule : hooks must not be called inside loops, conditions or nested functions
    // Hooks must be called at the top level of the component, before any early returns

    const handleCountChange = () => {
        setCount(prevState => prevState + 1)
    }
    const handleCountThreeTimesChange = () => {
        // setCount(count + 1) // async.. won't work 3 times!
        // setCount(count + 1)
        // setCount(count + 1)
        setCount(prevState => prevState + 1)
        setCount(prevState => prevState + 1)
        setCount(prevState => prevState + 1)
    }

    const handleNewTodo = () => {
        const newTodo = `Todo ${todos.length + 1}`
        setTodos(prevTodos => [...prevTodos, newTodo])
    }
    const handleNameChange = () => {
        setUser(prevUser => ({ ...prevUser, name: 'Jane Doe' }))
    }
    const handleAgeChange = () => {
        setUser(prevUser => ({ ...prevUser, age: prevUser.age + 1 }))
    }

    return (
        <div>
            <h2 className="text-primary mb-3">useState Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Adds reactive state to functional components. When state changes, the component re-renders.
            </div>

            {/* Demo 1: Counter */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 1:</strong> Primitive State &amp; Functional Updates
                </div>
                <div className="card-body">
                    <h4>Count: <span className="badge bg-primary">{count}</span></h4>
                    <div className="d-flex gap-2 mt-3">
                        <button className="btn btn-outline-primary" onClick={handleCountChange}>
                            Increment (+1)
                        </button>
                        <button className="btn btn-outline-success" onClick={handleCountThreeTimesChange}>
                            Increment +3 (functional update)
                        </button>
                    </div>
                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Key Insight:</strong> Using <code>setCount(prev =&gt; prev + 1)</code> three times works correctly,
                            but <code>setCount(count + 1)</code> three times only increments by 1 (stale closure).</small>
                    </div>
                </div>
            </div>

            {/* Demo 2: Array State */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 2:</strong> Array State (Lazy Initialization)
                </div>
                <div className="card-body">
                    <ul className="list-group mb-3">
                        {todos.map((todo, index) => (
                            <li className="list-group-item" key={index}>{todo}</li>
                        ))}
                    </ul>
                    <button className="btn btn-outline-primary" onClick={handleNewTodo}>
                        + Add Todo
                    </button>
                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Key Insight:</strong> State initialized via <code>useState(() =&gt; fetchTodos())</code> —
                            the function runs only on first render (lazy initialization).</small>
                    </div>
                </div>
            </div>

            {/* Demo 3: Object State */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo 3:</strong> Object State (Spread Operator)
                </div>
                <div className="card-body">
                    <table className="table table-bordered">
                        <tbody>
                            <tr><th>Name</th><td>{user.name}</td></tr>
                            <tr><th>Age</th><td>{user.age}</td></tr>
                        </tbody>
                    </table>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary" onClick={handleNameChange}>Change Name</button>
                        <button className="btn btn-outline-success" onClick={handleAgeChange}>Increment Age</button>
                    </div>
                    <div className="alert alert-warning mt-3 mb-0">
                        <small><strong>Key Insight:</strong> Always spread the previous object: <code>{`{ ...prevUser, name: 'Jane' }`}</code>.
                            React uses shallow comparison — mutating the object won't trigger re-render.</small>
                    </div>
                </div>
            </div>

            {/* Golden Rule */}
            <div className="alert alert-danger">
                <strong>Golden Rule:</strong> Hooks must be called at the <strong>top level</strong> of the component — never inside loops, conditions, or nested functions.
            </div>
        </div>
    )
}

export default UseState
