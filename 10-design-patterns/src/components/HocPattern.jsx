import { useState, useEffect } from "react"
import PatternLayout from "./PatternLayout"

// Simulate an auth check
function simulateAuth() {
  return new Promise((resolve) => setTimeout(() => resolve({ user: "Alice", role: "admin" }), 1000))
}

// Problem: Auth + logging duplicated in every page
function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { console.log("[LOG] DashboardPage mounted"); simulateAuth().then(setUser).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Checking auth...</div>
  if (!user) return <div className="alert alert-danger py-1 small mb-1">Please log in</div>
  return <div className="alert alert-primary py-2 small mb-1"><strong>Dashboard</strong> -- Welcome back, {user.user}! You have 5 notifications.</div>
}

function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { console.log("[LOG] AnalyticsPage mounted"); simulateAuth().then(setUser).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Checking auth...</div>
  if (!user) return <div className="alert alert-danger py-1 small mb-1">Please log in</div>
  return <div className="alert alert-info py-2 small mb-1"><strong>Analytics</strong> -- 12,847 page views this week. Revenue: $34,200.</div>
}

function SettingsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { console.log("[LOG] SettingsPage mounted"); simulateAuth().then(setUser).finally(() => setLoading(false)) }, [])
  if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Checking auth...</div>
  if (!user) return <div className="alert alert-danger py-1 small mb-1">Please log in</div>
  return <div className="alert alert-warning py-2 small mb-1"><strong>Settings</strong> -- Account: {user.user} | Role: {user.role}</div>
}

// Solution: HOCs
function withAuth(Component) {
  return function Authenticated(props) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => { simulateAuth().then(setUser).finally(() => setLoading(false)) }, [])
    if (loading) return <div className="d-flex align-items-center gap-2 small"><span className="spinner-border spinner-border-sm" /> Checking auth...</div>
    if (!user) return <div className="alert alert-danger py-1 small mb-1">Please log in</div>
    return <Component {...props} user={user} />
  }
}

function withLogger(Component) {
  return function Logged(props) {
    useEffect(() => { console.log(`[LOG] ${Component.name || "Component"} mounted`) }, [])
    return <Component {...props} />
  }
}

function Dashboard({ user }) {
  return <div className="alert alert-primary py-2 small mb-1"><strong>Dashboard</strong> -- Welcome back, {user.user}! You have 5 notifications.</div>
}
function Analytics({ user }) {
  return <div className="alert alert-info py-2 small mb-1"><strong>Analytics</strong> -- 12,847 page views this week. Revenue: $34,200.</div>
}
function Settings({ user }) {
  return <div className="alert alert-warning py-2 small mb-1"><strong>Settings</strong> -- Account: {user.user} | Role: {user.role}</div>
}

const ProtectedDashboard = withLogger(withAuth(Dashboard))
const ProtectedAnalytics = withLogger(withAuth(Analytics))
const ProtectedSettings = withLogger(withAuth(Settings))

function HocPattern() {
  const [show, setShow] = useState(false)

  return (
    <PatternLayout
      title="Higher-Order Components (HOC)"
      description="Wrap components with shared behavior -- auth, logging, error tracking, theming."
      whyPoints={[
        "Extracts repeated cross-cutting logic (auth, logging, analytics) into one reusable wrapper",
        "Wrapped components stay pure -- focused only on their own UI, no side-effect code",
        "Compose multiple HOCs: withLogger(withAuth(withTheme(Component)))",
        "Common in older codebases (React Router v3, Redux connect) -- understand to refactor legacy",
      ]}
      problem={
        <div>
          <div className="label-problem">Auth + logging duplicated in every page component:</div>
          <div className="code-demo-row">
            <div className="code-block">{`function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log("[LOG] DashboardPage mounted")
    checkAuth().then(setUser)
  }, [])
  if (loading) return <Spinner />
  if (!user) return <LoginPrompt />
  return <div>Dashboard for {user.name}</div>
}

// AnalyticsPage -- SAME auth + log!
// SettingsPage  -- SAME auth + log!
// 3 pages x same 15 lines = 45 wasted lines`}</div>
            <div className="demo-area">
              <button className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setShow(!show)}>{show ? "Hide" : "Load"} All Pages</button>
              {show && <><DashboardPage /><AnalyticsPage /><SettingsPage /></>}
              <p className="text-danger small mb-0 mt-1">3 pages, each with identical auth + logging boilerplate</p>
            </div>
          </div>
        </div>
      }
      solution={
        <div>
          <div className="label-solution">HOCs handle auth + logging, components are pure UI:</div>
          <div className="code-demo-row">
            <div className="code-block">{`// Pages are now pure UI:
function Dashboard({ user }) {
  return <div>Dashboard for {user.name}</div>
}

// HOCs add behavior:
const ProtectedDashboard = withLogger(
  withAuth(Dashboard)
)

// withAuth: handles loading + auth check
// withLogger: logs mount to console
// Dashboard: just renders UI`}</div>
            <div className="demo-area">
              <button className="btn btn-sm btn-outline-secondary mb-2" onClick={() => setShow(!show)}>{show ? "Hide" : "Load"} All Pages</button>
              {show && <><ProtectedDashboard /><ProtectedAnalytics /><ProtectedSettings /></>}
              <p className="text-success small mb-0 mt-1">Auth + logging written once, applied to any component (check console for logs)</p>
            </div>
          </div>
        </div>
      }
    />
  )
}

export default HocPattern
