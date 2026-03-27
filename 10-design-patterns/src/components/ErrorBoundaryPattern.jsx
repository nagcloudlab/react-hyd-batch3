import React from "react";


function GoodComponent() {
    return <h2>This is a good component</h2>
}
function BadComponent() {
    throw new Error("An error occurred in BadComponent");
}

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h2>Something went wrong.</h2>;
        }

        return this.props.children;
    }
}


function ErrorBoundaryPattern() {
    return (
        <div>
            <h1>Error Boundary Pattern</h1>
            <hr />
            <GoodComponent />
            <ErrorBoundary>
                <BadComponent />
            </ErrorBoundary>
        </div>
    )
}

export default ErrorBoundaryPattern;