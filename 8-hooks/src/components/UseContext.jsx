import { useState, useContext, createContext } from "react";

const ColorContext = createContext("White");
const UserContext = createContext("Guest");

function A() {
    return (
        <div className="card mb-2">
            <div className="card-header fw-bold">Component A</div>
            <div className="card-body">
                <p className="text-muted mb-2">I don't consume any context — just passing down</p>
                <B />
            </div>
        </div>
    );
}

function B() {
    const color = useContext(ColorContext);
    return (
        <div className="card mb-2" style={{ backgroundColor: color, transition: 'background-color 0.3s' }}>
            <div className="card-header fw-bold">
                Component B — <code>useContext(ColorContext)</code> = <span className="badge bg-dark">{color}</span>
            </div>
            <div className="card-body">
                <C />
            </div>
        </div>
    );
}

function C() {
    const currentUser = useContext(UserContext);
    return (
        <div className="card">
            <div className="card-header fw-bold">
                Component C — <code>useContext(UserContext)</code> = <span className="badge bg-success">{currentUser}</span>
            </div>
            <div className="card-body">
                <p className="mb-0">Deepest child — got data without prop drilling!</p>
            </div>
        </div>
    );
}


function UseContext() {
    const [color, setColor] = useState("yellow");
    const [currentUser, setCurrentUser] = useState("John Doe");

    const handleThemeChange = () => {
        setColor(color === "yellow" ? "lightcoral" : "yellow");
    }
    const handleLogout = () => {
        setCurrentUser(currentUser === "Guest" ? "John Doe" : "Guest");
    }

    return (
        <div>
            <h2 className="text-success mb-3">useContext Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Shares data across the component tree without prop drilling.
                Uses <code>createContext()</code> + <code>Provider</code> + <code>useContext()</code>.
            </div>

            {/* Flow Diagram */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Pattern:</strong> Context Flow
                </div>
                <div className="card-body text-center">
                    <code>createContext(default)</code> → <code>&lt;Context.Provider value=&#123;...&#125;&gt;</code> → <code>useContext(Context)</code>
                </div>
            </div>

            {/* Controls */}
            <div className="d-flex gap-2 mb-3">
                <button className="btn btn-outline-warning" onClick={handleThemeChange}>
                    Toggle Color ({color})
                </button>
                <button className="btn btn-outline-success" onClick={handleLogout}>
                    {currentUser === "Guest" ? "Login" : "Logout"}
                </button>
            </div>

            {/* Provider Tree 1 */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Provider Tree 1:</strong> Both ColorContext &amp; UserContext
                </div>
                <div className="card-body">
                    <ColorContext.Provider value={color}>
                        <UserContext.Provider value={currentUser}>
                            <A />
                        </UserContext.Provider>
                    </ColorContext.Provider>
                </div>
            </div>

            {/* Provider Tree 2 */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Provider Tree 2:</strong> Different ColorContext value (<code>"tomato"</code>)
                </div>
                <div className="card-body">
                    <ColorContext.Provider value={"tomato"}>
                        <A />
                    </ColorContext.Provider>
                </div>
            </div>

            <div className="alert alert-warning">
                <strong>Key Insight:</strong> Same component <code>&lt;A /&gt;</code> rendered twice with different Provider values — each subtree gets its own context!
            </div>
        </div>
    );
}

export default UseContext;
