
// component
//---------------
// - state managent
// - side effects
// - browser APIs ( DOM, fetch, timers )
// - performance optimization

import { useEffect, useState } from "react";

function useCounter() {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    return [count, increment, decrement];
}


function useOffline() {
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const handleOnline = () => {
        setIsOffline(false);
    }
    const handleOffline = () => {
        setIsOffline(true);
    }
    useEffect(() => {
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    }, []);
    return isOffline;
}


function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    return { data, loading, error };
}


function A() {
    const [count, increment, decrement] = useCounter();
    const isOffline = useOffline();
    return (
        <div className="card">
            <div className="card-header">
                <strong className="small">Component A</strong>
            </div>
            <div className="card-body">
                <p className="card-text">This is Component A.</p>
                <button className="btn btn-primary" onClick={increment}>Increment</button>
                <p className="card-text">Count: {count}</p>
                {isOffline && <p className="card-text text-danger">You are offline</p>}
            </div>
        </div>
    );
}

function B() {
    const [count, increment, decrement] = useCounter();
    const isOffline = useOffline();
    return (
        <div className="card">
            <div className="card-header">
                <strong className="small">Component B</strong>
            </div>
            <div className="card-body">
                <p className="card-text">This is Component B.</p>
                <button className="btn btn-primary" onClick={increment}>Increment</button>
                <p className="card-text">Count: {count}</p>
                {isOffline && <p className="card-text text-danger">You are offline</p>}
            </div>
        </div>
    );
}



function TodoList() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos');
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className="card">
            <div className="card-header">
                <strong className="small">Todo List</strong>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {data.map(todo => (
                        <li key={todo.id} className="list-group-item">
                            {todo.title}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}


function UserList() {
    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');
    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }
    return (
        <div className="card">
            <div className="card-header">
                <strong className="small">User List</strong>
            </div>
            <div className="card-body">
                <ul className="list-group">
                    {data.map(user => (
                        <li key={user.id} className="list-group-item">
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function CustomHook() {
    return (
        <div>
            <h1>Custom Hook</h1>
            <hr />
            <A />
            <hr />
            <B />
            <hr />
            <TodoList />
            <hr />
            <UserList />
        </div>
    );
}

export default CustomHook;