import React from "react";

function Foo({ message }) {
    console.log("Rendering Foo");
    return <div className="card card-body">{message}</div>;
}
Foo = React.memo(Foo);

function Bar({ count }) {
    console.log("Rendering Bar");
    return <div className="card card-body">{count}</div>;
}
Bar = React.memo(Bar);


function MemoPattern() {
    console.log("Rendering MemoPattern");
    const [count, setCount] = React.useState(0);
    const [message, setMessage] = React.useState("Hello");
    return (
        <div>
            <h1>MemoPattern</h1>
            <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
                Increment Count
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => setMessage(message + "!")}>
                Update Message
            </button>
            <hr />
            <Foo message={message} />
            <Bar count={count} />
        </div>
    );
}

export default MemoPattern;