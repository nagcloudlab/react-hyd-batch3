import { Suspense, lazy, useState, Component } from "react"
import PatternLayout from "./PatternLayout"

// Problem: Heavy components loaded eagerly
function SalesChart() {
  return (
    <div className="card">
      <div className="card-body py-2">
        <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>Sales Chart (300KB bundle)</div>
        <div style={{ height: 60, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)", borderRadius: 6, marginTop: 8, display: "flex", alignItems: "flex-end", padding: "0 8px", gap: 4 }}>
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => <div key={i} style={{ width: "12%", height: `${h}%`, background: "rgba(255,255,255,0.3)", borderRadius: "3px 3px 0 0" }} />)}
        </div>
        <div className="d-flex justify-content-between small text-muted mt-1"><span>Mon</span><span>Thu</span><span>Sun</span></div>
      </div>
    </div>
  )
}

function AdminPanel() {
  return (
    <div className="card">
      <div className="card-body py-2">
        <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>Admin Panel (400KB bundle)</div>
        <div className="mt-2">
          <div className="d-flex justify-content-between small mb-1"><span>Users</span><span className="fw-bold">12,847</span></div>
          <div className="d-flex justify-content-between small mb-1"><span>Active sessions</span><span className="fw-bold">1,234</span></div>
          <div className="d-flex justify-content-between small"><span>Server load</span><span className="fw-bold text-warning">78%</span></div>
        </div>
      </div>
    </div>
  )
}

// Solution: Lazy loaded
const LazySalesChart = lazy(() => new Promise(r =>
  setTimeout(() => r({ default: () => (
    <div className="card">
      <div className="card-body py-2">
        <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>Sales Chart (loaded on demand!)</div>
        <div style={{ height: 60, background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7)", borderRadius: 6, marginTop: 8, display: "flex", alignItems: "flex-end", padding: "0 8px", gap: 4 }}>
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => <div key={i} style={{ width: "12%", height: `${h}%`, background: "rgba(255,255,255,0.3)", borderRadius: "3px 3px 0 0" }} />)}
        </div>
        <div className="d-flex justify-content-between small text-muted mt-1"><span>Mon</span><span>Thu</span><span>Sun</span></div>
      </div>
    </div>
  )}), 1500)
))

const LazyAdminPanel = lazy(() => new Promise(r =>
  setTimeout(() => r({ default: () => (
    <div className="card">
      <div className="card-body py-2">
        <div style={{ fontSize: "0.82rem", fontWeight: 600 }}>Admin Panel (loaded on demand!)</div>
        <div className="mt-2">
          <div className="d-flex justify-content-between small mb-1"><span>Users</span><span className="fw-bold">12,847</span></div>
          <div className="d-flex justify-content-between small mb-1"><span>Active sessions</span><span className="fw-bold">1,234</span></div>
          <div className="d-flex justify-content-between small"><span>Server load</span><span className="fw-bold text-warning">78%</span></div>
        </div>
      </div>
    </div>
  )}), 2000)
))

class ErrorBoundary extends Component {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() {
    return this.state.error
      ? <div className="alert alert-danger py-1 small">Failed to load. <button className="btn btn-sm btn-link p-0" onClick={() => this.setState({ error: false })}>Retry</button></div>
      : this.props.children
  }
}

function CodeSplittingPattern() {
  const [showChart, setShowChart] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  return (
    <PatternLayout
      title="Code Splitting"
      description="Load components on demand with React.lazy and Suspense to reduce initial bundle size."
      whyPoints={[
        "Reduces initial bundle size -- users download only what they need on first load",
        "React.lazy + dynamic import() creates separate chunks automatically via bundler",
        "Suspense shows a fallback while chunk loads -- no manual loading state management",
        "Best for: route-level splitting, admin panels, heavy charts, modals, rarely-used features",
      ]}
      problem={
        <div>
          <div className="label-problem">All components bundled and loaded at startup:</div>
          <div className="code-demo-row">
            <div className="code-block">{`import SalesChart from "./SalesChart" // 300KB
import AdminPanel from "./AdminPanel" // 400KB

function App() {
  return (
    <div>
      {showChart && <SalesChart />}
      {showAdmin && <AdminPanel />}
    </div>
  )
}

// main.js = 1.2MB at startup
// Both chunks loaded even if user
// never clicks "Show Chart"
// 70% of users never visit Admin!`}</div>
            <div className="demo-area">
              <div className="d-flex gap-2 mb-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setShowChart(!showChart)}>Toggle Chart</button>
                <button className="btn btn-sm btn-outline-warning" onClick={() => setShowAdmin(!showAdmin)}>Toggle Admin</button>
              </div>
              {showChart && <div className="mb-2"><SalesChart /></div>}
              {showAdmin && <AdminPanel />}
              <p className="text-danger small mb-0 mt-2">Both in main bundle -- 700KB wasted bandwidth</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">Lazy-load on demand -- separate chunks fetched when needed:</div>
          <div className="code-demo-row">
            <div className="code-block">{`const SalesChart = lazy(
  () => import("./SalesChart") // chunk
)
const AdminPanel = lazy(
  () => import("./AdminPanel") // chunk
)

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        {showChart && <SalesChart />}
      </Suspense>
    </ErrorBoundary>
  )
}

// main.js = 100KB (fast!)
// SalesChart.js loads on first click
// AdminPanel.js loads on first click`}</div>
            <div className="demo-area">
              <div className="d-flex gap-2 mb-2">
                <button className="btn btn-sm btn-outline-primary" onClick={() => setShowChart(!showChart)}>Load Chart</button>
                <button className="btn btn-sm btn-outline-warning" onClick={() => setShowAdmin(!showAdmin)}>Load Admin</button>
              </div>
              <ErrorBoundary>
                {showChart && <Suspense fallback={<div className="d-flex align-items-center gap-2 small mb-2"><span className="spinner-border spinner-border-sm" /> Loading chart chunk...</div>}><div className="mb-2"><LazySalesChart /></div></Suspense>}
                {showAdmin && <Suspense fallback={<div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Loading admin chunk...</div>}><LazyAdminPanel /></Suspense>}
              </ErrorBoundary>
              <p className="text-success small mb-0 mt-2">Components load only on click -- watch the loading spinner!</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default CodeSplittingPattern
