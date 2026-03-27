import { useState, useRef, useLayoutEffect } from "react";

export default function UseLayoutEffect() {
    const [show, setShow] = useState(false);
    const buttonRef = useRef(null);
    const tooltipRef = useRef(null);

    useLayoutEffect(() => {
        if (show) {
            const rect = buttonRef.current.getBoundingClientRect();
            tooltipRef.current.style.top = rect.bottom + "px";
            tooltipRef.current.style.left = rect.left + "px";
        }
    }, [show]);

    return (
        <div>
            <h2 className="text-warning mb-3">useLayoutEffect Hook</h2>
            <div className="alert alert-info">
                <strong>Purpose:</strong> Same as <code>useEffect</code>, but fires <strong>before</strong> the browser paints.
                Use when you need to measure/mutate DOM before the user sees it.
            </div>

            {/* Comparison Table */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>useEffect vs useLayoutEffect</strong>
                </div>
                <div className="card-body p-0">
                    <table className="table table-bordered mb-0">
                        <thead className="table-light">
                            <tr><th>Aspect</th><th>useEffect</th><th>useLayoutEffect</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Timing</td><td>After paint</td><td><strong>Before paint</strong></td></tr>
                            <tr><td>Blocking</td><td>Non-blocking</td><td>Blocks paint</td></tr>
                            <tr><td>Use for</td><td>Data fetching, subscriptions</td><td>DOM measurements, tooltip positioning</td></tr>
                            <tr><td>Visual glitch?</td><td>Possible (flicker)</td><td>No flicker</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Demo */}
            <div className="card mb-3">
                <div className="card-header bg-light">
                    <strong>Demo:</strong> Tooltip positioning (no flicker)
                </div>
                <div className="card-body" style={{ minHeight: '120px', position: 'relative' }}>
                    <button
                        ref={buttonRef}
                        className={`btn ${show ? 'btn-warning' : 'btn-outline-warning'}`}
                        onClick={() => setShow(!show)}
                    >
                        {show ? 'Hide' : 'Show'} Tooltip
                    </button>

                    {show && (
                        <div
                            ref={tooltipRef}
                            className="position-absolute"
                            style={{
                                top: "0px",
                                left: "0px",
                                background: "#333",
                                color: "white",
                                padding: "8px 16px",
                                borderRadius: "6px",
                                fontSize: "0.9rem",
                                zIndex: 10,
                                marginTop: '8px',
                            }}
                        >
                            I'm positioned before paint — no flicker!
                        </div>
                    )}

                    <div className="alert alert-warning mt-5 mb-0">
                        <small><strong>Why useLayoutEffect here?</strong> The tooltip starts at <code>top: 0, left: 0</code> (wrong position).
                            <code>useLayoutEffect</code> corrects it <strong>before</strong> the browser paints, so you never see the jump.
                            With <code>useEffect</code>, you'd see a brief flicker.</small>
                    </div>
                </div>
            </div>

            <div className="alert alert-danger">
                <strong>Rule:</strong> Default to <code>useEffect</code>. Only use <code>useLayoutEffect</code> when
                you see visual glitches caused by DOM measurements/mutations happening too late.
            </div>
        </div>
    );
}
